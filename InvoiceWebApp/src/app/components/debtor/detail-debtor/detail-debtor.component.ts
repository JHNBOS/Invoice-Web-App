import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Debtor from '../../../shared/models/debtor.model';
import Settings from '../../../shared/models/settings.model';
import { DebtorService } from '../../../shared/services/debtor.service';

@Component({
    selector: 'app-detail-debtor',
    templateUrl: './detail-debtor.component.html',
    styleUrls: ['./detail-debtor.component.scss']
})
export class DetailDebtorComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    debtorId: string;
    debtor: Debtor;

    constructor(private titleService: Title, private route: ActivatedRoute, private debtorService: DebtorService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Debtor Details - ' + this.settings.company_name);
        this.route.params.subscribe(
            (params) => {
                this.debtorId = params['id'];
                this.getDebtor(this.debtorId);
            }
        );
    }

    getDebtor(id: string) {
        this.debtorService.getById(id).subscribe(
            (response) => this.debtor = response,
            (error) => { throw (error); }
        );
    }
}
