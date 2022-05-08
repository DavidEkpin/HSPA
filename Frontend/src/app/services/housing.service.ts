import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { IPropertyBase } from '../Model/ipropertybase';
import { Property } from '../Model/property';


@Injectable({
  providedIn: 'root',
})
export class HousingService {
  constructor(private http: HttpClient) {}

  getCities(): Observable<string[]> {
    return this.http.get<string[]>('http://localhost:5254/api/city');
  }

  getProperty(id: number) {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<Property> = []

        for (const prop in data){
            propertiesArray.push(data[prop]);
        }
        return propertiesArray.find(p => p.Id === id)
      })
    );

  }

  getAllProperties(SellRent?: string): Observable<Property[]> {
    return this.http.get('data/properties.json' ).pipe(
      map((data) => {
        const propertiesArray: Array<Property> = [];

        for (const id in data) {
          if(SellRent) {
            if (data[id].SellRent === SellRent) {
              propertiesArray.push(data[id]);
            }
          } else {
             propertiesArray.push(data[id]);
          }

        }

        return propertiesArray;
      })
    );
  }

  getAllProp(): Observable<number> {
    return this.http.get('data/properties.json').pipe(
      map((data) => {
        const propertiesArray: Array<IPropertyBase> = [];
        for (const id in data) {
          propertiesArray.push(data[id]);
        }
        return propertiesArray.length;
      })
    );
  }

  addProperty(property: Property) {
    let properties: Property[] = [];

    if (localStorage.getItem('Properties')) {
      properties = JSON.parse(localStorage.getItem('Properties'));
      properties = [property, ...properties];
    } else {
      properties = [property];
    }

    localStorage.setItem('Properties', JSON.stringify(properties));
  }
}
