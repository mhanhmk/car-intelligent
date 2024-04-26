from datetime import date
from typing import Optional, Union

from pydantic import BaseModel


class CarInfoBase(BaseModel):
    id: int
    model_id: str
    name: str
    type: str
    displacement: float
    dynamic_type: str
    horsepower: int
    price: float
    info: Optional[str] = None


class CarInfo(CarInfoBase):
    id: int

    class Config:
        orm_mode = True


class CarForDisplay(BaseModel):
    modelId: int
    brandName: str
    subBrandName: str
    modelName: str
    maxPrice: Union[float, None]
    minPrice: Union[float, None]
    imgPath: str

    def get_all_name(self):
        return self.brandName + self.subBrandName + self.modelName

    class Config:
        orm_mode = True


class CarSaleDataBase(BaseModel):
    id: int
    name: str
    date: date
    retail_sales: int


class CarSaleData(CarSaleDataBase):
    class Config:
        orm_mode = True
