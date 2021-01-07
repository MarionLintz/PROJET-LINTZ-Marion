import { FormControl } from '@angular/forms';

export interface Client {
  civilite: FormControl;
  nom: FormControl;
  prenom: FormControl;
  adresse_num: FormControl;
  adresse_rue: FormControl;
  adresse_cp: FormControl;
  adresse_ville: FormControl;
  adresse_pays: FormControl;
  tel: FormControl;
  email: FormControl;
  password: FormControl;
  password_conf: FormControl;
  login: FormControl;
}
