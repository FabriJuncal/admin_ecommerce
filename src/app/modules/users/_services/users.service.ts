import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../auth/_services/auth.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { UserModel } from '../../auth';
import { finalize } from 'rxjs/operators';

const API_AUTH_URL = `${environment.URL_SERVICIOS}/admin`;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>

  constructor(
    private http: HttpClient,
    public AuthService: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }

   registration(data: UserModel){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.AuthService.token})
    return this.http.post<UserModel>(`${API_AUTH_URL}/register`, data, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   allUsers(page = 1, state: string = '', search: string = ''){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.AuthService.token})
    let filter = '';
    if(state){
      filter = `${filter}&state=${state}`;
    }
    if(search){
      filter = `${filter}&search=${search}`;
    }

    return this.http.get<UserModel>(`${API_AUTH_URL}/all?page=${page}${filter}`, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }
}
