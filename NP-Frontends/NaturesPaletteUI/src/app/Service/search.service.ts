import { Search } from './../Models/Search';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NaturesPaletteConfig } from './../NaturesPaletteConfig';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
    config: NaturesPaletteConfig;
    uri: string;
    constructor(private http: HttpClient) {
      this.config = new NaturesPaletteConfig();
      this.uri = this.config.apiurl;
  }

  search(search: Search) {
    console.log(search);
    return this.http.post(`${this.uri}/search`, search);
  }
}
