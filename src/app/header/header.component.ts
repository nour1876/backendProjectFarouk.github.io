import { Component } from '@angular/core';
interface Card {
  image: string;
  title: string;
  description: string;
}
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
  
})
export class HeaderComponent {
myimage:string ="assets/images/img_1.jpg";

}




