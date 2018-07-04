import { Component, OnInit } from '@angular/core';
import Debtor from '../../shared/models/debtor.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DebtorService } from '../../shared/services/debtor.service';
import Address from '../../shared/models/address.model';
import { LivesAtService } from '../../shared/services/lives-at.service';
import LivesAt from '../../shared/models/lives_at.model';
import { Title } from '@angular/platform-browser';
import { AddressService } from '../../shared/services/address.service';

@Component({
  selector: 'app-edit-debtor',
  templateUrl: './edit-debtor.component.html',
  styleUrls: ['./edit-debtor.component.scss']
})
export class EditDebtorComponent implements OnInit {
  debtorId: number;
  debtor: Debtor;
  lives_at: LivesAt;
  address: Address;

  constructor(private titleService: Title, private route: ActivatedRoute,
    private debtorService: DebtorService, private livesAtService: LivesAtService, private addressService: AddressService,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Edit Debtor - inVoice');
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

  submitForm() {
    this.debtorService.updateDebtor(this.debtor).subscribe(
      res => {
        this.createAddress();
      },
      (err) => console.log(err)
    );
  }

  createAddress() {
    this.addressService.createAddress(this.address).subscribe(
      res => this.linkAddress(),
      (err) => console.log(err)
    );
  }

  linkAddress() {
    const livesAt = new LivesAt();
    livesAt.debtor_ssn = this.debtor.ssn;
    livesAt.address_postal = this.address.postal_code;
    livesAt.address_number = this.address.number;

    this.livesAtService.createLivesAt(livesAt).subscribe(
      resp => this.router.navigate(['/debtors']),
      (error) => console.log(error)
    );
  }

}
