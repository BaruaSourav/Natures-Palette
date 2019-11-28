import { Modification } from './../Models/Modification';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NaturesPaletteConfig } from './../NaturesPaletteConfig';


@Injectable({
  providedIn: 'root'
})
export class ModificationService {
    config: NaturesPaletteConfig;
    uri: string;
    constructor(private http: HttpClient) {
      this.config = new NaturesPaletteConfig();
      this.uri = this.config.apiurl;
  }

  modification(modification: Modification) {
    console.log(modification);
    return this.http.post(`${this.uri}/modification`, modification);
  }
}