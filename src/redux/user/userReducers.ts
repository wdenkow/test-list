import { Dispatch } from "redux"
import { IUser } from "../../interfaces"
import { RootState } from "../store"
import { UserActions, UserActionsType } from "./interfaces"

interface IInitialState {
    users: {
        allUsers: IUser[] | [],
        filteredUsers: IUser[] | [],
    }
}

const initialState: IInitialState = {
    users: {
        allUsers: [],
        filteredUsers: [],
    }
}

export const usersReducer = (state = initialState, action: UserActions): IInitialState => {
    switch (action.type) {
        case UserActionsType.GET_USERS:
            return {
                ...state,
                users: {
                    ...state.users,
                    allUsers: [...action.payload],
                    filteredUsers: [...action.payload],
                }
            }
            case UserActionsType.REMOVE_USER_BY_ID:
                return {
                    ...state,
                    users: {
                        ...state.users,
                        filteredUsers: [...action.payload],
                    }
                }
            case UserActionsType.RESTORE_USERS:
                return {
                    ...state,
                    users: {
                        ...state.users,
                        filteredUsers: [...action.payload],
                    }
                }
        default:
            return state
    }

}

export const fetchUsersThunk = () => {
    return async (dispatch: Dispatch<UserActions>) => {
        try {
            fetch('https://jsonplaceholder.typicode.com/users')
            .then(response => response.json())
            .then(json => {
                dispatch({
                    type: UserActionsType.GET_USERS,
                    payload: json
                });
            })
        } catch (error) {
            console.log(`Error: ${UserActionsType.GET_USERS}`, error);
        }
}}

export const removeUserByIdThunk = (userId: number) => (dispatch: Dispatch<UserActions>, getState: () => RootState) => {
    const state = getState();
    const arr = state.users.filteredUsers.filter((user) => user.id !== userId);

    dispatch({
        type: UserActionsType.REMOVE_USER_BY_ID,
        payload: arr
    });
}

export const restoreFilteredUsers = () => (dispatch: Dispatch<UserActions>, getState: () => RootState) => {
    const {users: { allUsers }} = getState();
    dispatch({
        type: UserActionsType.RESTORE_USERS,
        payload: allUsers
    })
}
