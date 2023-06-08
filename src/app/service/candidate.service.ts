import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http:HttpClient) { }
  getCandidateById(id:any){
    return this.http.get('http://localhost:8090/api/candidate/'+id);
  }
  getAllProjects(){
    return this.http.get('http://localhost:8090/api/candidate/projects');
  }
  getCandidateByProjectId(id:any){
    return this.http.get('http://localhost:8090/api/candidate/owner/project/'+id);
  }
}
