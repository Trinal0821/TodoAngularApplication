import {Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';
import { DeleteTaskModel } from '../models/delete-task-model';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-delete-btn',
  template:  `<i class="bi bi-trash" (click)="deleteDialog()"></i>`,
  styleUrl: './delete-btn.component.css'
})
export class DeleteBtnComponent {
  @Input() taskLane : string | undefined;
  @Input() id : string | undefined;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private sendData : SendDataService) {}

  deleteDialog() {
    console.log(this.id);
    this.dialog.open(ConfirmDeleteModal, {
      data: {
      id: this.id
    }
    });
  }
}

@Component({
  selector: 'app-delete-tasks-module',
  templateUrl: './delete-tasks-module.html',
})
export class ConfirmDeleteModal {

  constructor(private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data : any, private store: AngularFirestore) {}

  deleteTask() {
    this.store.collection('Tasks').doc(this.data.id).delete();
  }
}
