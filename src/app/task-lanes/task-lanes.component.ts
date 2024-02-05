import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SendDataService } from '../send-data.service';
import { Observable, Subscription } from 'rxjs';
import { AddNewTaskModel } from '../models/add-new-task-model';
import { DisplayComponent } from '../display-task/display-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';
import { SettingsModel } from '../models/settings';

@Component({
  selector: 'app-task-lanes',
  templateUrl: './task-lanes.component.html',
  styleUrl: './task-lanes.component.css'
})
export class TaskLanesComponent implements OnInit, OnDestroy{
  private addBtnDataSubscription: Subscription | undefined;
  private deleteBtnDataSubscription: Subscription | undefined;
  @ViewChild('display') displayTaskComponent !: DisplayComponent;

  initialTasks : Subscription | undefined;
  signedInTasks : Subscription | undefined;
  todo : AddNewTaskModel[] = [];
  inProgress : AddNewTaskModel[] = [];
   done : AddNewTaskModel[] = [];


  //@ViewChild(AddTaskDirective) lane !: String;
  constructor(private sendData: SendDataService, private store: AngularFirestore ) { }
  

  ngOnInit() {
   this.initialTasks = this.sendData.getTasks("").subscribe(task => {
    this.todo = task.filter( item => item.Lane_Name == 'todo' ).sort((a, b) => a.Index - b.Index);
    this.inProgress = task.filter( item => item.Lane_Name == 'inProgress').sort((a, b) => a.Index - b.Index);
    this.done = task.filter( item => item.Lane_Name == 'done').sort((a, b) => a.Index - b.Index);
   })

   this.signedInTasks = this.sendData.updateT.subscribe(() => {
    console.log('userdocid in the task-lanes ' + this.sendData.getUserDocId());
    this.sendData.getTasks(this.sendData.getUserDocId()).subscribe(task => {

      console.log("login getting triggered");
      console.log(task);
      this.todo = task.filter( item => item.Lane_Name == 'todo' );
      this.inProgress = task.filter( item => item.Lane_Name == 'inProgress');
      this.done = task.filter( item => item.Lane_Name == 'done');
  })
});

 }

 ngOnDestroy() {
   // Unsubscribe to avoid memory leaks
   if (this.addBtnDataSubscription) {
     this.addBtnDataSubscription.unsubscribe();
   }

   if(this.deleteBtnDataSubscription) {
    this.deleteBtnDataSubscription.unsubscribe();
   }

   if (this.signedInTasks) {
     this.signedInTasks.unsubscribe();
   }

 }

 drop(event: CdkDragDrop<AddNewTaskModel[]>): void {
   if (event.previousContainer === event.container) {
     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
   } else {
     transferArrayItem(
       event.previousContainer.data,
       event.container.data,
       event.previousIndex,
       event.currentIndex,
     );

     //Update the Firestore lanename 
     //Should I really update the index? Does the index really matter in todo list like this?
     const movedTask = event.container.data[event.currentIndex];
     const index = event.container.data.findIndex(tasks => tasks.id?.includes('Dummy'));
     if(this.sendData.getUserDocId() != "") {
      this.store.collection('Users_Info').doc(this.sendData.getUserDocId()).collection('Tasks').doc(movedTask.id).update({ Lane_Name: event.container.data.at(0)?.Lane_Name, Index: event.currentIndex})
     }
     else {
      this.store.collection('Tasks').doc(movedTask.id).update({ Lane_Name: event.container.data.at(index)?.Lane_Name, Index: event.currentIndex })
     }
   }
   
}

  displayTaskDetail(model : AddNewTaskModel) {
     this.displayTaskComponent.openDialog(model);
    }

}
