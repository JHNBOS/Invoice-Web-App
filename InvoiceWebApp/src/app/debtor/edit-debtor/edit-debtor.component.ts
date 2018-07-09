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
            (response) => this.createAddress(),
            (error) => { throw error; }
        );
    }

    createAddress() {
        this.addressService.create(this.address).subscribe(
            (response) => this.linkAddress(),
            (error) => { throw error; }
        );
    }

    linkAddress() {
        const livesAt = new DebtorHasAddress();
        livesAt.debtor_id = this.debtor.id;
        livesAt.address_postal = this.address.postal_code;
        livesAt.address_number = this.address.number;

        this.debtorHasAddressService.create(livesAt).subscribe(
            (response) => this.router.navigate(['/debtors']),
            (error) => { throw error; }
        );
    }
}
