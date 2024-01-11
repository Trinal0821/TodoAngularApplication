import {Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';


@Component({
  selector: 'app-display',
  template: "",
})
export class DisplayComponent {
  constructor(public dialog: MatDialog) {}

  openDialog(model : AddNewTaskModel) {
    this.dialog.open(DisplayTasksModal, {
      data: model
    });
  }
}



@Component({
  templateUrl: './display-task.component.html',
})
export class DisplayTasksModal{
  form : FormGroup;

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data:  AddNewTaskModel) {
     this.form = this.fb.group({
       taskTitle: data.taskTitle,
       dueDate: this.fb.control(data.dueDate),
       description: data.description,
     });
  }

  onSave() {
    if (this.form.valid) {
      let sendData : AddNewTaskModel = {taskTitle: this.form.get('taskTitle')?.value, 
      dueDate: new Date(2034, 22, 2), description: this.form.get('description')?.value,
      laneName: this.data.laneName, operation: 'edit'
    }

      this.sendDataService.setData(sendData);
    }
 }
}
