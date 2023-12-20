import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { SendDataService } from '../send-data.service';
import { Subscription } from 'rxjs';
import { AddNewTaskModel } from '../models/add-new-task-model';
import { DisplayTaskComponent } from '../display-task/display-task.component';

@Component({
  selector: 'app-task-lanes',
  templateUrl: './task-lanes.component.html',
  styleUrl: './task-lanes.component.css'
})
export class TaskLanesComponent implements OnInit, OnDestroy{
  private addBtnDataSubscription: Subscription | undefined;
  private deleteBtnDataSubscription: Subscription | undefined;
  @ViewChild(DisplayTaskComponent) displayTaskComponent!: DisplayTaskComponent;


  todo : AddNewTaskModel[]= [
    {taskTitle: 'Get to work', dueDate: new Date(2034, 22, 2), description: 'Get to work early', laneName: 'todo'},
    {taskTitle: 'Pick up groceries', dueDate: new Date(2034, 22, 2), description: 'and pick up dinner', laneName: 'todo'},
    {taskTitle: 'Go home', dueDate: new Date(2034, 22, 2), description: '', laneName: 'todo'},
    {taskTitle: 'Sleep', dueDate: new Date(2034, 22, 2), description: '', laneName: 'todo'},
  ]

  inProgress : AddNewTaskModel[]= [
    {taskTitle: 'somethin1', dueDate: new Date(2034, 22, 2), description: '', laneName: 'inProgress'},
    {taskTitle: 'something2', dueDate: new Date(2034, 22, 2), description: '', laneName: 'inProgress'},
    {taskTitle: 'something3', dueDate: new Date(2034, 22, 2), description: '', laneName: 'inProgress'},
  ]

  done : AddNewTaskModel[]= [
    {taskTitle: 'Get up', dueDate: new Date(2034, 22, 2), description: '123', laneName: 'done'},
    {taskTitle: 'Brush teeth', dueDate: new Date(2034, 22, 2), description: '4561', laneName: 'done'},
    {taskTitle: 'Take a shower', dueDate: new Date(2034, 22, 2), description: '', laneName: 'done'},
    {taskTitle: 'Check e-mail', dueDate: new Date(2034, 22, 2), description: '', laneName: 'done'},
    {taskTitle: 'Walk dog', dueDate: new Date(2034, 22, 2), description: 'Lorem Ipsum', laneName: 'done'},
  ]

  //@ViewChild(AddTaskDirective) lane !: String;
  constructor(private sendData: SendDataService, private cdr: ChangeDetectorRef ) { }

  ngOnInit() {
    // Subscribe to the observable in the service to detect changes
    this.addBtnDataSubscription = this.sendData.getDataObservable().subscribe(updatedData => {
      if(updatedData != null) {
        switch(updatedData.laneName) {
          case 'todo':
            this.todo.push(updatedData);
            break;
          case 'inProgress':
            this.inProgress.push(updatedData);
            break;
          case 'done':
            this.done.push(updatedData);
            break;
        }
      }
   });

   this.deleteBtnDataSubscription = this.sendData.getDeleteDataObservable().subscribe(data => {
    if(data != null) {
      switch(data.laneName) {
        case 'todo':
          this.todo = this.todo.filter(item => item.taskTitle !== data.taskTitle);
          break;
        case 'inProgress':
          this.inProgress = this.inProgress.filter(item => item.taskTitle !== data.taskTitle);
          break;
        case 'done':
          this.done = this.done.filter(item => item.taskTitle !== data.taskTitle);
          break;
      }
    }
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

  displayTaskDetail(taskTitle : string) {
    console.log(this.displayTaskComponent, 'here here');
   this.displayTaskComponent.openDialog();
  }

}
