import { Component, OnInit } from '@angular/core';
import Company from '../../shared/models/company.model';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from '../../shared/services/company.service';
import { Title } from '@angular/platform-browser';
import Address from '../../shared/models/address.model';
import { LocatedAtService } from '../../shared/services/located-at.service';
import { AddressService } from '../../shared/services/address.service';
import LocatedAt from '../../shared/models/located_at.model';

@Component({
  selector: 'app-detail-company',
  templateUrl: './detail-company.component.html',
  styleUrls: ['./detail-company.component.scss']
})
export class DetailCompanyComponent implements OnInit {
  companyNumber: number;
  company: Company;
  located_at: LocatedAt;
  address: Address;

  constructor(private titleService: Title, private route: ActivatedRoute,
    private companyService: CompanyService, private locatedAtService: LocatedAtService, private addressService: AddressService,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Company Details - inVoice');
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
}
