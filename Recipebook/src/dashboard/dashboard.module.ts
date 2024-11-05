import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { CardsComponent } from './cards/cards.component';
import {MatCardModule} from '@angular/material/card';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatRippleModule} from '@angular/material/core';
import { AddEditCardComponent } from './add-edit-card/add-edit-card.component';
import { MatDialogModule } from '@angular/material/dialog';
import {MatFormFieldModule, MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms'; 

import {FormsModule} from '@angular/forms';
import { RecipeInfoComponent } from './recipe-info/recipe-info.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import {MatTabsModule} from '@angular/material/tabs';



@NgModule({
  declarations: [
    HomeComponent,
    CardsComponent,
    AddEditCardComponent,
    RecipeInfoComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    RouterModule,
    MatCardModule,
    MatGridListModule,
    MatRippleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatLabel,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTabsModule
  


  ]
})
export class DashboardModule { }
