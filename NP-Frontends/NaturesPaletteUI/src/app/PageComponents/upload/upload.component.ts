import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {

  public hasAgreed: boolean;
  firstname: string;
  constructor() {
    this.hasAgreed = false;
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

}
