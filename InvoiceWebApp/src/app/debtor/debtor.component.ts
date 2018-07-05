import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import Debtor from '../shared/models/debtor.model';
import { DebtorService } from '../shared/services/debtor.service';

@Component({
    selector: 'app-debtor',
    templateUrl: './debtor.component.html',
    styleUrls: ['./debtor.component.scss']
})

export class DebtorComponent implements OnInit {
    debtors: Debtor[] = [];

    constructor(private titleService: Title, private route: ActivatedRoute, private debtorService: DebtorService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Debtors - inVoice');
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
}
