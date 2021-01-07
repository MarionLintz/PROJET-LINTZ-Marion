
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { SetCurrentUser } from '../actions/authentication.action';
import { AuthentificationStateModel } from '../models/authentication-state-model';
import { User } from '../models/user';

@State<AuthentificationStateModel>({
    name: 'authentication',
    defaults:{
        currentUser: {} as User
    }
})
export class AuthentificationState{
    
    @Selector()
    static getCurrentUser(state: AuthentificationStateModel){
        return state.currentUser;
    }

    @Action(SetCurrentUser)
    add(
        { patchState} : StateContext<AuthentificationStateModel>,
        { payload } : SetCurrentUser
    ) {
        patchState({
            currentUser: payload
        });
    }   
}