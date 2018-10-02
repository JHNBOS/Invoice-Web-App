import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

import Address from '../../../shared/models/address.model';
import Debtor from '../../../shared/models/debtor.model';
import DebtorHasAddress from '../../../shared/models/debtor_has_address.model';
import Settings from '../../../shared/models/settings.model';
import { AddressService } from '../../../shared/services/address.service';
import { DebtorService } from '../../../shared/services/debtor.service';
import { DebtorHasAddressService } from '../../../shared/services/debtor_has_address.service';
import { UserService } from '../../../shared/services/user.service';
import User from '../../../shared/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-add-debtor',
    templateUrl: './add-debtor.component.html',
    styleUrls: ['./add-debtor.component.scss']
})
export class AddDebtorComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    forCompany = false;
    debtor: Debtor = new Debtor;
    address: Address = new Address;

    addressExists = false;
    linkExists = false;

    constructor(private titleService: Title, private route: ActivatedRoute, private debtorService: DebtorService,
        private debtorHasAddressService: DebtorHasAddressService, private addressService: AddressService, private userService: UserService,
        private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Create Debtor - ' + this.settings.company_name);
        this.route.params.subscribe(
            (params) => {
                this.forCompany = params['company'] === 'yes' ? true : false;
            }
        );
    }

    submitForm() {
        this.debtorService.create(this.debtor).subscribe(
            (response) => {
                if (this.debtor.address == null) {
                    this.createAddress();
                } else {
                    this.router.navigate(['/debtors']);
                }
            },
            (error) => { throw error; }
        );
    }

    private createAddress() {
        this.addressService.getAddress(this.address.postal_code, this.address.number).subscribe(
            (response: Address) => {
                this.addressExists = true;

                if (this.addressExists) {
                    this.linkAddress();
                } else {
                    this.addressService.create(this.address).subscribe(
                        (res) => this.linkAddress(),
                        (error) => { throw error; }
                    );
                }
            },
            (error: HttpErrorResponse) => {
                if (error.status === 500) {
                    this.addressExists = true;
                }

                if (this.addressExists) {
                    this.linkAddress();
                } else {
                    this.addressService.create(this.address).subscribe(
                        (response) => this.linkAddress(),
                        (err) => { throw error; }
                    );
                }
            }
        );
    }

    private linkAddress() {
        this.debtorHasAddressService.getByDebtorId(this.debtor.id).subscribe(
            (response: DebtorHasAddress) => {
                this.linkExists = true;
            },
            (error: HttpErrorResponse) => {
                if (error.status === 500) {
                    this.linkExists = false;
                } else {
                    this.linkExists = true;
                }
            }
        );

        if (this.linkExists) {
            this.debtorHasAddressService.deleteDebtorHasAddress(this.debtor.id, this.address.postal_code, this.address.number).subscribe(
                (response) => { },
                (error) => { }
            );
        }

        const debtorAddressLink = new DebtorHasAddress();
        debtorAddressLink.debtor_id = this.debtor.id;
        debtorAddressLink.address_postal = this.address.postal_code;
        debtorAddressLink.address_number = this.address.number;

        this.debtorHasAddressService.create(debtorAddressLink).subscribe(
            (response) => this.createUser(),
            (error) => { throw error; }
        );
    }

    private createUser() {
        const user = new User();
        user.email = this.debtor.email;
        user.first_name = this.debtor.first_name;
        user.last_name = this.debtor.last_name;
        user.role_id = 2;

        this.userService.create(user).subscribe(
            (response) => this.router.navigate(['/debtors']),
            (error) => { throw error; }
        );
    }
}
