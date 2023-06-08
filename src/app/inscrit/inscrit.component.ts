import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { VariablesGlobales } from '../_helpers/variablesGlobales';
import { UploaderCaptions } from 'ngx-awesome-uploader';
import { FilesPickerAdapter } from '../_helpers/file-picker.adapter';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../_services/user.service';
import { UserOne } from '../_models/userOne';

@Component({
  selector: 'app-inscrit',
  templateUrl: './inscrit.component.html',
  styleUrls: ['./inscrit.component.css']


})
export class InscritComponent implements OnInit {
  form: any = {};
  isCandidateSuccessful = false;
  isCandidateSignUpFailed = false;
  isRecruiterSuccessful = false;
  isRecruiterSignUpFailed = false;
  errorMessage = '';
  code: string;
  user: UserOne = new UserOne();
  public adapter = new FilesPickerAdapter(this.http, this.global);
  public captions: UploaderCaptions = {
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

  constructor(private route: ActivatedRoute,private userService:UserService, private authService: AuthService, private global: VariablesGlobales, private http: HttpClient,
  ) { }

  ngOnInit() {
    this.code = this.route.snapshot.params['code'];
  }


  public uploadSuccess(event): void {
    this.global.photo = event.uploadResponse.fileDownloadUri;
  }

  onFileChanged(event: any) {
    const file = event.target.files[0];
    this.form.image = file;
  }
  onLogoChanged(event: any) {
    const file = event.target.files[0];
    this.form.logo = file;
  }
  onSubmitCandidate() {
    this.authService.registerCandidate(this.form, this.code).subscribe(
      data => {
        console.log(data);
        this.isCandidateSuccessful = true;
        this.isCandidateSignUpFailed = false;
        this.user.userName=this.form.username;
        console.log(this.user.userName);
        this.userService.adduser(this.user).subscribe();
        
      },
      err => {
        this.errorMessage = err.error.message;
        this.isCandidateSignUpFailed = true;
      })
     
      
  }


  onSubmitRecruiter() {
    this.authService.registerRecruiter(this.form).subscribe(
      data => {
        console.log(data);
        this.isRecruiterSuccessful = true;
        this.isRecruiterSignUpFailed = false;
          this.user.userName=this.form.usernameRepresentative;
        console.log(this.user.userName);
        this.userService.adduser(this.user).subscribe();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isRecruiterSignUpFailed = true;
      }
    );
  }
}

