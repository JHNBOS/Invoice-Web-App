import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../shared/services/company.service';
import Company from '../shared/models/company.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastOptions, ToastyConfig, ToastyService } from 'ng2-toasty';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})

export class CompanyComponent implements OnInit {
  companies: Company[] = [];
  toastOptions: ToastOptions = {
    title: '',
    msg: '',
    showClose: true,
    timeout: 5000,
    theme: 'default'
  };

  constructor(private titleService: Title, private route: ActivatedRoute,
    private companyService: CompanyService, private router: Router, private toastyService: ToastyService,
    private toastyConfig: ToastyConfig) {

    // Set toast theme
    this.toastyConfig.theme = 'default';
  }

  ngOnInit() {
    this.titleService.setTitle('Companies - inVoice');
    this.getAllCompanies();
  }

  getAllCompanies() {
    this.companyService.getAllCompanies().subscribe(
      res => {
        if (res.toString() !== 'No companies available!') {
          this.companies = res;
        }
      },
      (err) => {
        this.toastOptions.title = 'Oops, an error occured';
        this.toastOptions.msg = 'Unable to retrieve companies. Please try again!';
        this.toastyService.error(this.toastOptions);
      }
    );
  }

  deleteCompany(id: number) {
    if (confirm('Are you sure you want to delete this company?')) {
      this.companyService.deleteCompanyByNumber(id).subscribe(
        res => this.ngOnInit(),
        (err) => {
          this.toastOptions.title = 'Oops, an error occured';
          this.toastOptions.msg = 'Unable to remove company. Please try again!';
          this.toastyService.error(this.toastOptions);
        });
    }
  }

}
