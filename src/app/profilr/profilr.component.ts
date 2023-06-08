import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from '../_services/recruiter.service';


@Component({
  selector: 'app-profilr',
  templateUrl: './profilr.component.html',
  styleUrls: ['./profilr.component.css']
})
export class ProfilrComponent {
  recruiter: any[];
  keyword: string;
  filteredOffers: any[] = [];

  constructor(private router: Router, private recruiterService: RecruiterService) { }

  ngOnInit(): void {

    this.recruiterService.getAllRecruters().subscribe(data => {
      this.recruiter = data;
    })
    this.recruiterService.getAllRecruters().subscribe(data => {
      this.filteredOffers = data;
    })
  }


  filterOffers() {
    this.filteredOffers = this.recruiter.filter(rec => {
      const matchesKeywords = !this.keyword ||
        rec.activityDomain.toLowerCase().includes(this.keyword.toLowerCase()) ||
        rec.companyName.toLowerCase().includes(this.keyword.toLowerCase()) ||
        rec.username.toLowerCase().includes(this.keyword.toLowerCase());
      return matchesKeywords;
    });
  }
}
