import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyService } from 'ngx-toasty';
import Address from '../../../shared/models/address.model';
import Debtor from '../../../shared/models/debtor.model';
import DebtorHasAddress from '../../../shared/models/debtor_has_address.model';
import { AddressService } from '../../../shared/services/address.service';
import { DebtorService } from '../../../shared/services/debtor.service';
import { DebtorHasAddressService } from '../../../shared/services/debtor_has_address.service';

@Component({
    selector: 'app-import-debtor',
    templateUrl: './import-debtor.component.html',
    styleUrls: ['./import-debtor.component.scss']
})
export class ImportDebtorComponent implements OnInit {
    debtors: Debtor[] = [];
    addresses: Address[] = [];
    livesAts: DebtorHasAddress[] = [];
    toastOptions: ToastOptions;

    constructor(private titleService: Title, private debtorService: DebtorService, private addressService: AddressService,
        private debtorHasAddressService: DebtorHasAddressService, private toastyService: ToastyService, private route: ActivatedRoute, private router: Router) {

        this.titleService.setTitle('Import Debtors - Invoice Panel');
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
        debtor.id = data[0];
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

        const livesAt = new DebtorHasAddress();
        livesAt.debtor_id = debtor.id;
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

            this.debtorService.create(debtor).subscribe(
                (res) => {
                    count++;
                    if (count === this.debtors.length) {
                        this.toastyService.success(this.toastOptions);
                    }
                },
                (error) => { throw error; }
            );
        }

        this.createAddresses();
    }

    private createAddresses() {
        for (let i = 0; i < this.addresses.length; i++) {
            const address = this.addresses[i];
            this.addressService.create(address).subscribe(
                res => this.linkAddress(),
                (error) => { throw error; }
            );
        }

        setTimeout(() => {
            this.router.navigate(['/debtors']);
        }, 3000);
    }

    private linkAddress() {
        for (let i = 0; i < this.livesAts.length; i++) {
            const livesAt = this.livesAts[i];
            this.debtorHasAddressService.create(livesAt).subscribe(
                res => { },
                (error) => { throw error; }
            );
        }
    }
}
