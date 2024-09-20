from pydantic import BaseModel

class TokenResponse(BaseModel):
    result: int
    access_token: str
    refresh_token: str
    token_type: str = 'Bearer'
    expires_in: int