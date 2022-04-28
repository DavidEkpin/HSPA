import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  NgForm,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/Model/ipropertybase';
import { Property } from 'src/app/Model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form')addPropertyForm?: NgForm;
  addPropertyForm?: FormGroup;
  nextTabSelected!: boolean;
  property = new Property();
  count = 0;


  @ViewChild('formTabs', { static: false })
  staticTabs!: TabsetComponent;

  propertyView: IPropertyBase = {
    Id: null,
    Name: '',
    Price: null,
    SellRent: '',
    FType: '',
    PType: '',
    BHK: null,
    BuiltArea: null,
    City: '',
    RTM: null,
  };

  propertyTypes: Array<string> = ['House', 'Appartment', 'Duplex'];
  funishTypes: Array<string> = ['Fully', 'Semi', 'Unfunished'];

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private housingService: HousingService,
    private alertify: AlertifyService) {}


  ngOnInit() {
    this.CreateAddPropertyForm();

    this.housingService.getAllProp().subscribe({
      next: (data) => {
         this.count = data;
      }
    });

  }

  //create reactive form
  CreateAddPropertyForm() {
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        SellRent: ['Sell', Validators.required],
        BHK: [null, Validators.required],
        PType: [null, Validators.required],
        FType: [null, Validators.required],
        Name: [null, Validators.required],
        City: [null, Validators.required],
      }),

      PriceInfo: this.fb.group({
        Price: [null, Validators.required],
        BuiltArea: [null, Validators.required],
        CarpetArea: [null],
        Security: [null],
        Maintenance: [null],
      }),

      AddressInfo: this.fb.group({
        FloorNo: [null],
        TotalFloor: [null],
        Address: [null, Validators.required],
        LandMark: [null],
      }),

      OtherDetails: this.fb.group({
        RTM: [null, Validators.required],
        Possession: [null],
        AOP: [null],
        Gated: [null],
        MainEntrance: [null],
        Description: [null],
      }),
    });
  }

  onBack() {
    this.router.navigate(['/']);
  }

  onSubmit() {
    this.nextTabSelected = true;
    if (this.validateTabs()) {
      this.mapProperty();
      this.housingService.addProperty(this.property)
      this.alertify.success('Property added successfully')
      console.log(this.addPropertyForm.value);

      if(this.sellRent.value === 'Rent') {
        this.router.navigate(['/rent-property'])
      } else{
        this.router.navigate(['/'])
      }
    } else {
      this.alertify.error('Please complete the form')
    }

  }

  onalert() {
    this.alertify.error('Please complete the form');
  }


  validateTabs(): boolean {
    if (this.basicInfo.invalid) {
      this.staticTabs.tabs[0].active = true;
      return false;
    }

    if (this.priceInfo.invalid) {
      this.staticTabs.tabs[1].active = true;
      return false;
    }

    if (this.addressInfo.invalid) {
      this.staticTabs.tabs[2].active = true;
      return false;
    }

    if (this.otherDetails.invalid) {
      this.staticTabs.tabs[3].active = true;
      return false;
    }

    return true;
  }

  mapProperty(): void {
    this.property.Id = this.count + 1
    this.property.SellRent = this.sellRent.value;
    this.property.BHK = this.bhk.value;
    this.property.PType = this.pType.value;
    this.property.Name = this.name.value;
    this.property.City = this.city.value;
    this.property.FType = this.fType.value;
    this.property.Price = this.price.value;
    this.property.Security = this.security.value;
    this.property.Maintenance = this.maintenance.value;
    this.property.BuiltArea = this.builtArea.value;
    this.property.CarpetArea = this.carpetArea.value;
    this.property.FloorNo = this.floorNo.value;
    this.property.TotalFloor = this.totalFloor.value;
    this.property.Address = this.address.value;
    this.property.Address2 = this.landMark.value;
    this.property.RTM = this.rtm.value;
    this.property.AOP = this.age.value;
    this.property.Gated = this.gated.value;
    this.property.MainEntrance = this.mainEntrance.value;
    this.property.Possession = this.possession.value;
    this.property.Description = this.description.value;
    this.property.PostedOn = new Date().toString();
  }

  //implement ngx-bootstrap tabs
  selectTab(nextTabId: number, isCurrentTabValid?: boolean) {
    this.nextTabSelected = true;
    if (isCurrentTabValid) {
      this.staticTabs.tabs[nextTabId].active = true;
    }
  }

  //getter methods for form groups and controls

  //#region  form groups
  get basicInfo() {
    return this.addPropertyForm.get('BasicInfo') as FormGroup;
  }

  get priceInfo() {
    return this.addPropertyForm.get('PriceInfo') as FormGroup;
  }

  get otherDetails() {
    return this.addPropertyForm.get('OtherDetails') as FormGroup;
  }

  get addressInfo() {
    return this.addPropertyForm.get('AddressInfo') as FormGroup;
  }

  //#endregion

  //#region  form controls

  get name() {
    return this.basicInfo.get('Name') as FormControl;
  }

  get sellRent() {
    return this.basicInfo.get('SellRent') as FormControl;
  }

  get pType() {
    return this.basicInfo.get('PType') as FormControl;
  }

  get fType() {
    return this.basicInfo.get('PType') as FormControl;
  }

  get price() {
    return this.priceInfo.get('Price') as FormControl;
  }

  get builtArea() {
    return this.priceInfo.get('BuiltArea') as FormControl;
  }

  get age() {
    return this.otherDetails.get('AOP') as FormControl;
  }

  get possession() {
    return this.otherDetails.get('Possession') as FormControl;
  }

  get rtm() {
    return this.otherDetails.get('RTM') as FormControl;
  }

  get city() {
    return this.basicInfo.get('City') as FormControl;
  }

  get carpetArea() {
    return this.priceInfo.get('CarpetArea') as FormControl;
  }

  get security() {
    return this.priceInfo.get('Security') as FormControl;
  }

  get maintenance() {
    return this.priceInfo.get('Maintenance') as FormControl;
  }

  get floorNo() {
    return this.addressInfo.get('FloorNo') as FormControl;
  }

  get totalFloor() {
    return this.addressInfo.get('TotalFloor') as FormControl;
  }

  get address() {
    return this.addressInfo.get('Address') as FormControl;
  }

  get landMark() {
    return this.addressInfo.get('LandMark') as FormControl;
  }

  get gated() {
    return this.otherDetails.get('Gated') as FormControl;
  }

  get mainEntrance() {
    return this.otherDetails.get('MainEntrance') as FormControl;
  }

  get description() {
    return this.otherDetails.get('Description') as FormControl;
  }

  get bhk() {
    return this.basicInfo.get('BHK') as FormControl;
  }

  //#endregion
}
