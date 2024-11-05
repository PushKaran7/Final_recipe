import { Component } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent {

  links=[
    {path:'/home',name:'Recipe List'},
    {path:'/shopping-cart',name:'Shopping Cart'},
    
  ];

  activeLink = this.links[1].name;

}
