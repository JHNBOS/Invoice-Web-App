import { Component, OnInit } from '@angular/core';
import Debtor from '../../shared/models/debtor.model';
import Address from '../../shared/models/address.model';
import { Title } from '@angular/platform-browser';
import { DebtorService } from '../../shared/services/debtor.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LivesAtService } from '../../shared/services/lives-at.service';
import { AddressService } from '../../shared/services/address.service';

@Component({
    selector: 'app-detail-debtor',
    templateUrl: './detail-debtor.component.html',
    styleUrls: ['./detail-debtor.component.scss']
})
export class DetailDebtorComponent implements OnInit {
    debtorId: number;
    debtor: Debtor;
    lives_at: LivesAt;
    address: Address;

    constructor(private titleService: Title, private route: ActivatedRoute,
        private debtorService: DebtorService, private livesAtService: LivesAtService, private addressService: AddressService,
        private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Debtor Details - inVoice');
        this.route.params.subscribe(
            (params) => {
                this.debtorId = +params['id'];
                this.getDebtor(this.debtorId);
            }
        );
    }

    getDebtor(id: number) {
        this.debtorService.getDebtorById(id).subscribe(
            res => {
                this.debtor = res;
                this.getLivesAt();
            },
            (err) => console.log(err)
        );
    }

    getAddress() {
        this.addressService.getAddress(this.lives_at.address_postal, this.lives_at.address_number).subscribe(
            res => this.address = res,
            (err) => console.log(err)
        );
    }

    getLivesAt() {
        this.livesAtService.getLivesAtByDebtor(this.debtor.ssn).subscribe(
            res => {
                this.lives_at = res;
                this.getAddress();
            },
            (err) => console.log(err)
        );
    }

}
