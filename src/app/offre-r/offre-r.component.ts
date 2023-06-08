import { Component } from '@angular/core';

@Component({
  selector: 'app-offre-r',
  templateUrl: './offre-r.component.html',
  styleUrls: ['./offre-r.component.css']
})
export class OffreRComponent {
  showNotifications: boolean = false;
  
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
   }
   // ...
   showform=false;
   showForm(){
       this.showform=true;
     }
}
