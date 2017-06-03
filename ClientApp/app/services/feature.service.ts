import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class FeatureService {

  constructor(private http: Http) { }

  getFeatures()
  {
    // For some reason, absolute links must be used. Something to do with the location.origin provider in app.module.client.ts
    return this.http.get('http://localhost:5000/api/features')
      .map(res => res.json());
  }

}
