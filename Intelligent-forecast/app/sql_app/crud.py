import statsmodels.api as sm
import pandas as pd

from typing import List
from sqlalchemy.orm import Session
from sqlalchemy import text
from .models import CarSaleData as ModelCarSaleData
from pydantic import parse_obj_as
from .schemas import CarForDisplay, CarSaleData


def search_cars_by_keyword(db: Session, keyword: str):  # cast()强制转换
    regex_keyword = f'[{keyword}]{{{int(len(keyword) / 3 * 2)}}}'

    query_sql = text("""
        SELECT
            c.model_id modelId,
            b.brand_name brandName,
            s.sub_brand_name subBrandName,
            c.model_name modelName,
            c.max_price maxPrice,
            c.min_price minPrice,
            c.img_path imgPath 
        FROM
            car_model c
            LEFT JOIN sub_brand s ON c.sub_brand_id = s.sub_brand_id
            LEFT JOIN brand b ON s.brand_id = b.brand_id 
        WHERE
            b.brand_name REGEXP :regex 
            OR s.sub_brand_name REGEXP :regex 
            OR c.model_name REGEXP :regex
    """)

    query_result = (
        db.execute(query_sql, {'regex': regex_keyword}).all()
    )
    # print(query_result)
    # 使用parse_obj_as()方法的函数将ORM查询结果转换为Pydantic模型对象列表
    car_display_objs = parse_obj_as(List[CarForDisplay], query_result)

    # 进行相似度排序
    car_displays = [car.dict() for car in quicksort(car_display_objs, keyword)]

    # 对查询结果与关键字进行相似度排序
    return car_displays


def quicksort(data_list: List[CarForDisplay], keyword: str):
    if len(data_list) <= 1:
        return data_list
    pivot = sorensen_dice(data_list[len(data_list) // 2].get_all_name(), keyword)
    left = [x for x in data_list if sorensen_dice(x.get_all_name(), keyword) > pivot]
    middle = [x for x in data_list if sorensen_dice(x.get_all_name(), keyword) == pivot]
    right = [x for x in data_list if sorensen_dice(x.get_all_name(), keyword) < pivot]
    return quicksort(left, keyword) + middle + quicksort(right, keyword)


# Sorensen-Dice 相似度系数 此处采用忽略大小写
def sorensen_dice(str1, str2):
    str1 = str1.lower()
    str2 = str2.lower()
    set1 = set([str1[i:i + 2] for i in range(len(str1) - 1)])
    set2 = set([str2[i:i + 2] for i in range(len(str2) - 1)])
    overlap = len(set1 & set2)
    return (2.0 * overlap) / (len(set1) + len(set2))


def get_sale_data_by_name(model_id: int, db: Session):
    query = (
        db.query(ModelCarSaleData)
        .filter_by(id=model_id)
        .order_by(ModelCarSaleData.date.asc())
        .all()
    )
    car_objs = parse_obj_as(List[CarSaleData], query)
    cars = []
    for item in car_objs:
        item = item.dict()
        cars.append({'date': item['date'].strftime('%Y-%m'), 'retail_sales': item['retail_sales']})
    return cars


def knm(df, n):
    # 找出缺失值的行
    temp = df.isnull().T.any().values
    temp_df = df.copy()
    for i in range(len(temp)):
        if temp[i] is True:
            if i < n - 1:  # 前n个
                temp_df.loc[i, "retail_sales"] = df.loc[i:i + n, "retail_sales"].mean()
            elif i > len(temp) - 1 - n:  # 后n个
                temp_df.loc[i, "retail_sales"] = df.loc[i - n:i, "retail_sales"]
            else:
                temp_df.loc[i, "retail_sales"] = df.loc[i - n:i + n, "retail_sales"].mean()
    return temp_df


def access(df, number):
    df = pd.DataFrame(df)
    not_miss = knm(df[["retail_sales"]], 2)
    df["retail_sales"] = not_miss.values

    df["diff_1"] = df["retail_sales"].diff(1)  # 一阶差分
    df["diff_2"] = df["retail_sales"].diff(1)  # 二阶差分
    model = sm.tsa.ARIMA(endog=df["retail_sales"], order=(1, 1, 0))
    result = model.fit()

    # 从训练集第0个开始预测(start=1表示从第0个开始)，预测完整个训练集后，还需要向后预测10个
    pred = result.predict(start=len(df), end=len(df) + number)
    return pred


def format_data(sales_data, pred_data):
    # sale_data_dict = sales_data[['date', 'retail_sales']].to_dict('records')
    # sale_data_dict = [
    #     {'date': item['date'].strftime('%Y-%m'), 'retail_sales': item['retail_sales']} for item in sales_data
    # ]

    year, month = map(int, sales_data[-1]['date'].split("-"))
    for value in pred_data.iloc:
        if month == 12:
            year += 1
            month = 1
        else:
            month += 1

        sales_data.append({'date': f"{year}-{month:02d}", 'retail_sales': int(value)})

    return sales_data
