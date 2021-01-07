import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Client } from 'src/shared/models/client';

@Component({
  selector: 'app-recap-form',
  templateUrl: './recap-form.component.html',
  styleUrls: ['./recap-form.component.scss']
})
export class RecapFormComponent implements OnInit {
  client:Client = {} as Client;
  allSubscription: Array<Subscription> = new Array<Subscription>();

  constructor(private route: ActivatedRoute) {

  }

  ngOnDestroy(){
    this.allSubscription.forEach((subscription) => subscription.unsubscribe());
  }
  
  ngOnInit(): void {
    const sub = this.route.queryParams.subscribe(params => {
      this.client = params as Client;
    });
    this.allSubscription.push(sub);
  }

}
