import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';


@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.css']
})
export class ListeComponent {

  constructor(public dialog: MatDialog) { }




  showNotifications: boolean = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  // ...



  displayedColumns: string[] = ['mail', 'nom', 'test', 'score', 'weight', 'button', 'btn',];

  dataSource = new MatTableDataSource<Element>(ELEMENT_DATA);

  onCancel(element: Element): void {

    // Do something when cancel button is clicked for this element
  }


}

export interface Element {
  mail: string;
  nom: string;
  test: string;

  weight: string;
  score: string;

}

const ELEMENT_DATA: Element[] = [
  { mail: 'sarra@gmail.com', nom: 'Ayari Sarra', test: 'pdf', score: '60', weight: 'En attente', },
  { mail: 'marwa@gmail.com', nom: 'Ayari marwa', test: 'pdf', score: '90', weight: 'En attente', },
  { mail: 'eya@gmail.com', nom: 'Mansouri Eya', test: 'pdf', score: '10', weight: 'En attente', },
  { mail: 'yassine@gmail.com', nom: 'Mansouri Yassine', test: '50', score: '90', weight: 'En attente', },
  { mail: 'ahmed@gmail.com', nom: 'Ayari ahmed', test: 'pdf', score: '50', weight: 'En attente', },
];



