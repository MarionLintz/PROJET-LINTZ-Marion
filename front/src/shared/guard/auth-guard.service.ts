import { Injectable } from '@angular/core';
import { CanActivate, Router } from "@angular/router";
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { AuthentificationState } from '../states/authentication.states';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private store: Store, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.store.select(AuthentificationState.getCurrentUser).pipe(
            map((user: User) => {
                if (!user.Nom)
                    this.router.navigateByUrl('/client-form/login');

                return true;
            })
        );
    }
}