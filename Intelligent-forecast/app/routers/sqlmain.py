import requests

from typing import Union
from fastapi.responses import JSONResponse
from fastapi.encoders import jsonable_encoder
from fastapi import Depends, APIRouter
from sqlalchemy.orm import Session
from app.sql_app import crud, models
from app.sql_app.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
router = APIRouter()


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/predict")
def predict(model_id: int, number: Union[int, None] = None, db: Session = Depends(get_db)):
    # 获取的到销量数据
    sales_data = crud.get_sale_data_by_name(model_id, db)
    if number is not None and len(sales_data) > 0:
        # 得到预测数据
        pred_data = crud.access(sales_data, number)
        # 格式化数据
        sales_data = crud.format_data(sales_data, pred_data)

    response_data = {'code': 200, 'message': 'success', 'data': sales_data}

    return JSONResponse(content=jsonable_encoder(response_data))


@router.get("/all_sales")
def all_sales():
    url = 'https://api.auto.sohu.com/retail_sales?type=total&months=36'
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36'
    }
    response = requests.get(url, headers=headers)

    json_data = response.json()
    sales_data = [
        {'date': f"{item['year']}-{item['month']:02d}", 'retail_sales': item['retail_sales']} for item in
        json_data['sales']
    ]
    sales_data.reverse()

    response_data = {'code': 200, 'message': 'success', 'data': sales_data}

    return JSONResponse(content=jsonable_encoder(response_data))


@router.get("/search")
def search(keyword: str, page_index: int = 1, page_size: int = 20, db: Session = Depends(get_db)):
    search_result = crud.search_cars_by_keyword(db, keyword)

    offset = (page_index - 1) * page_size
    total = len(search_result)

    response_data = {
        'code': 200,
        'message': 'success',
        'data': {
            'list': search_result[offset: min(offset + page_size, total)],
            'total': total
        }}

    return JSONResponse(content=jsonable_encoder(response_data))
