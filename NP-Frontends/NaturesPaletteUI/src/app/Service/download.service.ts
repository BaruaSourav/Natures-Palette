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

  }
  download(searchResult:any[]) {
    console.log(searchResult);
    return this.http.post(`${this.uri}/download`, searchResult);
  }
}
