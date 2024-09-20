from pydantic import BaseModel, EmailStr
from typing import Union
from datetime import datetime


class UserResponse(BaseModel):
    first_name: str
    last_name: str
    username: str
    email: EmailStr
    registered_at: Union[None, datetime] = None