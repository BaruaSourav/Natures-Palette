import { Submission } from './../../Models/Submission';
import { Component, OnInit } from '@angular/core';
import { Modification } from './../../Models/Modification';
import { ModificationService } from './../../Service/modification.service';
import { FormBuilder, FormControl } from '@angular/forms'


@Component({
  selector: 'app-modification',
  templateUrl: './modification.component.html',
  styleUrls: ['./modification.component.css']
})
export class ModificationComponent implements OnInit {
  private modificationInfo: Modification;
  public submissions;
  public metaDataFilename: string;
  public rawFileName: string;
  public metaDataFile: File = null;
  public rawDataFile: File = null;

  metadataurl = new FormControl("");
  rawfileurl = new FormControl("");

  constructor(private service: ModificationService) {
    this.modificationInfo = new Modification();
    this.rawFileName = "Choose Files";
    this.metaDataFilename = "Choose Files";
   }

  ngOnInit() {
  }

  ModificationInformation() {
    this.modificationInfo.MetadataFileUrl = this.metaDataFilename;
    this.modificationInfo.RawFileUrl = this.rawFileName;
    this.modificationInfo.RawFileName = this.rawDataFile.name;
    this.modificationInfo.MetaDataFileName = this.metaDataFile.name;
    // Constructing the searchinfo instance
    

    // passing submissioninfo to service
    /* this.service.modification(this.modificationInfo)
      .subscribe((submission)=>{
          console.log(submission);
          this.submissions = submission;
      }
      )
    console.log(this.submissions); */
     const submissions = [
        {
        'rawDataFile':'test',
        'metaDataFile':'test1',
        
      },{
       'rawDataFile':'test',
       'metaDataFile':'test1',
       
      }];
     this.submissions = submissions;
     console.log(this.submissions);
  }
  

}
