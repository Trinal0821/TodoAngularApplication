export interface UserDataModel {
   id: string;
   User_Name: string;
   Password: string;
   First_Name: string;
   Last_Name: string;
}

export type NullableUserDataModel = UserDataModel | null;
