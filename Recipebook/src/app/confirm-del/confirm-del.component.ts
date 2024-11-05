import { Component, EventEmitter, Output } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-del',
  templateUrl: './confirm-del.component.html',
  styleUrl: './confirm-del.component.scss'
})
export class ConfirmDelComponent {
  
  constructor(private dialogRef: MatDialogRef<ConfirmDelComponent>){
    
  }

   

 

  postData(data:string){
    this.dialogRef.close(data);
  }
  
}
