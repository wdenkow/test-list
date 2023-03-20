import { IUser } from "../../interfaces";

export enum UserActionsType {
    GET_USERS = 'users/getUsers',
    REMOVE_USER_BY_ID = 'users/removeUserByIdAction',
    RESTORE_USERS = 'users/restoreUsersAction'
}

interface IGetUserAction {
    type: UserActionsType.GET_USERS;
    payload: IUser[]
}

interface IRemoveUserById {
    type: UserActionsType.REMOVE_USER_BY_ID;
    payload: IUser[]
}

interface IRestoreUsers {
    type: UserActionsType.RESTORE_USERS;
    payload: IUser[]
}

export type UserActions = IGetUserAction | IRemoveUserById | IRestoreUsers
