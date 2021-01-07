import { User } from "../models/user";

export class SetCurrentUser{
    static readonly type = '[CurrentUser] Set';

    constructor(public payload: User){}
}