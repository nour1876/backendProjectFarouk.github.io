import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { RecruiterService } from '../_services/recruiter.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidateService } from '../_services/candidate.service';
import { forkJoin } from 'rxjs';

declare var jQuery:any;

@Component({
  selector: 'app-candidatures-r',
  templateUrl: './candidatures-r.component.html',
  styleUrls: ['./candidatures-r.component.css']
})
export class CandidaturesRComponent implements OnInit {
  loading: boolean = false;
  showform = false;
  showForm() {
    this.showform = true;
  }
  recruiter?: any = {
    offerEntity: []
  };
  offer_count?: number;
  offers?: any;
  element_data: Element[] = [];
  dataSource = new MatTableDataSource<Element>();
  profileCandidat?: string;
  formAccesTest: any = { testId: '', offerRegistrationId: '' };
  link: string;
  elementEmail:any;
 message:any;
  constructor(private tokenStorageService: TokenStorageService,
    private router: Router, private recruiterService: RecruiterService,private snackBar: MatSnackBar,private candidateService:CandidateService) { }

  ngOnInit(): void {
    if (this.tokenStorageService.getToken()) {
      this.recruiterService.getRecruiterAccount(this.tokenStorageService.getUser().id)
        .subscribe(data => {
          this.recruiter = JSON.parse(JSON.stringify(data));
          this.offer_count = this.recruiter.offerEntity.length;
          this.recruiter.offerEntity.forEach((offer: any) => {
            this.calculateDaysOfOffer(offer);
          });
          console.log(this.recruiter);
        });
      this.recruiterService.getOffers(this.tokenStorageService.getUser().id)
        .subscribe(data => {
          this.offers = data;
          this.selectRegistrationOffer("Ui Design");
        });
    }
  }
  openRejectionModal(email:string){
    this.elementEmail = email;
    jQuery('.delete-event').modal('show');
  }


  selectRegistrationOffer(categorie: string) {
    console.log(this.offers);
    this.element_data = this.offers
      .filter((offer: any) => offer.categorie === categorie) // filtrer les offres avec la catégorie A
      .flatMap((offer: any) =>
        offer.offerRegistrationDtos.map((registration: any) => ({
          id: registration.id,
          mail: registration.mail,
          nom: `${registration.first_name} ${registration.last_name}`,
          cv: registration.cv,
          lettre: registration.cover_letter,
          lien: offer.portfolio_link,
          weight: registration.status
        }))
      );
    this.profileCandidat = categorie;
    console.log(this.element_data);
    this.dataSource = new MatTableDataSource<Element>(this.element_data);
  }
 updateRegistration(id:any){
  this.candidateService.updateRegistration(id,"Accepté(e)").subscribe(() => {
    console.log('Offer registration deleted successfully');
    // Handle success here, such as displaying a success message
  });
 }
  sendTestToCandidate(id:any) {
    this.loading=true;
    this.recruiterService.sendTestToCandidate(this.formAccesTest.offerRegistrationId, this.formAccesTest.testId, this.recruiter.id)
      .subscribe(data => {
        this.recruiter = data;
        console.log(this.recruiter);
        this.recruiterService.getOffers(this.tokenStorageService.getUser().id)
        .subscribe(data => {
          this.offers = data;
          this.selectRegistrationOffer("Développement");
        });
      })
    //window.location
  }
  sendRejectionToCandidate(id: any) {
    this.loading=true;
    const updateRegistration$ = this.candidateService.updateRegistration(id, "Refusé(e)");
    const sendRejection$ = this.recruiterService.sendRejectionToCandidate(this.elementEmail);
  
    // Combine the observables and wait for both requests to complete
    forkJoin([updateRegistration$, sendRejection$]).subscribe(() => {
      this.recruiterService.getOffers(this.tokenStorageService.getUser().id)
      .subscribe(data => {
        this.offers = data;
        this.selectRegistrationOffer("Développement");
      });
      this.closeModal('.delete-event');
    });
  }
  
closeModal(modalClass:string){
  jQuery(modalClass).modal('hide');
}
  onRowClick(element: any) {
    this.link = null;
    this.link = 'http://localhost:4200/quiz/' + element
    this.link = this.link + '/' + this.recruiter.id
    console.log(this.link);
  }

  calculateDaysOfOffer(offer?: any) {
    const now = new Date().getTime();
    const publicationDate = new Date(offer.publishDate).getTime();
    const diff = now - publicationDate;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    offer.diffDays = diffDays;
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
  }

  sendLink(email: string, link: string,id:any) {
    this.updateRegistration(id);
    this.loading=true;
    this.recruiterService.sendLink(email, link).subscribe(data => {
      this.loading = false;
      this.recruiterService.getOffers(this.tokenStorageService.getUser().id)
      .subscribe(data => {
        this.offers = data;
        this.selectRegistrationOffer("Développement");
      });   // Handle success here, such as displaying a success message
      },
      )  
  }
  
  showNotifications: boolean = false;

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  // ...

  displayedColumns: string[] = ['mail', 'nom', 'cv', 'lettre', 'lien', 'weight', 'button', 'btn',];


  onCancel(element: Element) {
    this.link = null;
    this.link = 'http://localhost:4200/quiz/' + element
    this.link = this.link + '/' + this.recruiter.id
    console.log(this.link);

  }

}

export interface Element {
  mail: string;
  nom: string;
  cv: string;
  lettre: string;
  lien: string;
  weight: string;

}
