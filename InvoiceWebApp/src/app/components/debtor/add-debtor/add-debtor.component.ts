import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import Address from '../../../shared/models/address.model';
import Debtor from '../../../shared/models/debtor.model';
import DebtorHasAddress from '../../../shared/models/debtor_has_address.model';
import Settings from '../../../shared/models/settings.model';
import User from '../../../shared/models/user.model';
import { AddressService } from '../../../shared/services/address.service';
import { DebtorService } from '../../../shared/services/debtor.service';
import { DebtorHasAddressService } from '../../../shared/services/debtor_has_address.service';
import { UserService } from '../../../shared/services/user.service';

@Component({
    selector: 'app-add-debtor',
    templateUrl: './add-debtor.component.html',
    styleUrls: ['./add-debtor.component.scss']
})
export class AddDebtorComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    forCompany: boolean;
    debtor: Debtor = new Debtor;
    address: Address = new Address;

    addressExists = false;
    hasAddressExists = false;

    constructor(private titleService: Title, private debtorService: DebtorService, private debtorHasAddressService: DebtorHasAddressService,
        private addressService: AddressService, private userService: UserService, private router: Router,
        private spinner: NgxSpinnerService) { }

    ngOnInit() {
        this.titleService.setTitle('Create Debtor - ' + this.settings.company_name);
        this.forCompany = false;
    }

    changeForm(event: any) {
        if (event.target.checked) {
            this.forCompany = true;
        } else {
            this.forCompany = false;
        }
    }

    submitForm() {
        // Show spinner
        this.spinner.show();

        this.debtorService.create(this.debtor).subscribe(
            (response) => {
                if (this.debtor.address == null) {
                    this.checkAddressExists();
                } else {
                    setTimeout(() => {
                        // Hide spinner
                        this.spinner.hide();

                        this.router.navigate(['/debtors']);
                    }, 1500);
                }
            },
            (error) => { throw error; }
        );
    }

    private checkAddressExists() {
        this.addressService.addressExists(this.address.postal_code, this.address.number).subscribe(
            (response) => {
                this.addressExists = response;
                this.createAddress();
            },
            (error) => { throw error; }
        );
    }

    private createAddress() {
        if (this.addressExists) {
            this.checkHasAddressExists();
        } else {
            this.addressService.create(this.address).subscribe(
                (res) => this.checkHasAddressExists(),
                (error) => { throw error; }
            );
        }
    }

    private checkHasAddressExists() {
        this.debtorHasAddressService.hasAddressExists(this.debtor.id).subscribe(
            (response) => {
                this.hasAddressExists = response;
                this.createHasAddress();
            },
            (error) => { throw error; }
        );
    }

    private createHasAddress() {
        if (this.hasAddressExists) {
            this.deleteHasAddress();
        } else {
            const debtorAddressLink = new DebtorHasAddress();
            debtorAddressLink.debtor_id = this.debtor.id;
            debtorAddressLink.address_postal = this.address.postal_code;
            debtorAddressLink.address_number = this.address.number;

            this.debtorHasAddressService.create(debtorAddressLink).subscribe(
                (response) => this.createUser(),
                (error) => { throw error; }
            );
        }
    }

    private deleteHasAddress() {
        this.debtorHasAddressService.deleteDebtorHasAddress(this.debtor.id, this.address.postal_code, this.address.number).subscribe(
            (response) => { this.createHasAddress(); },
            (error) => { throw error; }
        );
    }

    private createUser() {
        const user = new User();
        user.email = this.debtor.email;
        user.role_id = 2;

        if (this.debtor.company_name == null) {
            user.first_name = this.debtor.first_name;
            user.last_name = this.debtor.last_name;
        } else {
            user.company_name = this.debtor.company_name;
        }

        this.userService.create(user).subscribe(
            (response) => {
                setTimeout(() => {
                    // Hide spinner
                    this.spinner.hide();

                    this.router.navigate(['/debtors']);
                }, 1500);
            },
            (error) => { throw error; }
        );
    }
}
