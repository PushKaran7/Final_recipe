import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ICart } from '../model/cart';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartUrl='http://localhost:8000/api/cart/'

  constructor(private _http:HttpClient) { }

  getCartItems():Observable<ICart[]>{
    return this._http.get<ICart[]>(this.cartUrl);
  }
  
  addCartItems(data:any):Observable<any>{
    return this._http.post<any>(this.cartUrl,data);
  }

  deleteCartItem(id:string):Observable<any>{
    return this._http.delete<any>(`${this.cartUrl}/${id}`);
  }

  
}
