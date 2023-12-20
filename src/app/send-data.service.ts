import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, Observable, take } from 'rxjs';
import { AddNewTaskModel } from './models/add-new-task-model';
import { DeleteTaskModel } from './models/delete-task-model';

@Injectable({
  providedIn: 'root'
})
export class SendDataService {
  data = new Subject<AddNewTaskModel>;
  public data$ = this.data.asObservable();
  
  deleteTaskTitle = new Subject<DeleteTaskModel>;
  public delete = this.deleteTaskTitle.asObservable();


  constructor() { }

  setData(temp: AddNewTaskModel) : void {
    this.data.next(temp);
  }

  getDataObservable(): Observable<AddNewTaskModel> {
    return this.data$;
  }

  setDeleteTaskTitle(temp : DeleteTaskModel) : void {
    this.deleteTaskTitle.next(temp);
  }

  getDeleteDataObservable() : Observable<DeleteTaskModel> {
    return this.delete;
  }

}
