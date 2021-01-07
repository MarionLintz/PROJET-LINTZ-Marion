import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appPasswordControl]',
})
export class PasswordControl {
  constructor(private el: ElementRef) {}
  @Input() control: string;

  public specialChar: Array<string> = ["?", "*", "=", "&", "!", ",", ".", ";", "^", "-", "_"];
  public number: Array<string> = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  public MIN_CHAR: number = 6;
  @HostListener('focusout') onMouseLeave(){
    let containSpecialChar: boolean = false;
    let containNumber: boolean = false;
    let containsMinChar: boolean = false;

    if(!this.control)
      return;

    if(this.control.length >= this.MIN_CHAR){
      containsMinChar = true;
    }
    
    for(let i = 0; i<this.control.length; i++){
      if(containNumber && containSpecialChar)
        break;
      let charToCompare = this.control.charAt(i);
      if(this.specialChar.indexOf(charToCompare) > -1)
        containSpecialChar = true;
      if(this.number.indexOf(charToCompare) > -1)
        containNumber = true;
    }

    let message: string = "";

    if(!containsMinChar)
      message += 
        "• Le mot de passe doit contenir un minimum de 6 caractères.\n"
    if(!containNumber)
      message += 
        "• Le mot de passe doit contenir au moins un chiffre.\n";
    if (!containSpecialChar) {
      message +=
        '• Le mot de passe doit contenir au moins un caractère spécial : (';
      this.specialChar.forEach((sc) => (message += ' ' + sc + ','));
      message.substr(0, this.specialChar.length - 3);
      message += ' ).';
    }

    if(message.length>0)
      alert(message);
  }

  
}
