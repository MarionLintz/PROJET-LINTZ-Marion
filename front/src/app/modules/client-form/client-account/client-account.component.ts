import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { DataService } from 'src/app/services/data.service';
import { Client } from 'src/shared/models/client';

@Component({
  selector: 'app-client-account',
  templateUrl: './client-account.component.html',
  styleUrls: ['./client-account.component.scss']
})
export class ClientAccountComponent implements OnInit {
  isConfPasswordValid = true;
  allSubscription: Array<Subscription> = new Array<Subscription>();
  
  formClient: FormGroup;

  constructor(private dataService: DataService,
              private router: Router,
              private formBuilder: FormBuilder) 
  {  }

  ngOnInit(): void {
    let client: Client = <Client>{
      civilite: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]*')]),
      nom: new FormControl('', [Validators.required, Validators.pattern('[A-zÀ-ú]*')]),
      prenom: new FormControl('', [Validators.required, Validators.pattern('[A-zÀ-ú]*')]),
      adresse_num: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z0-9]*')]),
      adresse_rue: new FormControl('', [Validators.required, Validators.pattern('[A-zÀ-ú ]*')]),
      adresse_cp: new FormControl('', [Validators.required, Validators.pattern('[0-9]{5}')]),
      adresse_ville: new FormControl('', [Validators.required, Validators.pattern('[A-zÀ-ú]*')]),
      adresse_pays: new FormControl('', [Validators.required, Validators.pattern('[A-zÀ-ú]*')]),
      tel: new FormControl('', [Validators.required, Validators.pattern('[0-9 ]{15}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      password_conf: new FormControl('', [Validators.required]),
      login: new FormControl('', [Validators.required])
    }

    this.formClient = this.formBuilder.group(client);
    this.onValueChange();
  }

  ngOnDestroy(){
    this.allSubscription.forEach((subscription) => subscription.unsubscribe());
  }

  onValueChange(): void{
    const sub = this.formClient.get('password_conf').valueChanges.subscribe((conf_val: string) => {
      if(this.formClient.get('password').value !== conf_val)
        this.isConfPasswordValid = false;
      else
        this.isConfPasswordValid = true;
    });

    this.allSubscription.push(sub);
  }

  onSubmit(){
    if(this.isConfPasswordValid){
      const sub = this.dataService.Register(this.formClient.value).subscribe((result: any) => {
        this.router.navigate(['client-form/recap'], {queryParams: result.data});
      });

      this.allSubscription.push(sub);
    }
  }



  get civilite() { return this.formClient.get('civilite'); }
  get nom() { return this.formClient.get('nom'); }
  get prenom() { return this.formClient.get('prenom'); }
  get adresse_num() { return this.formClient.get('adresse_num'); }
  get adresse_rue() { return this.formClient.get('adresse_rue'); }
  get adresse_cp() { return this.formClient.get('adresse_cp'); }
  get adresse_ville() { return this.formClient.get('adresse_ville'); }
  get adresse_pays() { return this.formClient.get('adresse_pays'); }
  get tel() { return this.formClient.get('tel'); }
  get email() { return this.formClient.get('email'); }
  get password() { return this.formClient.get('password'); }
  get password_conf() { return this.formClient.get('password_conf'); }
  get login() { return this.formClient.get('login'); }
}
