import { Inject, Component, Input, EventEmitter, Output, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SendDataService } from '../send-data.service';
import { AddNewTaskModel } from '../models/add-new-task-model';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UserDataModel } from '../models/user-data-model';


@Component({
  selector: 'app-login-btn',
  template: `<div (click)="openLoginDialog()">Login</div>`,
})
export class LoginComponent {
  constructor(public dialog: MatDialog, private fb: FormBuilder, private sendData: SendDataService) { }


  openLoginDialog() {
    this.dialog.open(LoginModal, {
      width: '500px'
    });
  }
}

@Component({
  selector: 'app-signup-btn',
  template: `<div (click)="openSignupDialog()">Signup</div>`,
})
export class SignupComponent {
  constructor(public dialog: MatDialog, private fb: FormBuilder, private sendData: SendDataService, private store: AngularFirestore) { }


  openSignupDialog() {
    this.dialog.open(SignupModal);
  }
}

@Component({
  templateUrl: './sign-up.component.html',
})
export class SignupModal {
  form: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: string, private store: AngularFirestore) {
    this.form = this.fb.group({
      First_Name: ['', Validators.required],
      Last_Name: ['', Validators.required],
      User_Name: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  onSignup() {
    if (this.form.valid) {
      const userData: UserDataModel = {
        id: "", User_Name: this.form.get('User_Name')?.value,
        Password: this.form.get('Password')?.value,
        First_Name: this.form.get('First_Name')?.value,
        Last_Name: this.form.get('Last_Name')?.value
      }
      this.store.collection('Users_Info').add(userData);
      this.sendDataService.setUserData(userData);
    }
  }
}

@Component({
  templateUrl: './login.component.html',
})
export class LoginModal {
  form: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private sendDataService: SendDataService, @Inject(MAT_DIALOG_DATA) public data: string, private store: AngularFirestore) {
    this.form = this.fb.group({
      User_Name: ['', Validators.required],
      Password: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.form.valid) {
      // Query Firestore to find the user document based on the user_name
      this.store.collection<UserDataModel>('Users_Info', ref => ref.where('User_Name', '==', this.form.get('User_Name')?.value))
        .get()
        .subscribe(snapshot => {
          snapshot.forEach(doc => {
            const data = doc.data();
            // Here, you have the user data and document ID
            // You can proceed with authentication logic
            console.log(data);

            if (data.Password === this.form.get('Password')?.value) {
              this.sendDataService.setUserData(data);
            }
          });
        });
    }
    else {
      console.log("something went wrong with the form");
    }
  }
}
