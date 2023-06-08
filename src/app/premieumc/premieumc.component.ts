import { Component } from '@angular/core';

@Component({
  selector: 'app-premieumc',
  templateUrl: './premieumc.component.html',
  styleUrls: ['./premieumc.component.css']
})
export class PremieumcComponent {
  showNotifications: boolean = false;
  
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
   }
}
