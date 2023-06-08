import { Component, OnInit  } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { CandidateService } from '../service/candidate.service';
import { User } from '../_models/user';

@Component({
  selector: 'app-candidat',
  templateUrl: './candidat.component.html',
  styleUrls: ['./candidat.component.css']
})
export class CandidatComponent implements OnInit{
  candidat:any
  pts:any
  constructor(private tokenStorageService: TokenStorageService,private candidateService:CandidateService,
    private router: Router) { }

  ngOnInit() {
    
    this.candidateService.getCandidateById(JSON.parse(localStorage.getItem("userid")!) ?? null).subscribe(
      d=>{this.candidat=d;
        console.log("candidat",this.candidat);
      }
    )
  }

  logout() {
    this.tokenStorageService.signOut();
    this.router.navigate(['/home']);
  }
}
