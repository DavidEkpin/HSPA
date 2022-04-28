import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/Model/ipropertybase';
import { Property } from 'src/app/Model/property';
import { HousingService } from 'src/app/services/housing.service';


@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css'],
})
export class PropertyListComponent implements OnInit {
  SellRent = 'Sell';
  Properties: Array<Property> = [];
  filterParameter = '';
  City = '';
  SortByParam = '';
  SortDirection = 'asc';

  constructor(
    private route: ActivatedRoute,
    private housingService: HousingService
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.SellRent = 'Rent';
    }
    this.housingService.getAllProperties(this.SellRent).subscribe({
      next: (data) => {
        this.Properties = data;

        const newProperties: Array<Property> = JSON.parse(
          localStorage.getItem('Properties')
        );
        if (newProperties) {
          newProperties.forEach((data) => {
            if (data.SellRent === this.SellRent) {
              this.Properties = [data, ...this.Properties];
            }
          });
        }
        /* if (newProperty.SellRent === this.SellRent) {
          this.Properties = [newProperty, ...this.Properties];
        } */
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  onFilter() {
    this.City = this.filterParameter;
  }

  clearFilter() {
    this.City = '';
    this.filterParameter = '';
  }

  onSortDirection() {
    if (this.SortDirection === 'desc') {
      this.SortDirection = 'asc';
    } else {
      this.SortDirection = 'desc';
    }
  }
}
