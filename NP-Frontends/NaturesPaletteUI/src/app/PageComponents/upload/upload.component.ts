import { Component, OnInit } from '@angular/core';
import { SubmissionService } from './../../Service/submission.service';
import { Submission } from './../../Models/Submission';
import { FormBuilder, FormControl } from '@angular/forms'

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
  providers: [SubmissionService]
})
export class UploadComponent implements OnInit {

  private submissionInfo: Submission;
  public hasAgreed: boolean;
  public hasChangedForDataPublish: boolean;
  public hasChangedForEmbargo: boolean;

  firstname = new FormControl('');
  lastname = new FormControl('');
  typeofdata = new FormControl('');
  email = new FormControl('');
  instituationaffiliation = new FormControl('');
  sourceofdata = new FormControl ('');
  databeenpublished = new FormControl ('');
  embargo = new FormControl ('');
  embargodate = new FormControl('');
  doi = new FormControl('');
  referencenumber = new FormControl('');
  metadataurl = new FormControl('');
  rawfileurl = new FormControl('');



  constructor(private service: SubmissionService) {
    this.hasAgreed = false;
    this.submissionInfo = new Submission();
    this.hasChangedForDataPublish = false;
    this.hasChangedForEmbargo = false;
  }

  ngOnInit() {
  }

  agreeCheckBoxChanged() {
    if (this.hasAgreed) {
      this.hasAgreed = false;
    } else {
      this.hasAgreed = true;
    }
  }

  saveSubmissionInformation() {
    //Constructing the submissioninfo instance
    this.submissionInfo.TypeOfData = this.typeofdata.value;
    this.submissionInfo.DataSource = this.sourceofdata.value;
    this.submissionInfo.Name = this.firstname.value;
    this.submissionInfo.Name = this.lastname.value;
    this.submissionInfo.Email = this.email.value;
    this.submissionInfo.InstAffiliation = this.instituationaffiliation.value;
    this.submissionInfo.Doi = this.doi.value;
    this.submissionInfo.ReferenceNumber = this.referencenumber.value;
    this.submissionInfo.MetadataFileUrl = this.metadataurl.value;
    this.submissionInfo.RawFileUrl = this.rawfileurl.value;
    
    console.log(this.submissionInfo);
    //TODO: Vivek

    //passing submissioninfo to service
    this.service.addSubmission(this.submissionInfo);
  }
  hideDivWhenRadioButtonChanged() {
    if (this.hasChangedForDataPublish) {
      this.hasChangedForDataPublish = false;
    } else {
      this.hasChangedForDataPublish = true;
    }
  }

  hideDivWhenEmbargoSelected() {
    if (this.hasChangedForEmbargo) {
      this.hasChangedForEmbargo = false;
    } else {
      this.hasChangedForEmbargo = true;
    }
  }

}
