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
  public isPublished: boolean;
  public isEmbargo: boolean;
  public metadatafilename: string;
  public rawFileName: string;

  public metadataFile: File = null;
  public rawDataFile: File = null;

  firstname = new FormControl('');
  lastname = new FormControl('');
  typeofdata = new FormControl('');
  email = new FormControl('');
  instituationaffiliation = new FormControl('');
  sourceofdata = new FormControl('');
  databeenpublished = new FormControl('');
  embargo = new FormControl('');
  embargodate = new FormControl('');
  doi = new FormControl('');
  referencenumber = new FormControl('');
  metadataurl = new FormControl('');
  rawfileurl = new FormControl('');





  constructor(private service: SubmissionService) {
    this.hasAgreed = false;
    this.submissionInfo = new Submission();
    this.isPublished = false;
    this.isEmbargo = false;

    // initial values
    this.rawFileName = 'Choose Files';
    this.metadatafilename = 'Choose Files';
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
  isPublishChanged(e) {
    // console.log(e.target.value =='yes');
    if (e.target.value === 'yes') {
      this.isPublished = true;
    } else if (e.target.value === 'no') {
      this.isPublished = false;
    }
  }

  isEmbargoChanged(e) {
    if (e.target.value === 'yes') {
      this.isEmbargo = true;
    } else if (e.target.value === 'no') {
      this.isEmbargo = false;
    }
  }

  saveSubmissionInformation() {
    // Constructing the submissioninfo instance
    this.submissionInfo.TypeOfData = this.typeofdata.value;
    this.submissionInfo.DataSource = this.sourceofdata.value;
    this.submissionInfo.Name = this.firstname.value + this.lastname.value;
    this.submissionInfo.Email = this.email.value;
    this.submissionInfo.InstAffiliation = this.instituationaffiliation.value;
    this.submissionInfo.Doi = this.doi.value;
    this.submissionInfo.ReferenceNumber = this.referencenumber.value;
    this.submissionInfo.MetadataFileUrl = this.metadatafilename;
    this.submissionInfo.RawFileUrl = this.rawFileName;
    this.submissionInfo.IsEmbargo = this.isEmbargo;
    this.submissionInfo.IsPublished = this.isPublished;
    console.log(this.submissionInfo);

    // passing submissioninfo to service
    this.service.addSubmission(this.submissionInfo);
  }

  metadataFileChanged(e) {
    this.metadataFile = e.target.files[0];
    // console.log(file);
    this.metadatafilename = this.metadataFile.name;
  }
  rawFileChanged(e) {
    this.rawDataFile = e.target.files[0];
    // console.log(file);
    this.rawFileName = this.rawDataFile.name;
  }
  validate() {
      this.service.validateFiles(this.metadataFile, this.rawDataFile);
  }

}
