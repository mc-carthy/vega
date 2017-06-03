import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {

  constructor(private http: Http) { }

  getMakes()
  {
    // For some reason, absolute links must be used. Something to do with the location.origin provider in app.module.client.ts
    return this.http.get('http://localhost:5000/api/makes')
      .map(res => res.json());
  }

  getFeatures()
  {
    return this.http.get('http://localhost:5000/api/features')
      .map(res => res.json());
  }

}
