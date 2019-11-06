import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Submission } from './../Models/Submission';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {

  uri = 'http://localhost:4000/business';
  constructor(private http: HttpClient) { }

  addSubmission(submission: Submission) {
    // const obj = {
    // };
    console.log(submission);

    this.http.post(`${this.uri}/addSubmission`, submission)
        .subscribe(res => console.log('Done'));
  }
}
