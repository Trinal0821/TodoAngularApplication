import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SendDataService } from '../send-data.service';
import { Observable, Subscription } from 'rxjs';
import { AddNewTaskModel } from '../models/add-new-task-model';
import { DisplayComponent } from '../display-task/display-task.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map } from 'rxjs/operators';


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
  todo : AddNewTaskModel[] = [];
  inProgress : AddNewTaskModel[] = [];
   done : AddNewTaskModel[] = [];


  //@ViewChild(AddTaskDirective) lane !: String;
  constructor(private sendData: SendDataService, private store: AngularFirestore ) { }
  

  ngOnInit() {
    // Subscribe to the observable in the service to detect changes
    this.addBtnDataSubscription = this.sendData.getDataObservable().subscribe(updatedData => {
      if(updatedData != null) {
        switch(updatedData.Lane_Name) {
          case 'todo':
            if(updatedData.Operation === 'insert') {
              //this.todo.push(updatedData);
            }
            // else {
            //   const index = this.todo.findIndex(item => item === )
            // }
            
            break;
          case 'inProgress':
            //this.inProgress.push(updatedData);
            break;
          case 'done':
            //this.done.push(updatedData);
            break;
        }
      }
   });

   this.initialTasks = this.sendData.getTasks().subscribe(task => {
    this.todo = task.filter( item => item.Lane_Name == 'todo' );
    this.inProgress = task.filter( item => item.Lane_Name == 'inProgress');
    this.done = task.filter( item => item.Lane_Name == 'done');
   })
 }

 ngOnDestroy() {
   // Unsubscribe to avoid memory leaks
   if (this.addBtnDataSubscription) {
     this.addBtnDataSubscription.unsubscribe();
   }

   if(this.deleteBtnDataSubscription) {
    this.deleteBtnDataSubscription.unsubscribe();
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
     const movedTask = event.container.data[event.currentIndex];
      this.store.collection('Tasks').doc(movedTask.id).update({ Lane_Name: event.container.data.at(0)?.Lane_Name})
   }
   
}

  displayTaskDetail(model : AddNewTaskModel) {
     this.displayTaskComponent.openDialog(model);
    }

}
