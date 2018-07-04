import { Component, OnInit } from '@angular/core';
import Company from '../../shared/models/company.model';
import Address from '../../shared/models/address.model';
import LocatedAt from '../../shared/models/located_at.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../shared/services/company.service';
import { LocatedAtService } from '../../shared/services/located-at.service';
import { AddressService } from '../../shared/services/address.service';

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.scss']
})
export class EditCompanyComponent implements OnInit {
  companyNumber: number;
  company: Company;
  located_at: LocatedAt;
  address: Address;

  constructor(private titleService: Title, private route: ActivatedRoute,
    private companyService: CompanyService, private locatedAtService: LocatedAtService, private addressService: AddressService,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Edit Company - inVoice');
    this.route.params.subscribe(
      (params) => {
        this.companyNumber = +params['id'];
        this.getCompany(this.companyNumber);
      }
    );
  }

  getCompany(id: number) {
    this.companyService.getCompanyByNumber(id).subscribe(
      res => {
        this.company = res;
        this.getLocatedAt();
      },
      (err) => console.log(err)
    );
  }

  getAddress() {
    this.addressService.getAddress(this.located_at.address_postal, this.located_at.address_number).subscribe(
      res => this.address = res,
      (err) => console.log(err)
    );
  }

  getLocatedAt() {
    this.locatedAtService.getLocatedAtByCompany(this.companyNumber).subscribe(
      res => {
        this.located_at = res;
        this.getAddress();
      },
      (err) => console.log(err)
    );
  }

  submitForm() {
    this.companyService.updateCompany(this.company).subscribe(
      res => {
        this.createAddress();
      },
      (err) => console.log(err)
    );
  }

  createAddress() {
    this.addressService.createAddress(this.address).subscribe(
      res => this.linkAddress(),
      (err) => console.log(err)
    );
  }

  linkAddress() {
    const locatedAt = new LocatedAt();
    locatedAt.company_number = this.company.business_number;
    locatedAt.address_postal = this.address.postal_code;
    locatedAt.address_number = this.address.number;

    this.locatedAtService.createLocatedAt(locatedAt).subscribe(
      resp => this.router.navigate(['/companies']),
      (error) => console.log(error)
    );
  }

}
