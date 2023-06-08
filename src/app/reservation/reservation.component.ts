import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';
@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent {
   
  showform=false;
showForm(){
    this.showform=true;
  }

  constructor(public dialog: MatDialog) {}




  showNotifications: boolean = false;
  
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
   }
   // ...



   displayedColumns: string[] = ['mail','intitule', 'date', 'personne','temps','tele' ,'button','btn',];

   dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);
   
   onCancel(element: Element): void {
 
     // Do something when cancel button is clicked for this element
   }
   
   
 }
 
 export interface Element {
  mail: string;
  intitule:string;
  date: string;
  personne:string;
  temps:string;
   tele: string;
 
 
 }
 
 const ELEMENT_DATA: Element[] = [
   {mail: 'orenda@gmail.com',intitule:'orenda junior entreprise', date: '20/03/2023', personne: '6 personnes',temps: '2 moins', tele: '26881955', },
   {mail:'marwa@gmail.com', intitule:'Ayari marwa',date: '5/06/2023', personne: '2 personnes',temps: '1 moins', tele: '21555055',},
   {mail:'Wevioo@gmail.com', intitule:'Wevioo',date: '09/05/2023', personne: '10 personnes',temps: '1 jour', tele: '26881955', },
   {mail: 'yassine@gmail.com', intitule:'Mansouri Yassine',date: '09/05/2023',  personne: '1 personne',temps: '2 moins',tele: '26881955', },
   {mail: 'ahmed@gmail.com', intitule:'Ayari ahmed',date: '05/06/2023',  personne: '2 personne',temps: '4 moins',tele: '26881955', },
];
