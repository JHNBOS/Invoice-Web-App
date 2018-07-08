import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute } from '@angular/router';

import { DebtorService } from '../../shared/services/debtor.service';
import { AddressService } from '../../shared/services/address.service';

import Debtor from '../../shared/models/debtor.model';
import Address from '../../shared/models/address.model';
import DebtorHasAddress from '../../shared/models/debtor_has_address.model';
import { DebtorHasAddressService } from '../../shared/services/debtorHasAddress.service';

@Component({
    selector: 'app-detail-debtor',
    templateUrl: './detail-debtor.component.html',
    styleUrls: ['./detail-debtor.component.scss']
})
export class DetailDebtorComponent implements OnInit {
    debtorId: string;
    debtor: Debtor;

    constructor(private titleService: Title, private route: ActivatedRoute, private debtorService: DebtorService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Debtor Details - inVoice');
        this.route.params.subscribe(
            (params) => {
                this.debtorId = params['id'];
                this.getDebtor(this.debtorId);
            }
        );
    }

    getDebtor(id: string) {
        this.debtorService.getById(id).subscribe(
            res => this.debtor = res,
            (err) => console.log(err)
        );
    }
}
