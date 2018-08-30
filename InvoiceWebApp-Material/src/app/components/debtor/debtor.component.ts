import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Debtor from '../../shared/models/debtor.model';
import Settings from '../../shared/models/settings.model';
import { DebtorService } from '../../shared/services/debtor.service';

@Component({
    selector: 'app-debtor',
    templateUrl: './debtor.component.html',
    styleUrls: ['./debtor.component.scss']
})

export class DebtorComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    debtors: Debtor[] = [];
    query: string = '';

    constructor(private titleService: Title, private route: ActivatedRoute, private debtorService: DebtorService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Debtors - ' + this.settings.company_name);
        this.getAllDebtors();
    }

    getAllDebtors() {
        this.debtorService.getAll().subscribe(
            (response) => this.debtors = response,
            (error) => { throw error; }
        );
    }

    deleteDebtor(id: string) {
        if (confirm('Are you sure you want to delete this debtor?')) {
            this.debtorService.delete(id).subscribe(
                (response) => this.ngOnInit(),
                (error) => { throw error; }
            );
        }
    }

    search() {
        if (this.query != '') {
            let returnDebtors: Debtor[] = [];

            this.debtors.forEach((debtor) => {
                if (debtor.company_name == null) {
                    returnDebtors = this.debtors.filter(f => f.id.includes(this.query) || f.first_name.includes(this.query) || f.last_name.includes(this.query)
                        || f.address.city.includes(this.query) || f.address.country.includes(this.query));
                } else {
                    returnDebtors = this.debtors.filter(f => f.id.includes(this.query) || f.company_name.includes(this.query) || f.address.city.includes(this.query) || f.address.country.includes(this.query));
                }
            });

            return returnDebtors;
        }

        return this.debtors;
    }
}
