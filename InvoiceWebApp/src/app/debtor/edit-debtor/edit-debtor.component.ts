import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Address from '../../shared/models/address.model';
import Debtor from '../../shared/models/debtor.model';
import DebtorHasAddress from '../../shared/models/debtor_has_address.model';
import { AddressService } from '../../shared/services/address.service';
import { DebtorService } from '../../shared/services/debtor.service';
import { DebtorHasAddressService } from '../../shared/services/debtor_has_address.service';

@Component({
    selector: 'app-edit-debtor',
    templateUrl: './edit-debtor.component.html',
    styleUrls: ['./edit-debtor.component.scss']
})
export class EditDebtorComponent implements OnInit {
    debtorId: string;
    debtor: Debtor;
    lives_at: DebtorHasAddress;
    address: Address;

    constructor(private titleService: Title, private route: ActivatedRoute,
        private debtorService: DebtorService, private debtorHasAddressService: DebtorHasAddressService, private addressService: AddressService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Edit Debtor - Invoice Panel');
        this.route.params.subscribe(
            (params) => {
                this.debtorId = params['id'];
                this.getDebtor(this.debtorId);
            }
        );
    }

    getDebtor(id: string) {
        this.debtorService.getById(id).subscribe(
            (response) => {
                this.debtor = response;
                this.getLivesAt();
            },
            (error) => { throw error; }
        );
    }

    getAddress() {
        this.addressService.getAddress(this.lives_at.address_postal, this.lives_at.address_number).subscribe(
            (response) => this.address = response,
            (error) => { throw error; }
        );
    }

    getLivesAt() {
        this.debtorHasAddressService.getByDebtorId(this.debtor.id).subscribe(
            (response) => {
                this.lives_at = response;
                this.getAddress();
            },
            (error) => { throw error; }
        );
    }

    submitForm() {
        this.debtorService.update(this.debtor).subscribe(
            (response) => {
                if ((this.debtor.address.postal_code != this.address.postal_code) && (this.debtor.address.number != this.address.number)) {
                    this.createAddress();
                } else {
                    this.router.navigate(['/debtors']);
                }
            },
            (error) => { throw error; }
        );
    }

    createAddress() {
        var exists = this.addressService.getAddress(this.address.postal_code, this.address.number).subscribe(
            (response) => {
                if (response != null) {
                    true;
                } else {
                    false;
                }
            },
            (error) => { }
        );

        if (exists) {
            this.linkAddress();
        } else {
            this.addressService.create(this.address).subscribe(
                (response) => this.linkAddress(),
                (error) => { throw error; }
            );
        }
    }

    private linkAddress() {
        var exists = this.debtorHasAddressService.getByDebtorId(this.debtor.id).subscribe(
            (response) => {
                if (response != null) {
                    true;
                } else {
                    false;
                }
            },
            (error) => { }
        );

        if (exists) {
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
            (response) => this.router.navigate(['/debtors']),
            (error) => { throw error; }
        );
    }
}
