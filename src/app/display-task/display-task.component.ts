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
       Task_Title: data.Task_Title,
       Due_Date: this.fb.control(data.Due_Date),
       Description: data.Description,
     });
  }

  onSave() {
    if (this.form.valid) {
      let sendData : AddNewTaskModel = {Task_Title: this.form.get('Task_Title')?.value, 
      Due_Date: new Date(2034, 22, 2), Description: this.form.get('Description')?.value,
      Lane_Name: this.data.Lane_Name, Operation: 'edit', Priority: 'High'
    }

      this.sendDataService.setData(sendData);
    }
 }
}
