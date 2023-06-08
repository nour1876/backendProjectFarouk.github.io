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

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {


  profile: any = {};
  user?: User;
  newPassword: string;
  confirmedPassword: string;
  changePasswordError: string;
  changePasswordSuccess: string;

  public adapter = new FilesPickerAdapter(this.http, this.global);
  public captions: UploaderCaptions = {
    dropzone: {
      title: 'Photo',
      or: 'Changer photo de profil',
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

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router, private recruiterService: RecruiterService,
    private global: VariablesGlobales, private http: HttpClient, private userService: UserService) { }


  public uploadSuccess(event): void {
    this.global.photo = event.uploadResponse.fileDownloadUri;
    this.user.logo = this.global.photo;
    this.updateUser();
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
  }


  ngOnInit() {
    if (this.tokenStorageService.getToken()) {
      this.userService.getUserById(this.tokenStorageService.getUser().id)
        .subscribe(data => {
          this.user = JSON.parse(JSON.stringify(data));
          console.log(this.user);
        });
    }
  }

  updateUser() {

    this.userService.updateUser(this.user, this.user.id).subscribe(
      (data) => {
        this.ngOnInit();
      },
      (error) => console.log(error)
    );
  }

  changePassword(): void {
    let passwordData = {
      newPassword: this.newPassword,
      confirmedPassword: this.confirmedPassword
    };

    this.userService.changePassword(this.user.id, passwordData).subscribe(
      () => {
        this.changePasswordSuccess = 'Password changed successfully';
        this.clearFields();
      },
      error => {
        this.changePasswordError = error;
      }
    );
  }

  clearFields(): void {
    this.newPassword = '';
    this.confirmedPassword = '';
  }
}
