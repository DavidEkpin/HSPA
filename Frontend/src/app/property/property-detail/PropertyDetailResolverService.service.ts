import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, Observable } from 'rxjs';
import { Property } from 'src/app/Model/property';
import { HousingService } from 'src/app/services/housing.service';

@Injectable({
  providedIn: 'root'
})
export class  PropertyDetailResolverServiceService implements Resolve<Property>{

property = new Property();

constructor(private housingService: HousingService) { }

resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Property | Observable<Property> | Promise<Property> {

  const propId = route.params['id']

  return this.housingService.getProperty(propId)

}



}
