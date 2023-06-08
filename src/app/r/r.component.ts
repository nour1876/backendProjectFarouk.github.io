import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { RecruiterService } from '../_services/recruiter.service';
import { Router } from '@angular/router';
import { Offer } from '../_models/offer.model';
import { VariablesGlobales } from '../_helpers/variablesGlobales';
import { HttpClient } from '@angular/common/http';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { FilesPickerAdapter } from '../_helpers/file-picker.adapter';
import { UserService } from '../_services/user.service';
import { User } from '../_models/user';
import { Event } from '../_models/event.model';
import { FormBuilder, Validators } from '@angular/forms';
import { WebSocketService } from '../web-socket.service';
import { CheckSessionService } from '../check-session.service';
import { Subscription } from 'rxjs';
declare var jQuery:any;
@Component({
  selector: 'app-r',
  templateUrl: './r.component.html',
  styleUrls: ['./r.component.css']
})

export class RComponent implements OnInit , OnDestroy {
 pts:any;
  showNotifications: boolean = false;
  recruiter?: any = {
    offerEntity: []
  };
  message:any;
  offers?: any;
  offer_count?: number;
  formOffer: Offer = {};
  formEvent: Event = {};
  event_count?: number
  isToggled = false;
  locked = true;
  profile: any = {};
  user?: User;
  loading = true;
  errorMessage = '';
  deleteEventId:any;
  deleteOfferId:any;
  formOffer1:any
  formGroup1;
updateOfferId:any;
updateEventId:any;
username: string;
recipient: string;
messages: string[] = [];
private subscription: Subscription;
  public adapter = new FilesPickerAdapter(this.http, this.global);
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Photo de couverture',
      or: 'AJOUTER UNE PHOTO DIMENSIONS OPTIMALES 3200 X 410PX',
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
      title: 'Photo',
      or: 'Faites glisser et déposez le photo ici',
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
  formGroup: any;

  constructor(private tokenStorageService: TokenStorageService,private webSocketService:WebSocketService,private chatSessionService:CheckSessionService,
    private router: Router, private recruiterService: RecruiterService,
    private global: VariablesGlobales, private http: HttpClient, private userService: UserService,private formBuilder:FormBuilder) { }
    openDeleteEventModal(id:number){
      this.deleteEventId = id;
      jQuery('.delete-event').modal('show');
    }
    goToChat(){
      const usernameValue = this.recruiter.username;
      console.log(usernameValue);
      const url = `http://localhost:4200/chat?username=${usernameValue}`;
      this.userService.getUserByUsername(usernameValue).subscribe(); 
      window.location.href = url;
  
    }
    openDeleteOfferModal(id:number){
      this.deleteOfferId = id;
      jQuery('.delete-offer').modal('show');
    }
    openUpdateOfferModal(id:number){
      this.updateOfferId = id;
      jQuery('.update-offer').modal('show');
    }
    openUpdateEventModal(id:number){
      this.updateEventId = id;
      console.log(this.updateEventId)
      jQuery('.update-event').modal('show');
    }
  public uploadSuccess(event): void {
    this.global.photo = event.uploadResponse.fileDownloadUri;
    //   this.user.cover = this.global.photo;
    this.userService.updateCover(this.recruiter.id, this.global.photo).subscribe(data => {
      this.ngOnInit();
    })
  }

updateEvent(){
     // Logic to update the offer data

    // You can access the updated offer data from the formGroup
    const updatedEvent = this.formGroup1.value.EventData;

         
    // Call the updateOffer method in your service passing the updated offer data
    this.recruiterService.updateEvent(this.updateEventId, updatedEvent).subscribe(
      () => {
       
        this.ngOnInit();
        this.closeModal('.update-event');
      },
      (error) => {
        // Handle error
        console.error('Error updating offer:', error);
      }
    );
}
  public uploadSucces(event): void {
    this.global.photo = event.uploadResponse.fileDownloadUri;
  }

  toggleButton() {
    this.recruiter.sponsor = !this.recruiter.sponsor;
    this.isToggled = !this.isToggled;
  }
  edit() {
    this.locked = false;

  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
  }

