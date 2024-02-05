import {Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Timestamp } from '@firebase/firestore';


//<button mat-button (click)="openDialog()">Open dialog</button>
@Component({
  selector: 'app-add-tasks-btn',
  template: `<div (click)="openDialog()">
              Add Task
              <i class="bi bi-plus-square h5"></i>
            </div>`,
  styleUrl: './add-tasks-btn.component.css'
})
export class AddTasksBtnComponent {
  @Input() arraySize: number | undefined;
  @Input() taskLane: string | undefined;
  constructor(public dialog: MatDialog, private fb: FormBuilder, private sendData : SendDataService) {}

  openDialog() {
    this.dialog.open(AddTasksModal, {
      data: { taskLane: this.taskLane, arraySize: this.arraySize } 
    });
  }
}

@Component({
  templateUrl: './add-tasks-module.html',
})
export class AddTasksModal{
  form : FormGroup;
  priorityList : String[] = [];

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: any, private store: AngularFirestore) {
    this.form = this.fb.group({
      id: '',
      Task_Title: ['', Validators.required],
      Due_Date: null,
      Description: [''],
      Priority: null,
    });
  }

  ngOnInit() {
    this.sendDataService.getPriority().subscribe(priority => { 
     this.priorityList = priority});
}

  onSave() {
    if (this.form.valid) {
      const task : AddNewTaskModel = {id: "", Task_Title: this.form.get('Task_Title')?.value, 
      Due_Date: this.form.get('Due_Date')?.value !== null ? Timestamp.fromDate(this.form.get('Due_Date')?.value) : null, Description: this.form.get('Description')?.value,
      Lane_Name: this.data.taskLane, Operation: 'insert', Priority: this.form.get('Priority')?.value, Index : this.data.arraySize};

      console.log(task);
      console.log(this.sendDataService.getUserDocId());
      if(this.sendDataService.getUserDocId() != "") {

        console.log('getting ready to insert');
        this.store.collection('Users_Info').doc(this.sendDataService.getUserDocId()).collection("Tasks").add(task);
      }
      else {
        this.store.collection("Tasks").add(task);
      }
    }
  }
}
