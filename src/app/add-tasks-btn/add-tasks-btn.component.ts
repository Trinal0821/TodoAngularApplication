import {Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';

//<button mat-button (click)="openDialog()">Open dialog</button>
@Component({
  selector: 'app-add-tasks-btn',
  template: `<div (click)="openDialog()">
              Add Task
              <i class="bi bi-plus-square h5"></i>
            </div>`,
 // imports: [MatButtonModule, MatDialogModule],
  styleUrl: './add-tasks-btn.component.css'
})
export class AddTasksBtnComponent {
  @Input() taskLane: string | undefined;
  constructor(public dialog: MatDialog, private fb: FormBuilder, private sendData : SendDataService) {}

  openDialog() {
    this.dialog.open(AddTasksModal, {
      data: this.taskLane
    });
  }
}

@Component({
  templateUrl: './add-tasks-module.html',
})
export class AddTasksModal{
  form : FormGroup;

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: string) {
    this.form = this.fb.group({
      Task_Title: ['', Validators.required],
      Due_Date: [''],
      Description: [''],
    });
  }

  onSave() {
    if (this.form.valid) {
      let sendData : AddNewTaskModel = {Task_Title: this.form.get('Task_Title')?.value, 
      Due_Date: this.form.get('Due_Date')?.value, Description: this.form.get('Description')?.value,
      Lane_Name: this.data, Operation: 'insert', Priority: 'High'}

      console.log(this.form.get('Due_Date')?.value);

      this.sendDataService.setData(sendData);
    }
  }
}
