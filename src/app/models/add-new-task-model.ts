import { Timestamp } from '@firebase/firestore';
export interface AddNewTaskModel {
    id: string | undefined;
    Task_Title: string ;
    Due_Date : Timestamp | null;
    Description: string;
    Lane_Name: string;
    Operation: string;
    Priority: string;
}
