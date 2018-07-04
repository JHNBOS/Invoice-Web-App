import { Component, OnInit } from '@angular/core';
import Debtor from '../../shared/models/debtor.model';
import { DebtorService } from '../../shared/services/debtor.service';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { AddressService } from '../../shared/services/address.service';
import { LivesAtService } from '../../shared/services/lives-at.service';
import LivesAt from '../../shared/models/lives_at.model';
import Address from '../../shared/models/address.model';

@Component({
  selector: 'app-import-debtor',
  templateUrl: './import-debtor.component.html',
  styleUrls: ['./import-debtor.component.scss']
})
export class ImportDebtorComponent implements OnInit {
  debtors: Debtor[] = [];
  addresses: Address[] = [];
  livesAts: LivesAt[] = [];
  toastOptions: ToastOptions;

  constructor(private titleService: Title, private debtorService: DebtorService,
    private addressService: AddressService, private livesAtService: LivesAtService,
    private toastyService: ToastyService, private route: ActivatedRoute, private router: Router) {

    this.titleService.setTitle('Import Debtors - inVoice');
    this.toastOptions = {
      title: 'Success',
      msg: 'Debtor(s) have been successfully added!',
      theme: ' bootstrap',
      showClose: true,
      timeout: 4000
    };
  }

  ngOnInit() { }

  upload(event: any) {
    this.extractData(event.target);
  }

  private mapToDebtor(data: any[]) {
    const debtor = new Debtor();
    debtor.ssn = Number.parseInt(data[0]);
    debtor.first_name = data[1];
    debtor.last_name = data[2];
    debtor.email = data[3];
    debtor.phone = data[4];
    debtor.bank_account = data[5];

    const address = new Address();
    address.street = data[6];
    address.number = Number.parseInt(data[7]);
    address.suffix = data[8];
    address.postal_code = data[9];
    address.city = data[10];
    address.country = data[11];

    const livesAt = new LivesAt();
    livesAt.debtor_ssn = debtor.ssn;
    livesAt.address_postal = address.postal_code;
    livesAt.address_number = address.number;

    this.debtors.push(debtor);
    this.addresses.push(address);
    this.livesAts.push(livesAt);
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

          this.mapToDebtor(tarr);
        }
      }

      this.saveDebtors();
    };
  }

  private saveDebtors() {
    let count = 0;
    for (let i = 0; i < this.debtors.length; i++) {
      const debtor = this.debtors[i];

      this.debtorService.createDebtor(debtor).subscribe(
        (res) => {
          count++;
          if (count === this.debtors.length) {
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
      this.router.navigate(['/debtors']);
    }, 3000);
  }

  private linkAddress() {
    for (let i = 0; i < this.livesAts.length; i++) {
      const livesAt = this.livesAts[i];
      this.livesAtService.createLivesAt(livesAt).subscribe(
        res => { },
        (err) => console.log(err)
      );
    }
  }

}
