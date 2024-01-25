import { Timestamp } from '@firebase/firestore';
export interface AddNewTaskModel {
    id: string;
    Task_Title: string;
    Due_Date : Timestamp;
    Description: string;
    Lane_Name: string;
    Operation: string;
    Priority: string;
}
