import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from '../_services/candidate.service';
import { RecruiterService } from '../_services/recruiter.service';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-profilc',
  templateUrl: './profilc.component.html',
  styleUrls: ['./profilc.component.css']
})
export class ProfilcComponent implements OnInit {

  candidate: any[];
  keyword: string;
  filteredOffers: any[] = [];

  constructor(private router: Router, private candidateService: CandidateService, private userService: UserService) { }

  ngOnInit(): void {
    this.candidateService.getAllCandidates().subscribe(data => {
      this.candidate = data;
    })
    this.candidateService.getAllCandidates().subscribe(data => {
      this.filteredOffers = data;
    })

  }

  deleteUser(id: number) {
    this.userService.deletUser(id).subscribe(data => {
    })
    this.ngOnInit();
  }


  filterOffers() {
    this.filteredOffers = this.candidate.filter(cand => {
      const matchesKeyword = !this.keyword ||
        cand.city.toLowerCase().includes(this.keyword.toLowerCase()) ||
        cand.username.toLowerCase().includes(this.keyword.toLowerCase());
      return matchesKeyword;
    });
  }

}