  completePofile() {
    this.profile.id = this.recruiter.id;
    this.profile.website = this.recruiter.website;
    this.profile.foundation_date = this.recruiter.foundationDate;
    this.profile.head_office = this.recruiter.headOffice;
    this.profile.services = this.recruiter.services;
    this.profile.gouvernorat = this.recruiter.gouvernorat;
    this.profile.city = this.recruiter.city;
    this.profile.bio = this.recruiter.bio;
    this.profile.details = this.recruiter.details;
    this.profile.section_title = this.recruiter.sectionTitle;
    this.profile.section_description = this.recruiter.sectionDescription;
    this.profile.is_sponsor = this.recruiter.sponsor;
    this.locked = true;
    this.recruiterService.completeProfileRecruiter(this.profile)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.loading = false;
        }
      );
  }
  publishOfferrrrr() {
    this.formOffer.recruter_id = this.recruiter.id;
    this.recruiterService.publishOffer(this.formOffer)
      .subscribe(
        (data) => {
          console.log(data);
          this.ngOnInit();
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.loading = false;
        }
      );
  }
  updateOffer() {
    // Logic to update the offer data

    // You can access the updated offer data from the formGroup
    const updatedOffer = this.formGroup.value.offerData;

         
    // Call the updateOffer method in your service passing the updated offer data
    this.recruiterService.updateOffer(this.updateOfferId, updatedOffer).subscribe(
      () => {
        // Handle success
        console.log('Offer updated successfully');
        console.log(this.updateOfferId);
        console.log(updatedOffer);
        this.recruiterService.getOffers().subscribe((offers) => {
         console.log("recruiterId",this.tokenStorageService.getUser().id);
          this.recruiter.offerEntity = offers;
        
        });
        this.ngOnInit();
        this.closeModal('.update-offer');
      },
      (error) => {
        // Handle error
        console.error('Error updating offer:', error);
      }
    );
  }
  
  deleteOffer() {
    this.recruiterService.deleteOffer(this.deleteOfferId).subscribe(
      (data) => {
        this.closeModal('.delete-offer');
      },
      (error) => {
        setTimeout(() => {
          this.ngOnInit();
        }, 300);
      });
      this.closeModal('.delete-offer');
    this.ngOnInit();
  };


  publishEvent() {
    this.formEvent.recruter_id = this.recruiter.id;
    this.formEvent.photo = this.global.photo;

    this.recruiterService.publishEvent(this.formEvent)
      .subscribe(
        (data) => {
          console.log(data);
          this.ngOnInit();
         
        },
        (error) => {
          this.errorMessage = error.error.message;
          this.loading = false;
        }
      );
  }
  closeModal(modalClass:string){
    jQuery(modalClass).modal('hide');
  }
  deleteEvent() {
    this.recruiterService.deleteEvent(this.deleteEventId).subscribe(
      (data) => {
        this.closeModal('.delete-event');
      },(error) => {
        setTimeout(() => {
          this.ngOnInit();
        }, 300);
      });
       this.closeModal('.delete-event');
    this.ngOnInit();
  };


  calculateDaysOfOffer(offer?: any) {
    const now = new Date().getTime();
    const publicationDate = new Date(offer.publishDate).getTime();
    const diff = now - publicationDate;
    const diffDays = Math.floor(diff / (1000 * 60 * 60 * 24));
    offer.diffDays = diffDays;
  }

  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.recruiterService.getRecruiterAccount(this.tokenStorageService.getUser().id)
        .subscribe(data => {
          this.recruiter = JSON.parse(JSON.stringify(data));
          this.offer_count = this.recruiter.offerEntity.length;
          this.event_count = this.recruiter.eventEntity.length;
          this.recruiter.offerEntity.forEach((offer: any) => {
            this.calculateDaysOfOffer(offer);
          });
          this.locked = true;
          console.log(this.recruiter);
        });
    }
    this.formGroup1=this.formBuilder.group({
      EventData:this.formBuilder.group({
        title:[this.formEvent.title,Validators.required],
        description:[this.formEvent.description,Validators.required],
        typeEvent:[this.formEvent.typeEvent,Validators.required],

      })
    });
    this.formGroup = this.formBuilder.group({
      offerData: this.formBuilder.group({
        title: [this.formOffer.title, Validators.required],
        categorie: [this.formOffer.categorie, Validators.required],
        description: [this.formOffer.description, Validators.required],
        salaire: [this.formOffer.salaire, Validators.required],
        localisation:[this.formOffer.localisation, Validators.required],
        nature_de_travail: [this.formOffer.nature_de_travail, Validators.required]
      })
    });
    this.webSocketService.connect(this.username);
    this.subscription = this.webSocketService.getReceivedMessages().subscribe((message: any) => {
      if (message.sender === this.recipient || message.recipient === this.recipient) {
        this.messages.push(`${message.sender}: ${message.message}`);
      }
    });
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
    this.subscription.unsubscribe();
  }

  sendMessage(message:any): void {
    this.webSocketService.sendMessage(this.username, this.recipient,message);
    this.message=message;
    this.messages.push(message);
   
  }
   

  openChatSession(): void {
    this.chatSessionService.setUsername(this.username);
    this.chatSessionService.setRecipient(this.recipient);
    this.router.navigate(['/chat-session']);
  }
}
