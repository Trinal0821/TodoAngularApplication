import { Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';
import { Timestamp } from '@firebase/firestore';


@Component({
  selector: 'app-display',
  template: "",
})
export class DisplayComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(model: AddNewTaskModel) {
    this.dialog.open(DisplayTasksModal, {
      data: model
    });
  }
}

@Component({
  templateUrl: './display-task.component.html',
})
export class DisplayTasksModal {
  form: FormGroup;
  priorityList : String[] = [];

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: AddNewTaskModel, private store: AngularFirestore) {
    this.form = this.fb.group({
      id: data.id,
      Task_Title: data.Task_Title ?? null,
      Due_Date: data.Due_Date == null ? null : data.Due_Date.toDate(),
      Description: data.Description,
      Priority : data.Priority,
    });
  }

  ngOnInit() {
     this.sendDataService.getPriority().subscribe(priority => { console.log('priority ' + priority);
      this.priorityList = priority});
 }

  onSave() {
    if (this.form.valid) {
      if(this.sendDataService.getUserDocId() != "") {
        this.store.collection('Users_Info').doc(this.sendDataService.getUserDocId()).collection('Tasks').doc(this.form.get('id')?.value).update({
          Task_Title: this.form.get('Task_Title')?.value,
          Due_Date: this.form.get('Due_Date')?.value !== null ? Timestamp.fromDate(this.form.get('Due_Date')?.value) : null, Description: this.form.get('Description')?.value,
          Lane_Name: this.data.Lane_Name, Operation: 'edit', Priority: this.form.get('Priority')?.value
        });
      }
      else {
        this.store.collection('Tasks').doc(this.form.get('id')?.value).update({
          Task_Title: this.form.get('Task_Title')?.value,
          Due_Date: this.form.get('Due_Date')?.value !== null ? Timestamp.fromDate(this.form.get('Due_Date')?.value) : null, Description: this.form.get('Description')?.value,
          Lane_Name: this.data.Lane_Name, Operation: 'edit', Priority: this.form.get('Priority')?.value
        });
      }

      
    }
  }
}

