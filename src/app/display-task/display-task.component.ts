import {Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';
import { Timestamp } from '@firebase/firestore';
import { timestamp } from 'rxjs';


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
    console.log(this.data.Due_Date.toDate);
     this.form = this.fb.group({
       Task_Title: data.Task_Title,
       Due_Date: data.Due_Date.toDate,
       Description: data.Description,
     });
  }

  onSave() {
    if (this.form.valid) {
      let sendData : AddNewTaskModel = {id: this.form.get('Id')?.value, Task_Title: this.form.get('Task_Title')?.value, 
      Due_Date: Timestamp.fromDate(new Date(1, 1, 2)), Description: this.form.get('Description')?.value,
      Lane_Name: this.data.Lane_Name, Operation: 'edit', Priority: 'High'
    }

      this.sendDataService.setData(sendData);
    }
 }
}
