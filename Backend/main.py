import bcrypt
from fastapi import FastAPI, Depends, Header, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import Dict
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow CORS for specific origins or all origins (for development)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],  # Angular app URL
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods (GET, POST, etc.)
    allow_headers=["*"],  # Allows all headers (e.g., Authorization)
)

# Secret key and algorithm for JWT
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"

# Dummy user data for demonstration purposes
users_db = {
    "ilia": {
        "password": bcrypt.hashpw("admin".encode(), bcrypt.gensalt()).decode(),
        "user_id": 1,
        "email": "example_user@example.com",
        "name": "Example User",
    }
}

class LoginRequest(BaseModel):
    username: str
    password: str

class LoginResponse(BaseModel):
    result: int
    message: str
    data: dict

def create_jwt_token(user_id: int):
    expiration = datetime.utcnow() + timedelta(hours=1)
    token = jwt.encode({"user_id": user_id, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM)
    return token

def create_refresh_token(user_id: int):
    expiration = datetime.utcnow() + timedelta(days=30)
    token = jwt.encode({"user_id": user_id, "exp": expiration}, SECRET_KEY, algorithm=ALGORITHM)
    return token


class TokenVerificationException(Exception):
    def __init__(self, detail: str):
        self.detail = detail

def get_current_user(token: str = Header(...)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        print(user_id)
        if user_id is None:
            raise TokenVerificationException("Invalid token: user_id not found")
        return users_db.get(user_id)
    except JWTError:
        raise TokenVerificationException("Invalid or expired token")

@app.exception_handler(TokenVerificationException)
async def token_verification_exception_handler(request, exc: TokenVerificationException):
    return JSONResponse(
        status_code=401,
        content={"message": exc.detail},
    )

@app.get("/user_info")
async def get_user_info(current_user: dict = Depends(get_current_user)):
    if current_user is None:
        raise HTTPException(status_code=401, detail="User not found")
    return JSONResponse(
        content={"result": 1, "message": "User information retrieved successfully", "data": current_user}
    )

@app.post("/auth/login", response_model=LoginResponse)
async def login(request: LoginRequest):
    user = users_db.get(request.username)
    
    if user is None:
        return LoginResponse(result=0, message="Invalid username or password", data={})
    
    if not bcrypt.checkpw(request.password.encode(), user['password'].encode()):
        return LoginResponse(result=0, message="Invalid username or password", data={})
    
    token = create_jwt_token(user['user_id'])
    refresh_token = create_refresh_token(user['user_id'])
    
    user_data = {
        "userId": user['user_id'],
        "email": user['email'],
        "name": user['name'],
        "token": token,
        "refreshToken": refresh_token
    }
    
    return LoginResponse(result=1, message="Login successful", data=user_data)
