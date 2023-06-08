import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from '../_models/contact';
import { UserOne } from '../_models/userOne';

const API_URL = 'http://localhost:8090/api/';
const API_ADMIN_URL = 'http://localhost:8090/api/admin/';
const USER_URL = 'http://localhost:8090/api/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
   userId?: number;
   baseUrl = "http://localhost:8082";
  

  constructor(private http: HttpClient) { }
  getAllOffers(): Observable<any> {
    return this.http.get(API_URL + 'offers', { responseType: 'json' });
  }
  adduser(user:UserOne): Observable<Object> {
  
    return this.http.post(this.baseUrl + "/user/add", user);
  }
  getUserByUsername(username: any) {
    return this.http.get<UserOne>(this.baseUrl + "/user/getbyusername/" + username)
  }
  getUserBoard(): Observable<any> {
    return this.http.get(API_URL + 'user', { responseType: 'text' });
  }
  getServerBoard(): Observable<any> {
    return this.http.get(API_URL + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.http.get(API_URL + 'admin', { responseType: 'text' });
  }
  getWebAccountById(id: number): Observable<any> {
    return this.http.get(API_ADMIN_URL + id);
  }

  deletUser(id: number): Observable<any> {
    return this.http.delete(`${USER_URL + 'user'}/${id}`);
  }

  updateUser(user: any, id: number): Observable<Object> {
    return this.http.put(`${USER_URL}users/${id}`, user);
  }

  updateCover(id: number, cover: string): Observable<Object> {
    return this.http.put(`${USER_URL}covers/${id}`, cover);
  }

  getUserById(id: any): Observable<any> {
    return this.http.get(`${USER_URL}users/${id}`);
  }


  changePassword(userId: number, passwordData: any): Observable<any> {
    return this.http.put(`${USER_URL}change-password/${userId}`, passwordData);
  }

  createContact(contact: Contact): Observable<Contact> {
    return this.http.post<Contact>(`${USER_URL}contact`, contact);
  }

  getAllContacts(): Observable<any> {
    return this.http.get(API_URL + 'contact', { responseType: 'json' });
  }

  deleteContact(id: number): Observable<any> {
    return this.http.delete(`${API_URL + 'contact'}/${id}`);
  }

  generateCode(userId: number): Observable<any> {
    return this.http.put(`${USER_URL}code/${userId}`, { responseType: 'json' });
  }
}
