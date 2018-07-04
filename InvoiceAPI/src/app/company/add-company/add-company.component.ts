import { Component, OnInit } from '@angular/core';
import Company from '../../shared/models/company.model';
import { ActivatedRoute, Router } from '@angular/router';
import { CompanyService } from '../../shared/services/company.service';
import Address from '../../shared/models/address.model';
import { LocatedAtService } from '../../shared/services/located-at.service';
import LocatedAt from '../../shared/models/located_at.model';
import { Title } from '@angular/platform-browser';
import { AddressService } from '../../shared/services/address.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.scss']
})
export class AddCompanyComponent implements OnInit {
  company: Company = new Company;
  address: Address = new Address;

  constructor(private titleService: Title, private route: ActivatedRoute,
    private companyService: CompanyService, private locatedAtService: LocatedAtService, private addressService: AddressService,
    private router: Router) { }

    ngOnInit() {
      this.titleService.setTitle('Create Company - inVoice');
    }
  
    submitForm() {
      this.companyService.createCompany(this.company).subscribe(
        res => {
          this.createAddress();
        },
        (err) => console.log(err)
      );
    }
  
    private createAddress() {
      this.addressService.createAddress(this.address).subscribe(
        res => this.linkAddress(),
        (err) => console.log(err)
      );
    }
  
    private linkAddress() {
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