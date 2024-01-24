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
      taskTitle: ['', Validators.required],
      dueDate: [''],
      description: [''],
    });
  }

  onSave() {
    if (this.form.valid) {
      let sendData : AddNewTaskModel = {taskTitle: this.form.get('taskTitle')?.value, 
      dueDate: this.form.get('dueDate')?.value, description: this.form.get('description')?.value,
      laneName: this.data, operation: 'insert', priority: 'High'}

      console.log(this.form.get('dueDate')?.value);

      this.sendDataService.setData(sendData);
    }
  }
}
