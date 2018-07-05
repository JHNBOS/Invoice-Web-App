import { Component, OnInit } from '@angular/core';
import { DebtorService } from '../shared/services/debtor.service';
import Debtor from '../shared/models/debtor.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-debtor',
  templateUrl: './debtor.component.html',
  styleUrls: ['./debtor.component.scss']
})

export class DebtorComponent implements OnInit {
  debtors: Debtor[] = [];
  toastOptions: ToastOptions = {
    title: '',
    msg: '',
    showClose: true,
    timeout: 5000,
    theme: 'default'
  };

  constructor(private titleService: Title, private route: ActivatedRoute,
    private debtorService: DebtorService, private router: Router, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {

      // Set toast theme
      this.toastyConfig.theme = 'default';
    }

  ngOnInit() {
    this.titleService.setTitle('Debtors - inVoice');
    this.getAllDebtors();
  }

  getAllDebtors() {
    this.debtorService.getAllDebtors().subscribe(
      res => {
        if (res.toString() !== 'No debtors available!') {
          this.debtors = res;
        }
      },
      (err) => {
        this.toastOptions.title = 'Oops, an error occured';
        this.toastOptions.msg = 'Unable to retrieve debtors. Please try again!';
        this.toastyService.error(this.toastOptions);
      }
    );
  }

  deleteDebtor(id: number) {
    if (confirm('Are you sure you want to delete this debtor?')) {
      this.debtorService.deleteDebtorById(id).subscribe(
        res => this.ngOnInit(),
        (err) => {
          this.toastOptions.title = 'Oops, an error occured';
          this.toastOptions.msg = 'Unable to remove debtor. Please try again!';
          this.toastyService.error(this.toastOptions);
        });
    }
  }

}
