import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { CandidateService } from '../_services/candidate.service';

@Component({
  selector: 'app-candidatures-c',
  templateUrl: './candidatures-c.component.html',
  styleUrls: ['./candidatures-c.component.css']
})
export class CandidaturesCComponent implements OnInit {
  message:any;
  offers:any;
  showNotifications: boolean = false;
  dataSource:any;
  specialOffer:any;
  society:any
  user:any;
  constructor(private candidateService:CandidateService){}
  ngOnInit(): void {
    this.candidateService.getCandidateById(localStorage.getItem('id')).subscribe(d=>{
      this.user=d;
      console.log(this.user);
    })
    this.candidateService.getAllOffersById(localStorage.getItem('id')).subscribe(d=>{
      this.offers=d;
      this.dataSource = this.offers;

    })
  } 
  getOfferById(id:any){
    this.candidateService.getOfferById(id).subscribe(d=>{
      this.specialOffer=d;
      console.log(this.specialOffer);
    });
  }
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
   }
   // ...
   displayedColumns: string[] = ['companyName', 'title', 'status', 'button'];

 
  
  onCancel(id: any){
   this.candidateService.deleteResgistration(id).subscribe(
    () => {
      console.log('Offer registration deleted successfully');
      this.ngOnInit();
      // Handle success here, such as displaying a success message
    },
    (error) => {
      console.error('Failed to delete offer registration:', error);
      // Handle error here, such as displaying an error message
    })
   
  }
}

export interface Element {
  name: string;
  position: string;
  weight: string;


}

const ELEMENT_DATA: Element[] = [
  {position: 'Wevioo', name: 'Ingénieur Développement', weight: 'En attente', },
  {position:'Adactim', name: 'Ingénieur Développement', weight: 'En attente',},
  {position:'Telecom', name: 'Ingénieur Développement', weight: 'En attente', },
  {position: 'Adactim', name: 'Ingénieur Développement', weight: 'En attente', },
  {position: 'Wevioo', name: 'Ingénieur Développement', weight: 'En attente', },
 
];