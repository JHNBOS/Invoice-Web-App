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
  selector: 'app-add-debtor',
  templateUrl: './add-debtor.component.html',
  styleUrls: ['./add-debtor.component.scss']
})
export class AddDebtorComponent implements OnInit {
  debtor: Debtor = new Debtor;
  address: Address = new Address;

  constructor(private titleService: Title, private route: ActivatedRoute,
    private debtorService: DebtorService, private livesAtService: LivesAtService, private addressService: AddressService,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Create Debtor - inVoice');
  }

  submitForm() {
    this.debtorService.createDebtor(this.debtor).subscribe(
      res => {
        this.createAddress();
      },
      (err) => console.log(err)
    );
  }

  private createAddress() {
    this.addressService.createAddress(this.address).subscribe(
      res => this.linkAddress(),
      (err) => console.log(err)
    );
  }

  private linkAddress() {
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
