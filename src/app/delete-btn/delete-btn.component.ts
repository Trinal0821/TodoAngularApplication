import {Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';
import { DeleteTaskModel } from '../models/delete-task-model';

@Component({
  selector: 'app-delete-btn',
  template:  `<i class="bi bi-trash" (click)="deleteDialog()"></i>`,
  styleUrl: './delete-btn.component.css'
})
export class DeleteBtnComponent {
  @Input() taskLane : string | undefined;
  @Input() Task_Title : string | undefined;

  constructor(public dialog: MatDialog, private fb: FormBuilder, private sendData : SendDataService) {}

  deleteDialog() {
    console.log(this.Task_Title);
    console.log(this.taskLane);
    this.dialog.open(ConfirmDeleteModal, {
      data: {
      taskLane: this.taskLane,
      Task_Title: this.Task_Title
    }
    });
  }
}

@Component({
  selector: 'app-delete-tasks-module',
  templateUrl: './delete-tasks-module.html',
})
export class ConfirmDeleteModal {

  constructor(private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data : any) {}

  deleteTask() {
    let deleteTaskModel : DeleteTaskModel = {Task_Title: this.data.Task_Title, Lane_Name: this.data.taskLane};
    this.sendDataService.setDeleteTaskTitle(deleteTaskModel);
  }
}
