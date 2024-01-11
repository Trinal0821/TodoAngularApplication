import {Inject, Component, Input, OnDestroy, OnInit } from '@angular/core';
import {MatDialog, MatDialogModule, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';


@Component({
  selector: 'app-login-btn',
  template: `<div (click)="openLoginDialog()">Login</div>`,
})
export class LoginComponent {
  constructor(public dialog: MatDialog, private fb: FormBuilder, private sendData : SendDataService) {}


  openLoginDialog() {
    this.dialog.open(LoginModal, {
      width: '500px'
    });
  }
}

@Component({
  selector: 'app-signup-btn',
  template: `<div (click)="openSignupDialog()">Sign Up</div>`,
})
export class SignupComponent {
  constructor(public dialog: MatDialog, private fb: FormBuilder, private sendData : SendDataService) {}


  openSignupDialog() {
    this.dialog.open(SignupModal);
  }
}

@Component({
  templateUrl: './sign-up.component.html',
})
export class SignupModal{
  form : FormGroup;
  hide = true;   

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: string) {
     this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
       userName: ['', Validators.required],
       password: ['',  Validators.required],
     });
  }

  // onSave() {
  //   if (this.form.valid) {
  //     let sendData : AddNewTaskModel = {taskTitle: this.form.get('taskTitle')?.value, 
  //     dueDate: new Date(2034, 22, 2), description: this.form.get('description')?.value,
  //     laneName: this.data}

  //     this.sendDataService.setData(sendData);
  //   }
 // }
}

@Component({
  templateUrl: './login.component.html',
})
export class LoginModal{
  form : FormGroup;
  hide = true;   

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: string) {
     this.form = this.fb.group({
       userName: ['', Validators.required],
       password: ['',  Validators.required],
     });
  }

  // onSave() {
  //   if (this.form.valid) {
  //     let sendData : AddNewTaskModel = {taskTitle: this.form.get('taskTitle')?.value, 
  //     dueDate: new Date(2034, 22, 2), description: this.form.get('description')?.value,
  //     laneName: this.data}

  //     this.sendDataService.setData(sendData);
  //   }
 // }
}
