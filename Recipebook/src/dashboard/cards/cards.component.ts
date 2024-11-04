import { Component, Input } from '@angular/core';
import { IRecipe } from '../../app/model/recipe';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss'
})
export class CardsComponent {
  @Input() item!:IRecipe;

}
