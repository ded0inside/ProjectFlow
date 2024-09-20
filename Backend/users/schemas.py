from typing import Union
from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    username: str


class UserCreate(BaseModel):
    first_name: str
    last_name:str
    username:  str
    email: str
    password: str


# class User(UserBase):
#     id: int
#     is_active: bool
#     first_name: str
#     last_name: str


#     class Config:
#         orm_mode = True