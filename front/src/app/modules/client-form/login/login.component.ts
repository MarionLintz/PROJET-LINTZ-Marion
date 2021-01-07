import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { SetCurrentUser } from 'src/shared/actions/authentication.action';
import { User } from 'src/shared/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  allSubscription: Subscription[] = [];

  constructor(private formBuilder: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private store: Store) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      login: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnDestroy(){
    this.allSubscription.forEach((subscription) => subscription.unsubscribe());
  }

  onSubmit(){
    const sub1: Subscription = this.dataService.Login(this.form.value).subscribe((res:any) => {
      if(res.success){
        const currentUser: User = res.user as User;
        this.store.dispatch(new SetCurrentUser(currentUser));
        this.router.navigate(['/home']);
      }
      else{
        alert("Echec");
      }
    });
    
    this.allSubscription.push(sub1);
  }

}
