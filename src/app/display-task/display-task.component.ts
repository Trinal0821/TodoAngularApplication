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

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: AddNewTaskModel, private store: AngularFirestore) {
    console.log('data ' + data.Due_Date === undefined ? "NULL" : "DEPRESSION");
    console.log(data.Due_Date);
    this.form = this.fb.group({
      id: data.id,
      Task_Title: data.Task_Title ?? null,
      Due_Date: data.Due_Date == null ? null : data.Due_Date.toDate(),
      Description: data.Description,
    });
  }

  onSave() {
    if (this.form.valid) {
      this.store.collection('Tasks').doc(this.form.get('id')?.value).update({
        Task_Title: this.form.get('Task_Title')?.value,
        Due_Date: this.form.get('Due_Date') == null ? null : Timestamp.fromDate(this.form.get('Due_Date')?.value), Description: this.form.get('Description')?.value,
        Lane_Name: this.data.Lane_Name, Operation: 'edit', Priority: 'High'
      });
    }
  }
}

