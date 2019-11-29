import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { NaturesPaletteConfig } from "./../NaturesPaletteConfig";

@Injectable({
  providedIn: "root"
})
export class DownloadService {
  config: NaturesPaletteConfig;
  uri: string;
  constructor(private http: HttpClient) {
    this.config = new NaturesPaletteConfig();
    this.uri = this.config.apiurl;
  }
  download(searchResult: any[]) {
    console.log(searchResult);
    //console.log("test");
    return this.http.post(`${this.uri}/download`, searchResult);
  }
}
