import {Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';


@Component({
  templateUrl: './display-task.component.html'
})
export class DisplayTaskComponent {
  constructor(public dialog: MatDialog, private fb: FormBuilder, private sendData : SendDataService) {}


  openDialog() {
    this.dialog.open(DisplayTasksModal);
  }
}

@Component({
  templateUrl: './display-task.component.html'
})
export class DisplayTasksModal{
  //form : FormGroup;

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: string) {
    // this.form = this.fb.group({
    //   taskTitle: ['', Validators.required],
    //   dueDate: [''],
    //   description: [''],
    // });
  }

  // onSave() {
  //   if (this.form.valid) {
  //     let sendData : AddNewTaskModel = {taskTitle: this.form.get('taskTitle')?.value, 
  //     dueDate: new Date(2034, 22, 2), description: this.form.get('description')?.value,
  //     laneName: this.data}

  //     this.sendDataService.setData(sendData);
  //   }
  // }
}
