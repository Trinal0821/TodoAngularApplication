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
  initialTasks : Observable<AddNewTaskModel[]> | undefined;
  todo : AddNewTaskModel[] | undefined;
  inProgress : AddNewTaskModel[] | undefined;
   done : AddNewTaskModel[] | undefined;


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

   this.deleteBtnDataSubscription = this.sendData.getDeleteDataObservable().subscribe(data => {
    if(data != null) {
      switch(data.Lane_Name) {
        case 'todo':
          //this.todo = this.todo.filter(item => item.Task_Title !== data.Task_Title);
          break;
        case 'inProgress':
          //this.inProgress = this.inProgress.filter(item => item.Task_Title !== data.Task_Title);
          break;
        case 'done':
          //this.done = this.done.filter(item => item.Task_Title !== data.Task_Title);
          break;
      }
    }
   });

   this.initialTasks = this.sendData.getTasks();
   this.initialTasks.subscribe(task => {
    this.todo = task.filter( item => item.Lane_Name == 'todo');
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

  // drop(event: CdkDragDrop<string[]>): void {
  //   if (event.previousContainer === event.container) {
  //     // Reorder items in the same list
  //     moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
  //   } else {
  //     // Move item to a different list
  //     transferArrayItem(
  //       event.previousContainer.data,
  //       event.container.data,
  //       event.previousIndex,
  //       event.currentIndex
  //     );
  //   }
  // }

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
    }
  }
  
  // Predicate function to determine if an item can enter a container
  isInsideContainer(event: CdkDragDrop<AddNewTaskModel[]>, container: any): boolean {
    const containerRect = container.element.nativeElement.getBoundingClientRect();
    const itemRect = event.item.element.nativeElement.getBoundingClientRect();

    // Check if the item is inside the container
    return (
      // itemRect.left <= containerRect.left &&
      // itemRect.right <= containerRect.right &&
      // itemRect.top <= containerRect.top &&
      // itemRect.bottom <= containerRect.bottom
      itemRect.left >= containerRect.left &&
      itemRect.right <= containerRect.right &&
      itemRect.top >= containerRect.top &&
      itemRect.bottom <= containerRect.bottom
    );
  }

   displayTaskDetail(model : AddNewTaskModel) {
    this.displayTaskComponent.openDialog(model);
   }

}
