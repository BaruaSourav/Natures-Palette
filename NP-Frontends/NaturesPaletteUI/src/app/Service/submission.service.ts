import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Submission } from './../Models/Submission';
import { NaturesPaletteConfig } from './../NaturesPaletteConfig';

@Injectable({
  providedIn: 'root'
})
export class SubmissionService {
  config: NaturesPaletteConfig;
  uri: string;
  constructor(private http: HttpClient) {
    this.config = new NaturesPaletteConfig();
    this.uri = this.config.apiurl;
  }

  addSubmission(submission: Submission) {
    // const obj = {
    // };
    console.log(submission);

    this.http.post(`${this.uri}/submissions/add`, submission)
        .subscribe((res) => {
          console.log(res);
        }
        );
  }
}
