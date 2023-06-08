import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from '../_services/recruiter.service';


@Component({
  selector: 'app-offrer',
  templateUrl: './offrer.component.html',
  styleUrls: ['./offrer.component.css']
})
export class OffrerComponent implements OnInit {

  offer: any[];
  keyword: string;
  filteredOffers: any[] = [];

  constructor(private router: Router, private recruiterService: RecruiterService) { }

  ngOnInit(): void {
    this.recruiterService.getOfferList().subscribe(data => {
      this.offer = data;
    })
    this.recruiterService.getOfferList().subscribe(data => {
      this.filteredOffers = data;
    })

  }

  acceptOffer(id: number) {
    this.recruiterService.acceptOffer(id).subscribe(data => {
      this.ngOnInit()
    })
  }

  rejectOffer(id: number) {
    this.recruiterService.rejectOffer(id).subscribe(data => {
      this.ngOnInit()
    })
  }

  filterOffers() {
    this.filteredOffers = this.offer.filter(offers => {
      const matchesKeyword = !this.keyword ||
        offers.company_name.toLowerCase().includes(this.keyword.toLowerCase()) ||
        offers.nature_de_travail.toLowerCase().includes(this.keyword.toLowerCase()) ||
        offers.localisation.toLowerCase().includes(this.keyword.toLowerCase()) ||
        offers.title.toLowerCase().includes(this.keyword.toLowerCase());
      return matchesKeyword;
    });
  }

}
