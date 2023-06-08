import { Component, OnInit } from '@angular/core';
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
import { Contact } from '../_models/contact';

@Component({
  selector: 'app-propos',
  templateUrl: './propos.component.html',
  styleUrls: ['./propos.component.css']
})
export class ProposComponent implements OnInit {


  contact: Contact = new Contact();
  submissionError: string;
  submissionSuccess: boolean;


  constructor(private tokenStorageService: TokenStorageService,
    private router: Router, private recruiterService: RecruiterService,
    private global: VariablesGlobales, private http: HttpClient, private userService: UserService) { }



  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
  }


  ngOnInit() {

  }


  submitForm(): void {
    this.userService.createContact(this.contact).subscribe(
      () => {
        this.submissionSuccess = true;
        this.contact = new Contact();
      },
      error => {
        this.submissionError = error;
      }
    );
  }
}
