import { Search } from './../../Models/Search';
import { SearchService } from './../../Service/search.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [SearchService]
})
export class SearchComponent implements OnInit {
  private searchInfo: Search;
  public searchResult;


  searchtext = new FormControl('');
  institutioncode = new FormControl('');
  collectioncode = new FormControl('');
  cataloguenumber = new FormControl('');
  class = new FormControl('');
  order = new FormControl('');
  family = new FormControl('');
  genus = new FormControl('');
  specificepithet = new FormControl('');
  infraspecificepithet = new FormControl('');
  sex = new FormControl('');
  lifestage = new FormControl('');
  country = new FormControl('');
  patch = new FormControl('');

  constructor(private service: SearchService) {
    this.searchInfo = new Search();
   }

  ngOnInit() {

  }

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
    this.service.search(this.searchInfo)
      .subscribe((result)=>{
          console.log(result);
          this.searchResult = result;
      }
      )
    console.log(this.searchResult);
    //   const testSearchResult = [
    //    {
    //    'genus':'test',
    //    'specificEpithet':'test1',
    //    'infraspecificEpithet':'test2',
    //    'sex':'test3',
    //    'lifeStage':'test4',
    //    'patch':'test5'
    //  },{
    //   'genus':'test',
    //   'specificEpithet':'test1',
    //   'infraspecificEpithet':'test2',
    //   'sex':'test3',
    //   'lifeStage':'test4',
    //   'patch':'test5'

    //  }];
     //this.searchResult = testSearchResult;
     console.log(this.searchResult);
  }

}

