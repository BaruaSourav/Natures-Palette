import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public hasAgreed: boolean;
  public hasChangedForDataPublish: boolean;
  public hasChangedForEmbargo: boolean;
  firstname: string;
  constructor() {
    this.hasAgreed = false;
    this.hasChangedForDataPublish = false;
    this.hasChangedForEmbargo = false;
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

  hideDivWhenRadioButtonChanged() {
    if (this.hasChangedForDataPublish)
    {
      this.hasChangedForDataPublish = false;
    } else {
      this.hasChangedForDataPublish = true;
    }
  }

  hideDivWhenEmbargoSelected() {
    if (this.hasChangedForEmbargo)
    {
      this.hasChangedForEmbargo = false;
    } else {
      this.hasChangedForEmbargo = true;
    }
  }

}
