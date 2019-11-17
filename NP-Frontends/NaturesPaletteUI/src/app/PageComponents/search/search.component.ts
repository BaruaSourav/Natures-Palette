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
  public searchResult: any;


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
    this.searchInfo.SearchText = this.searchtext.value;
    this.searchInfo.InstitutionCode = this.institutioncode.value;
    this.searchInfo.CollectionCode = this.collectioncode.value;
    this.searchInfo.CatalogueNumber = this.cataloguenumber.value;
    this.searchInfo.Class = this.class.value;
    this.searchInfo.Order = this.order.value;
    this.searchInfo.Family = this.family.value;
    this.searchInfo.Genus = this.genus.value;
    this.searchInfo.SpecificEpithet = this.specificepithet.value;
    this.searchInfo.InfraspecificEpithet = this.infraspecificepithet.value;
    this.searchInfo.Sex = this.sex.value;
    this.searchInfo.LifeStage = this.lifestage.value;
    this.searchInfo.Country = this.country.value;
    this.searchInfo.Patch = this.patch.value;
    // console.log(this.searchInfo);

    // passing submissioninfo to service
    // searchresult = this.service.search(this.searchInfo);
      const testSearchResult = [
       {
       'genus':'test',
       'specificEpithet':'test1',
       'infraspecificEpithet':'test2',
       'sex':'test3',
       'lifeStage':'test4',
       'patch':'test5'
     },{
      'genus':'test',
      'specificEpithet':'test1',
      'infraspecificEpithet':'test2',
      'sex':'test3',
      'lifeStage':'test4',
      'patch':'test5'

     }];
     this.searchResult = testSearchResult;
     console.log(this.searchResult);
  }

}
