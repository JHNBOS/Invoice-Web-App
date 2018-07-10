import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import Debtor from '../../shared/models/debtor.model';
import { AddressService } from '../../shared/services/address.service';
import { DebtorService } from '../../shared/services/debtor.service';
import { DebtorHasAddressService } from '../../shared/services/debtor_has_address.service';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
    selector: 'app-debtor-dropdown',
    templateUrl: './debtor-dropdown.component.html',
    styleUrls: ['./debtor-dropdown.component.scss']
})
export class DebtorDropdownComponent implements OnInit {
    debtors: Debtor[] = [];
    selectedDebtor: Debtor;
    isReady = false;

    @Output() chosenDebtor = new EventEmitter<Debtor>();

    constructor(private debtorService: DebtorService, private debtorHasAddressService: DebtorHasAddressService, private addressService: AddressService) { }

    ngOnInit() {
        this.getAllDebtors();
    }

    setDebtor(event: any) {
        this.selectedDebtor = <Debtor>event;
        this.chosenDebtor.emit(this.selectedDebtor);
    }

    getAllDebtors() {
        this.debtorService.getAll().subscribe(
            (response) => { this.debtors = response; this.isReady = true; },
            (error) => { throw (error); }
        );
    }
}
