
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Project } from '../_models/project.model';
import { OfferResgistration } from '../_models/offer-resgistration.model';
import { VariablesGlobales } from '../_helpers/variablesGlobales';

const CANDIDATE_URL = 'http://localhost:8090/api/candidate/';

@Injectable({
  providedIn: 'root'
})
export class CandidateService {

  constructor(private http: HttpClient, private global: VariablesGlobales) { }

  getCandidateAccount(id?: number): Observable<any> {
    console.log(id);
    return this.http.get(CANDIDATE_URL + id);
  }
  updateRegistration(id:any,status:string):Observable<any>{
    const url = `http://localhost:8090/api/candidate/${id}/status?status=${status}`;
    return this.http.put(url, null, { responseType: 'text' })
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }
  deleteResgistration(id:any):Observable<any> {
    return this.http.delete('http://localhost:8090/api/candidate/'+id, { responseType: 'text' });
  }
  getCandidateById(id:any){
    return this.http.get('http://localhost:8090/api/candidate/'+id);
  }
  getAllOffersById(id:any){
    return this.http.get('http://localhost:8090/api/candidate/offers/all/'+id);
  }
  completeProfileCandidate(candidate?: any): Observable<any> {
    return this.http.put(CANDIDATE_URL, candidate);
  }

  getAllOffers(): Observable<any> {
    return this.http.get('http://localhost:8090/api/candidate/offers', { responseType: 'json' });
  }


  getOfferById(id: number): Observable<any> {
    return this.http.get(CANDIDATE_URL + 'offers/'+ id,{ responseType: 'json' });
  }

  getAllCandidates(): Observable<any> {
    return this.http.get('http://localhost:8090/api/candidate/all-candidates');
  }

  publishProject(project: Project): Observable<any> {
    console.log(project);
    const formData = new FormData();
    formData.append('title', project.title ?? '');
    formData.append('content', project.content ?? '');
    formData.append('candidateId', project.candidateId?.toString() ?? '');
    formData.append('image', this.global.photo);

    return this.http.post<any>(CANDIDATE_URL + 'project/add/', formData);
  }

  registerOffer(offerRegistration: OfferResgistration): Observable<any> {
    const formData = new FormData();
    formData.append('candidateId', offerRegistration.candidateId?.toString() ?? '');
    formData.append('cv', this.global.cv);
    formData.append('coverLetter', this.global.coverLetter);
    formData.append('portfolioLink', offerRegistration.portfolioLink ?? '');
    formData.append('offerId', offerRegistration.offerId?.toString() ?? '');
    return this.http.post(CANDIDATE_URL + 'offer-apply', formData);
  }
}
