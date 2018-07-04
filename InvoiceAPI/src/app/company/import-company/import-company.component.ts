import { Component, OnInit } from '@angular/core';
import { ToastOptions, ToastyService } from 'ng2-toasty';
import LocatedAt from '../../shared/models/located_at.model';
import Address from '../../shared/models/address.model';
import Company from '../../shared/models/company.model';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '../../shared/services/address.service';
import { LocatedAtService } from '../../shared/services/located-at.service';
import { CompanyService } from '../../shared/services/company.service';

@Component({
  selector: 'app-import-company',
  templateUrl: './import-company.component.html',
  styleUrls: ['./import-company.component.scss']
})
export class ImportCompanyComponent implements OnInit {
  companies: Company[] = [];
  addresses: Address[] = [];
  locatedAts: LocatedAt[] = [];
  toastOptions: ToastOptions;

  constructor(private titleService: Title, private companyService: CompanyService,
    private addressService: AddressService, private locatedAtService: LocatedAtService,
    private toastyService: ToastyService, private route: ActivatedRoute, private router: Router) {

    this.titleService.setTitle('Import Companies - inVoice');
    this.toastOptions = {
      title: 'Success',
      msg: 'Companies have been successfully added!',
      theme: ' bootstrap',
      showClose: true,
      timeout: 4000
    };
  }

  ngOnInit() { }

  upload(event: any) {
    this.extractData(event.target);
  }

  private mapToCompany(data: any[]) {
    const company = new Company();
    company.business_number = Number.parseInt(data[0]);
    company.company_name = data[1];
    company.email = data[2];
    company.phone = data[3];
    company.bank_account = data[4];

    const address = new Address();
    address.street = data[5];
    address.number = Number.parseInt(data[6]);
    address.suffix = data[7];
    address.postal_code = data[8];
    address.city = data[9];
    address.country = data[10];

    const locatedAt = new LocatedAt();
    locatedAt.company_number = company.business_number;
    locatedAt.address_postal = address.postal_code;
    locatedAt.address_number = address.number;

    this.companies.push(company);
    this.addresses.push(address);
    this.locatedAts.push(locatedAt);
  }

  private extractData(fileInput: any) {
    const fileReaded = fileInput.files[0];
    const lines = [];

    const reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);

    reader.onload = (e) => {
      const csv: string = reader.result;
      const allTextLines = csv.split(/\r|\n|\r/);
      const headers = allTextLines[0].split(',');

      for (let i = 1; i < allTextLines.length; i++) {
        // split content based on comma
        const data = allTextLines[i].split(',');
        if (data.length === headers.length) {
          const tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }

          this.mapToCompany(tarr);
        }
      }

      this.saveCompanies();
    };
  }

  private saveCompanies() {
    let count = 0;
    for (let i = 0; i < this.companies.length; i++) {
      const company = this.companies[i];

      this.companyService.createCompany(company).subscribe(
        (res) => {
          count++;
          if (count === this.companies.length) {
            this.toastyService.success(this.toastOptions);
          }
        },
        (err) => { throw (err); }
      );
    }

    this.createAddresses();
  }

  private createAddresses() {
    for (let i = 0; i < this.addresses.length; i++) {
      const address = this.addresses[i];
      this.addressService.createAddress(address).subscribe(
        res => this.linkAddress(),
        (err) => console.log(err)
      );
    }

    setTimeout(() => {
      this.router.navigate(['/companies']);
    }, 3000);
  }

  private linkAddress() {
    for (let i = 0; i < this.locatedAts.length; i++) {
      const locatedAt = this.locatedAts[i];
      this.locatedAtService.createLocatedAt(locatedAt).subscribe(
        res => { },
        (err) => console.log(err)
      );
    }
  }

}

