import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire/compat";
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskLanesComponent } from './task-lanes/task-lanes.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { AddTasksBtnComponent, AddTasksModal  } from './add-tasks-btn/add-tasks-btn.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { DeleteBtnComponent } from './delete-btn/delete-btn.component';
import { ConfirmDeleteModal } from './delete-btn/delete-btn.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import { DisplayComponent, DisplayTasksModal } from './display-task/display-task.component';
import { LoginModal, SignupModal, LoginComponent, SignupComponent } from './account-setup/account-setup.component';
import {MatChipsModule} from '@angular/material/chips';
import { firebaseConfig } from './database/application-setup';




@NgModule({
  declarations: [
    AppComponent,
    TaskLanesComponent,
    AddTasksBtnComponent,
    AddTasksModal,
    DeleteBtnComponent,
    ConfirmDeleteModal,
    LoginComponent,
    SignupComponent,
   LoginModal,
   SignupModal,
    DisplayComponent,
    DisplayTasksModal,
  ],
  imports: [
    MatToolbarModule,
    BrowserModule,
    MatInputModule,
    AppRoutingModule, 
    DragDropModule, 
    NoopAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    FormsModule,
    MatChipsModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
