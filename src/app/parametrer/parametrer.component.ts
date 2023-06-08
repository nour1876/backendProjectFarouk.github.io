import { Component } from '@angular/core';

@Component({
  selector: 'app-parametrer',
  templateUrl: './parametrer.component.html',
  styleUrls: ['./parametrer.component.css']
})
export class ParametrerComponent {
  showNotifications: boolean = false;
  
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
   }


}
