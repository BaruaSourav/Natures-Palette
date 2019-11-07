import { Component, OnInit } from '@angular/core';
import {SubmissionService} from './../../Service/submission.service';
import {Submission} from './../../Models/Submission';
import {FormBuilder, FormControl} from '@angular/forms'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [SubmissionService]
})
export class UploadComponent implements OnInit {

  private submissionInfo: Submission;
  public hasAgreed: boolean;

  firstname = new FormControl('');
  lastname = new FormControl('');
  typeofdata = new FormControl('');



  constructor(private service: SubmissionService) {
    this.hasAgreed = false;
    this.submissionInfo = new Submission();
  }

  ngOnInit() {
  }

  agreeCheckBoxChanged() {
    if (this.hasAgreed)
    {
      this.hasAgreed = false;
    } else {
      this.hasAgreed = true;
    }
  }

  saveSubmissionInformation() {
    //Constructing the submissioninfo instance
    this.submissionInfo.TypeOfData = this.typeofdata.value;
    console.log(this.submissionInfo);
    //TODO: Vivek

    //passing submissioninfo to service
    this.service.addSubmission(this.submissionInfo);
  }

}
