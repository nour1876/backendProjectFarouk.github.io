import { Component, OnInit } from '@angular/core';
import { AdminService } from '../_services/admin.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit{
  contacts:any;
  constructor(private adminservice:AdminService){}
  ngOnInit(): void {
    this.getAllContacts();
  }

  getAllContacts(){
    this.adminservice.getcontacts().subscribe(d=>{
      this.contacts=d;
    })
    
  }

}
