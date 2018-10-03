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
    query = '';

    constructor(private titleService: Title, private route: ActivatedRoute, private debtorService: DebtorService,
        private router: Router) { }

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
        const results: Debtor[] = [];
        this.debtors.forEach(f => {
            if (f.company_name == null) {
                if (f.id.toLowerCase().includes(this.query.toLowerCase()) || f.email.toLowerCase().includes(this.query.toLowerCase())
                    || f.address.city.toLowerCase().includes(this.query.toLowerCase())
                    || f.address.country.toLowerCase().includes(this.query.toLowerCase())
                    || f.first_name.toLowerCase().includes(this.query.toLowerCase())
                    || f.last_name.toLowerCase().includes(this.query.toLowerCase())) {

                    results.push(f);
                }
            } else {
                if (f.id.toLowerCase().includes(this.query.toLowerCase()) || f.email.toLowerCase().includes(this.query.toLowerCase())
                    || f.address.city.toLowerCase().includes(this.query.toLowerCase())
                    || f.address.country.toLowerCase().includes(this.query.toLowerCase())
                    || f.company_name.toLowerCase().includes(this.query.toLowerCase())) {

                    results.push(f);
                }
            }
        });

        return results;
    }
}
