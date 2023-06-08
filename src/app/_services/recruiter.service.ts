import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Offer } from '../_models/offer.model';

const RECRUITER_URL = 'http://localhost:8090/api/recruiter/';


@Injectable({
  providedIn: 'root'
})
export class RecruiterService {

  constructor(private http: HttpClient) { }

  getRecruiterAccount(id?: number): Observable<any> {
    return this.http.get(RECRUITER_URL + id);
  }

  publishOffer(offer: Offer): Observable<any> {
    return this.http.post<any>(RECRUITER_URL + 'offer/publish', offer);
  }

  deleteOffer(id: number): Observable<any> {
    return this.http.delete(`${RECRUITER_URL + 'offer'}/${id}`);
  }

  sendTestToCandidate(registration_id: number, test_id: number, recruiter_id: number) {
    return this.http.put(RECRUITER_URL + 'test/access?registration_id=' + registration_id + '&test_id=' + test_id + '&recruiter_id=' + recruiter_id, {});
  }
sendRejectionToCandidate(email:string){
  return this.http.post('http://localhost:8090/api/recruiter/send-rejection-message/'+email,{});
}
updateOffer(id:any,offer:any){
  return this.http.put(`http://localhost:8090/api/recruiter/project/`+id,offer);
}
updateEvent(id:any,event:any){
  return this.http.put(`http://localhost:8090/api/recruiter/event/`+id,event);
}
  completeProfileRecruiter(recruiter?: any): Observable<any> {
    console.log(recruiter);
    return this.http.put(RECRUITER_URL, recruiter);
  }

  eliminateOfferRegistration(id: number) {
    return this.http.delete(RECRUITER_URL + 'registration/' + id);
  }

  getOffers(id?: number): Observable<any> {
    return this.http.get(RECRUITER_URL + 'offer?recruiter_id=' + id);
  }

  updateTest(test?: any): Observable<any> {
    return this.http.put(RECRUITER_URL + 'test/add', test);
  }

  getOfferList() {
    return this.http.get<any[]>('http://localhost:8090/api/recruiter/offers-admin');
  }

  getEventList() {
    return this.http.get<any[]>('http://localhost:8090/api/recruiter/event-admin');
  }

  getAllEvents(): Observable<any> {
    return this.http.get('http://localhost:8090/api/recruiter/events', { responseType: 'json' });
  }

  getOfferHome() {
    return this.http.get<any[]>('http://localhost:8090/api/recruiter/offers-admin');
  }

  getAllRecruters(): Observable<any> {
    return this.http.get('http://localhost:8090/api/recruiter/all-recruters');
  }

  acceptOffer(id?: number): Observable<any> {
    return this.http.get(RECRUITER_URL + 'accept-offer/' + id);
  }

  rejectOffer(id?: number): Observable<any> {
    return this.http.get(RECRUITER_URL + 'reject-offer/' + id);
  }

  acceptEvent(id?: number): Observable<any> {
    return this.http.get(RECRUITER_URL + 'accept-event/' + id);
  }

  rejectEvent(id?: number): Observable<any> {
    return this.http.get(RECRUITER_URL + 'reject-event/' + id);
  }

  publishEvent(offer: Offer): Observable<any> {
    return this.http.post<any>(RECRUITER_URL + 'event/publish', offer);
  }

  deleteEvent(id: number): Observable<any> {
    return this.http.delete(`${RECRUITER_URL + 'event'}/${id}`);
  }


  getResultByRec(rec?: number): Observable<any> {
    return this.http.get('http://localhost:8090/api/findHistoryByRec/' + rec);
  }
  updateHistory(id:any,status:any){
    return this.http.put(`http://localhost:8090/api/recruiter/history/${id}/status?status=${status}`,{})
  }
  acceptTest(id?: number): Observable<any> {
    return this.http.get('http://localhost:8090/api/accept-test/' + id);
  }

  rejectTest(id?: number): Observable<any> {
    return this.http.get('http://localhost:8090/api/reject-test/' + id);
  }

  sendLink(email: string, link: string): Observable<any> {
    return this.http.post(`${'http://localhost:8090/api/recruiter/send-test-link'}/${email}`, link);
  }

}
