import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit{

  links=[
    {path:'/home',name:'Recipe List'},
    {path:'/shopping-cart',name:'Shopping Cart'},
    
  ];

  cartItems: any[] = [];

  activeLink = this.links[1].name;

  constructor(private _cart:CartService){

  }

  ngOnInit(): void {
    this.loadCartItems();
  }

  loadCartItems(){
    this._cart.getCartItems().subscribe({
      next:(val:any)=>{
        console.log("items in cart are-->",val);
        this.cartItems=val;
      },
      error:(err)=>{
        console.log(err);

      }

    })
  }

  removeIngredient(id:string){
    this._cart.deleteCartItem(id).subscribe({
      next:(val)=>{
        alert("Ingredient deleted!");
        console.log("Deleted INgredient is -->",val);
        this.loadCartItems();
      },
      error:(err)=>{
        console.log(err);
      }
    })

  }





}
