import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  login(username: any, password: any): Observable<any> {
    // Create the request body in x-www-form-urlencoded format
    const body = new HttpParams()
      .set('username', username)
      .set('password', password);

    // Set headers for the request
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // Send the POST request to the FastAPI endpoint
    return this.http.post('http://localhost:8000/auth/token', body.toString(), { headers });
  }
  
  singUp(obj: any) {
    return this.http.post('http://localhost:8000/users', obj)
  }

  getUserData() {
    return this.http.post('http://localhost:8000/users/me', null)
  }
}
