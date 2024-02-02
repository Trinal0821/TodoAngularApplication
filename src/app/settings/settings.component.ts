import { Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SendDataService } from '../send-data.service';
import { SettingsModel } from '../models/settings';
import { Timestamp } from '@firebase/firestore';
import { UserDataModel } from '../models/user-data-model';

@Component({
  selector: 'app-settings',
  template: ""
})
export class SettingsComponent {
  constructor(public dialog: MatDialog) { }

  openDialog(model: UserDataModel | undefined) {
    this.dialog.open(SettingsModal, {
      data: model
    })
  }
}

@Component({
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsModal {
  form: FormGroup;
  priorityList: String[] = [];

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: UserDataModel, private store: AngularFirestore) {
    this.form = this.fb.group({
      First_Name: [data.First_Name, Validators.required],
      Last_Name: [data.Last_Name, Validators.required],
      User_Name: [data.User_Name, Validators.required],
      Password: [data.Password, Validators.required],
      tags : this.fb.array([])
    });

   
  };

  ngOnInit() {
    this.sendDataService.getPriority().subscribe(priority => {
      priority.forEach(item => {
        this.tags.push(item)
      })
    });

    console.log(this.tags.value);
  }

  get tags(): FormArray {
    return this.form.get('tags') as FormArray;
  }

  addDynamicElement() {
    this.tags.push(this.createDynamicElement());
  }

  createDynamicElement(): FormGroup {
    return this.fb.group({
      key: [''],
      value: ['']
    });
  }

  removeDynamicElement(index: number) {
    this.tags.removeAt(index);
  }
}
