import { Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { SendDataService } from '../send-data.service';
import { SettingsModel } from '../models/settings';
import { Timestamp } from '@firebase/firestore';


@Component({
  selector: 'app-settings', 
  template: `<button mat-menu-item (click)='openDialog()'>
  <mat-icon>settings</mat-icon>
  <span>Settings</span>
</button>`
})
export class SettingsComponent {
  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(SettingsModal);
  }
}

@Component({
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsModal {
  form: FormGroup;
  priorityList : String[] = [];

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: SettingsModel, private store: AngularFirestore) {
    this.form = this.fb.group({
      First_Name: ['', Validators.required],
      Last_Name: ['', Validators.required],
      User_Name: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }
}
