import { Component, OnInit, ViewChild } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { CandidateService } from '../_services/candidate.service';
import { ActivatedRoute, Router, } from '@angular/router';
import { DatePipe } from '@angular/common';
import { NgForm } from '@angular/forms';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { FilesPickerAdapter } from '../_helpers/file-picker.adapter';
import { VariablesGlobales } from '../_helpers/variablesGlobales';
import { HttpClient } from '@angular/common/http';
import { CheckSessionService } from '../check-session.service';
import { RecruiterService } from '../_services/recruiter.service';


@Component({
  selector: 'app-detailoffre',
  templateUrl: './detailoffre.component.html',
  styleUrls: ['./detailoffre.component.css']
})
export class DetailoffreComponent implements OnInit {
  showNotifications: boolean = false;
  loading = true;
  errorMessage = '';
  offer: any = {};
  candidate: any = {};
  form: any = {};
  formOfferRegistration: any = {};
username:any;
recipient :any;
  
  public adapter = new FilesPickerAdapter(this.http, this.global);

  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Certificat',
      or: 'Faites glisser et déposez votre Certificat ici',
      browse: 'Parcourir',
    },
    cropper: {
      crop: '',
      cancel: '',
    },
    previewCard: {
      remove: '',
      uploadError: '',
    },
  };

  public caption: UploaderCaptions = {
    dropzone: {
      title: 'Tests',
      or: 'Faites glisser et déposez vos tests ici',
      browse: 'Parcourir',
    },
    cropper: {
      crop: '',
      cancel: '',
    },
    previewCard: {
      remove: '',
      uploadError: '',
    },
  };

  constructor(private tokenStorageService: TokenStorageService,private chatSessionService: CheckSessionService,
    private router: ActivatedRoute, private route: Router, private candidateService: CandidateService,
    private datePipe: DatePipe, private global: VariablesGlobales, private http: HttpClient,private recruterService:RecruiterService) { }

  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
  }
  // ...


  showform = false;
  showForm() {
    this.showform = true;
  }

  logout() {
    this.tokenStorageService.signOut();
    this.route.navigate(['/home']);
  }

  ngOnInit(): void {
    this.candidateService.getOfferById(this.router.snapshot.params['id'])
      .subscribe(data => {
        this.offer = JSON.parse(JSON.stringify(data));
        this.offer.publication_date = this.datePipe.transform(this.offer.publication_date, 'dd/MM/yyyy');
        this.recruterService.getRecruiterAccount(this.offer.recruter_id).subscribe(d=>{
          this.recipient=d.username;
        })
        console.log("offer",this.offer);
        console.log("recid",this.offer.recruter_id);
      });
    this.candidateService.getCandidateAccount(this.tokenStorageService.getUser().id)
      .subscribe(data => {
        this.candidate = JSON.parse(JSON.stringify(data));
        console.log(this.candidate);
        this.username=this.candidate.username;
      });
     
      this.chatSessionService.setUsername(this.username);
    this.chatSessionService.setRecipient(this.recipient);
  }

  public uploadCV(event): void {
    this.global.cv = event.uploadResponse.fileDownloadUri;
  }
  openChatSession(): void {
    this.chatSessionService.setUsername(this.username);
    this.chatSessionService.setRecipient(this.recipient);
    this.route.navigate(['/chat-session']);
  }
  public uploadLetter(event): void {
    this.global.coverLetter = event.uploadResponse.fileDownloadUri;
  }


  postulateOffer(f: NgForm) {
    this.formOfferRegistration.candidateId = this.candidate.id;
    this.formOfferRegistration.offerId = this.offer.id;
    console.log(this.formOfferRegistration);
    this.candidateService.registerOffer(this.formOfferRegistration).subscribe(
      data => {
        console.log(data);
        this.route.navigate(['/offre']);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
}