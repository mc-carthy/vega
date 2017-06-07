import { Vehicle, SaveVehicle } from './../models/vehicle';
import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
  private readonly vehiclesEndpoint = '/api/vehicles/';

  constructor(private http: Http, @Inject('ORIGIN_URL') private originUrl: string) { }

  getMakes()
  {
    // For some reason, absolute links must be used. Something to do with the location.origin provider in app.module.client.ts
    return this.http.get(this.originUrl + '/api/makes')
      .map(res => res.json());
  }

  getFeatures()
  {
    return this.http.get(this.originUrl + '/api/features')
      .map(res => res.json());
  }

  create(vehicle)
  {
    return this.http.post(this.originUrl + this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  getVehicle(id)
  {
    return this.http.get(this.originUrl + this.vehiclesEndpoint + id)
      .map(res => res.json());
  }

  // client-side method
  // getVehicles()
  // {
  //   return this.http.get(this.absoluteUrl + this.vehiclesEndpoint)
  //     .map(res => res.json());
  // }

  getVehicles(filter)
  {
    return this.http.get(this.originUrl + this.vehiclesEndpoint + '?' + this.toQueryString(filter))
      .map(res => res.json());
  }

  toQueryString(obj)
  {
    var parts = [];
    for (var property in obj)
    {
      var value = obj[property];
      if (value != null && value != undefined)
      {
        parts.push(encodeURIComponent(property) + '=' + encodeURIComponent(value));
      }
    }

    return parts.join('&');
  }

  update(vehicle: SaveVehicle)
  {
    return this.http.put(this.originUrl + this.vehiclesEndpoint + vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(vehicle)
  {
    return this.http.delete(this.originUrl + this.vehiclesEndpoint + vehicle.id)
      .map(res => res.json());
  }

}
