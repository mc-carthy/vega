import { VehicleService } from './../../services/vehicle.service';
import { Vehicle, KeyValuePair } from './../../models/vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  // allVehicles: Vehicle[];
  makes: KeyValuePair[];
  query: any = {}; 

  constructor(private vehicleService: VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
      .subscribe(makes => this.makes = makes);
    // client-side method
    // this.vehicleService.getVehicles()
    //   .subscribe(vehicles => this.vehicles = allVehicles = vehicles);
    this.populateVehicles();
  }

  private populateVehicles()
  {
    this.vehicleService.getVehicles(this.query)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  // client-side method
  // onFilterChange()
  // {
  //   var vehicles = this.allVehicles;

  //   if (this.filter.makeId)
  //   {
  //     vehicles = vehicles.filter(v => v.make.id == this.filter.makeId);
  //   }

  //   if (this.filter.modelId)
  //   {
  //     vehicles = vehicles.filter(v => v.model.id == this.filter.modelId);
  //   }

  //   this.vehicles = vehicles;
  // }

  onFilterChange()
  {
    this.populateVehicles();
  }

  resetFilter()
  {
    this.query = {};
    this.onFilterChange();
  }

  sortBy(columnName)
  {
    if (this.query.sortBy == columnName)
    {
      this.query.isSortAscending = !this.query.isSortAscending;
    }
    else
    {
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

}
