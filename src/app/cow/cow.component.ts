import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../service/candidate.service';

@Component({
  selector: 'app-cow',
  templateUrl: './cow.component.html',
  styleUrls: ['./cow.component.css']
})
export class CowComponent implements OnInit {
  candidat:any;
  pts:any;
  constructor(private candidateService:CandidateService){}
  ngOnInit(): void {
    console.log(localStorage.getItem("id"));
    this.candidateService.getCandidateById(JSON.parse(localStorage.getItem("id")!) ?? null).subscribe(
      d=>{this.candidat=d;
        console.log("candidat",this.candidat);
        this.pts=this.candidat.points.xp;
        console.log(this.pts);
      }
    )
  }
  showNotifications: boolean = false;
  
  toggleNotifications() {
    this.showNotifications = !this.showNotifications;
   }
   
   // ...
}
