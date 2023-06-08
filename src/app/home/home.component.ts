import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { RecruiterService } from '../_services/recruiter.service';
import { CandidateService } from '../_services/candidate.service';

interface Card {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isOpen = false;
  offers?: any;
  event?: any;

  filteredOffers: any[] = [];
  filteredEvent: any[] = [];

  selectedService: string;
  selectedRegion: string;
  keyword: string;

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  constructor(private http: HttpClient, private recruiterService: RecruiterService, private candidateService: CandidateService) { }
  ngOnInit(): void {
    this.candidateService.getAllOffers()
      .subscribe(data => {
        this.offers = data;
      });

    this.recruiterService.getAllEvents()
      .subscribe(data => {
        this.filteredEvent = data;
      });


    this.recruiterService.getAllEvents()
      .subscribe(data => {
        this.event = data;
      });

    this.candidateService.getAllOffers()
      .subscribe(data => {
        this.filteredOffers = data;
      });


  }

  filterOffers() {
    this.filteredOffers = this.offers.filter(offer => {
      const matchesService = !this.selectedService || offer.nature_de_travail === this.selectedService;
      const matchesRegion = !this.selectedRegion || offer.localisation === this.selectedRegion;
      const matchesKeyword = !this.keyword || offer.title.toLowerCase().includes(this.keyword.toLowerCase());

      return matchesService && matchesRegion && matchesKeyword;
    });
    console.log(this.filteredOffers)
  }


  filterEvent() {
    this.filteredEvent = this.event.filter(event => {
      const matchesService = !this.selectedService || event.typeEvent === this.selectedService;
      const matchesKeyword = !this.keyword || event.title.toLowerCase().includes(this.keyword.toLowerCase());
      return matchesService && matchesKeyword;
    });
    console.log(this.filteredEvent)

  }


}







