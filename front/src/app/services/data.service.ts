import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { $ } from 'protractor';
import { Observable } from 'rxjs';
import { catchError, filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Client } from 'src/shared/models/client';
import { Login } from 'src/shared/models/login';
import { Product } from 'src/shared/models/product';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  httpOption = {
    headers: new HttpHeaders({
      'Content-Type': 'multipart/form-data'
    })
  }

  constructor(private http: HttpClient) { }

  handleError(url: string, message: string) : Observable<Error>{
    throw new Error('API_ERROR ('+ url +') : Une erreur inattendute s\'est produite, ' + message);
  }

  checkIfResponseIsEmptyAndThrowError(){
    
  }

  constructUrltoAPI(controller: string){
    return environment.urlServer + controller;
  }

  GetList() : Observable<Product[]>{
    return this.http.get<any>(this.constructUrltoAPI('/products/getAll'))
    .pipe(
      map(data => {
        if(data.products){
          data.products.forEach((element: any) => {
            element.Birth = new Date(element.Birth.date);
          });
          return data.products;
        }
        throw new Error('la réponse de l\'API est vide ou ne contient pas le résultat attendu (data.products = null)');
      }),
      catchError(err => this.handleError('/products/getAll', err))
    );
  }

  GetProductFromId(idObject: {id: string}) : Observable<any>{
    return this.http.post<any>(this.constructUrltoAPI('/products/getProductFromId'), this.getFormData(idObject))
    .pipe(
      map(data => {
        if(data.product){
          data.product.Birth = new Date(data.product.Birth.date);
          return data.product;
        }
        throw new Error('la réponse de l\'API est vide ou ne contient pas le résultat attendu (data.product = null)');
      }),
      catchError(err => this.handleError('/products/getProductFromId', err))
    );
  }

  Login(user: Login) : Observable<any>{
    return this.http.post<any>(this.constructUrltoAPI('/user/login'), this.getFormData(user));
  }

  Register(client: Client) : Observable<any>{
    return this.http.post<any>(this.constructUrltoAPI('/user/register'), this.getFormData(client))
    .pipe(
      catchError(err => this.handleError('/user/register', err))
    );
  }

  Logout() : Observable<any>{
    return this.http.get<any>(this.constructUrltoAPI('/user/logout'))
    .pipe(
      catchError(err => this.handleError('/user/logout', err))
    );
  }

  private getFormData(object) {
    const formData = new FormData();
    Object.keys(object).forEach(key => formData.append(key, object[key]));
    return formData;
  } 
}
