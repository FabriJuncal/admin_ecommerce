import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthService } from '../../auth/_services/auth.service';
import { CategorieModel, ListCategoriesModel } from '../_models/categorie.model';
import { finalize } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

const API_CATEGORIE_URL = `${environment.URL_SERVICIOS}/products/categories`;


@Injectable({
  providedIn: 'root'
})
export class CategorieService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>

  constructor(
    private http: HttpClient,
    public authService: AuthService
  ){
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  createCategorie(data: FormData){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<CategorieModel>(`${API_CATEGORIE_URL}/add`, data, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  allCategories(page = 1, search: string = ''){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    let filter = '';
    if(search){
      filter = `${filter}&search=${search}`;
    }

    return this.http.get<ListCategoriesModel>(`${API_CATEGORIE_URL}/all?page=${page}${filter}`, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  update(categorie_id, data){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.post<ListCategoriesModel>(`${API_CATEGORIE_URL}/update/${categorie_id}`, data, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  delete(categorie_id){
    this.isLoadingSubject.next(true);
    const headers = new HttpHeaders({'Authorization' : 'Bearer ' + this.authService.token})
    return this.http.delete<ListCategoriesModel>(`${API_CATEGORIE_URL}/delete/${categorie_id}`, {headers: headers})
    .pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

}
