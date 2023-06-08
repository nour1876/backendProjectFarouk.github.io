import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecruiterService } from '../_services/recruiter.service';

@Component({
  selector: 'app-postr',
  templateUrl: './postr.component.html',
  styleUrls: ['./postr.component.css']
})
export class PostrComponent implements OnInit {

  event: any[];
  keyword: string;
  filteredEvent: any[] = [];

  constructor(private router: Router, private recruiterService: RecruiterService) { }

  ngOnInit(): void {
    this.recruiterService.getEventList().subscribe(data => {
      this.event = data;
    })
    this.recruiterService.getEventList().subscribe(data => {
      this.filteredEvent = data;
    })

  }

  acceptEvent(id: number) {
    this.recruiterService.acceptEvent(id).subscribe(data => {
      this.ngOnInit()
    })
  }

  rejectEvent(id: number) {
    this.recruiterService.rejectEvent(id).subscribe(data => {
      this.ngOnInit()
    })
  }

  filterEvent() {
    this.filteredEvent = this.event.filter(events => {
      const matchesKeyword = !this.keyword ||
        events.title.toLowerCase().includes(this.keyword.toLowerCase()) ||
        events.typeEvent.toLowerCase().includes(this.keyword.toLowerCase()) ||
        events.description.toLowerCase().includes(this.keyword.toLowerCase());
      return matchesKeyword;
    });
  }

}
