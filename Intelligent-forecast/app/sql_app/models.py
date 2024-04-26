from sqlalchemy import Float, Column, Date, Integer, String, PrimaryKeyConstraint

from .database import Base


class CarInfo(Base):
    __tablename__ = "car_info"

    # index创建索引
    id = Column(Integer, primary_key=True, index=True)
    model_id = Column(Integer)
    name = Column(String)
    type = Column(String)
    displacement = Column(Float)
    dynamic_type = Column(String)
    horsepower = Column(Integer)
    price = Column(Float)
    info = Column(String)


class Brand(Base):
    __tablename__ = "brand"

    brand_id = Column(Integer, primary_key=True, index=True)
    brand_name = Column(String)


class SubBrand(Base):
    __tablename__ = "sub_brand"

    sub_brand_id = Column(Integer, primary_key=True, index=True)
    sub_brand_name = Column(String)
    brand_id = Column(Integer)


class CarModel(Base):
    __tablename__ = "car_model"

    model_id = Column(Integer, primary_key=True, index=True)
    model_name = Column(String)
    sub_brand_id = Column(Integer)
    max_price = Column(Float)
    min_price = Column(Float)
    is_new_car = Column(Integer)
    model_type = Column(String)
    sale_status = Column(String)
    img_path = Column(String)


class CarSaleData(Base):
    __tablename__ = "carsaledata"

    id = Column(Integer, index=True)
    name = Column(String, index=True)
    date = Column(Date, index=True)
    retail_sales = Column(Integer)

    __table_args__ = (
        PrimaryKeyConstraint('name', 'date'),
        {},
    )
