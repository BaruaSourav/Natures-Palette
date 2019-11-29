import { Search } from "./../../Models/Search";
import { SearchService } from "./../../Service/search.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl } from "@angular/forms";
import { DownloadService } from "../../Service/download.service";


@Component({
  selector: "app-search",
  templateUrl: "./search.component.html",
  styleUrls: ["./search.component.css"],
  providers: [SearchService, DownloadService]
})
export class SearchComponent implements OnInit {
  private searchInfo: Search;
  public searchResult;
  public isDownloadPackageReady: boolean;

  searchtext = new FormControl("");
  institutioncode = new FormControl("");
  collectioncode = new FormControl("");
  cataloguenumber = new FormControl("");
  class = new FormControl("");
  order = new FormControl("");
  family = new FormControl("");
  genus = new FormControl("");
  specificepithet = new FormControl("");
  infraspecificepithet = new FormControl("");
  sex = new FormControl("");
  lifestage = new FormControl("");
  country = new FormControl("");
  patch = new FormControl("");

  constructor(
    private service: SearchService,
    private downloadService: DownloadService
  ) {
    this.searchInfo = new Search();
    this.searchResult = null;
    this.isDownloadPackageReady = false;
  }

  ngOnInit() {}

  SearchInformation() {
    // Constructing the searchinfo instance
    this.searchInfo.searchText = this.searchtext.value;
    this.searchInfo.institutionCode = this.institutioncode.value;
    this.searchInfo.collectionCode = this.collectioncode.value;
    this.searchInfo.catalogueNumber = this.cataloguenumber.value;
    this.searchInfo.class = this.class.value;
    this.searchInfo.order = this.order.value;
    this.searchInfo.family = this.family.value;
    this.searchInfo.genus = this.genus.value;
    this.searchInfo.specificEpithet = this.specificepithet.value;
    this.searchInfo.infraspecificEpithet = this.infraspecificepithet.value;
    this.searchInfo.sex = this.sex.value;
    this.searchInfo.lifeStage = this.lifestage.value;
    this.searchInfo.country = this.country.value;
    this.searchInfo.Patch = this.patch.value;
    console.log(this.searchInfo);

    // passing submissioninfo to service
    this.service.search(this.searchInfo).subscribe(result => {
      console.log(result);
      this.searchResult = result;
    });
    //console.log(this.searchResult);

    //console.log(this.searchResult);
  }

  download() {
    this.downloadService.download(this.searchResult).subscribe((res : StatusResponse) =>{
      console.log(res);
      if(res.status == 'success')
        this.isDownloadPackageReady = true;
    });
  }
}
interface StatusResponse{
  status:string;
}
