import { Component, OnInit } from '@angular/core';
import { CandidateService } from '../service/candidate.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-poste',
  templateUrl: './poste.component.html',
  styleUrls: ['./poste.component.css']
})
export class PosteComponent implements OnInit {
  projects:any;
  username:any;
  constructor(private candidateService:CandidateService,private router:Router){}
  ngOnInit(): void {
    this.candidateService.getAllProjects().subscribe(d=>{
      this.projects=d;
      this.getOwnerForProjects();
    })
  }
  startChat() {
    this.router.navigate(['/r']);
  }
  getOwnerForProjects(): void {
    this.projects.forEach(project => {
      this.candidateService.getCandidateByProjectId(project.id).subscribe((owner:any) => {
        this.username = owner.username;
      });
    });
  }

}
