import { Vehicle, SaveVehicle } from './../models/vehicle';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
  private readonly absoluteUrl = 'http://localhost:5000';
  private readonly vehiclesEndpoint = '/api/vehicles/';

  constructor(private http: Http) { }

  getMakes()
  {
    // For some reason, absolute links must be used. Something to do with the location.origin provider in app.module.client.ts
    return this.http.get(this.absoluteUrl + '/api/makes')
      .map(res => res.json());
  }

  getFeatures()
  {
    return this.http.get(this.absoluteUrl + '/api/features')
      .map(res => res.json());
  }

  create(vehicle)
  {
    return this.http.post(this.absoluteUrl + this.vehiclesEndpoint, vehicle)
      .map(res => res.json());
  }

  getVehicle(id)
  {
    return this.http.get(this.absoluteUrl + this.vehiclesEndpoint + id)
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
    return this.http.get(this.absoluteUrl + this.vehiclesEndpoint + '?' + this.toQueryString(filter))
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
    return this.http.put(this.absoluteUrl + this.vehiclesEndpoint + vehicle.id, vehicle)
      .map(res => res.json());
  }

  delete(vehicle)
  {
    return this.http.delete(this.absoluteUrl + this.vehiclesEndpoint + vehicle.id)
      .map(res => res.json());
  }

}
