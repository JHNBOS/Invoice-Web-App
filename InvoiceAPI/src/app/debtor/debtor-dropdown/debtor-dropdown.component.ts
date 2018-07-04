import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DebtorService } from '../../shared/services/debtor.service';
import Debtor from '../../shared/models/debtor.model';
import { Observable } from 'rxjs/Observable';
import { LivesAtService } from '../../shared/services/lives-at.service';
import { AddressService } from '../../shared/services/address.service';
import LivesAt from '../../shared/models/lives_at.model';
import Address from '../../shared/models/address.model';
import DebtorViewModel from '../../shared/models/viewmodels/debtor.viewmodel';

@Component({
  selector: 'app-debtor-dropdown',
  templateUrl: './debtor-dropdown.component.html',
  styleUrls: ['./debtor-dropdown.component.scss']
})
export class DebtorDropdownComponent implements OnInit {
  debtors: DebtorViewModel[] = [];
  livesAts: LivesAt[] = [];
  locations: string[] = [];
  selectedDebtor: Debtor;
  isReady = false;

  @Output() chosenDebtor = new EventEmitter<Debtor>();

  constructor(private debtorService: DebtorService, private livesAtService: LivesAtService,
    private addressService: AddressService) { }

  ngOnInit() {
    this.getAllDebtors();
  }

  setAddress() {
    this.debtors.forEach(debtor => {
      const lives_at = this.livesAtService.getLivesAtByDebtor(debtor.ssn).subscribe(
        res => {
          const address = this.addressService.getAddress(res.address_postal, res.address_number).subscribe(
            result => {
              debtor.street = result.street;
              debtor.number = result.number;
              debtor.suffix = result.suffix;
              debtor.postal_code = result.postal_code;
              debtor.city = result.city;
              debtor.country = result.country;

              debtor.setDebtorString();
              this.isReady = true;
            }
          );
        },
        (error) => {
          console.log(error);
          return Observable.throw(error);
        }
      );
    });
  }

  setDebtor(event: any) {
    this.selectedDebtor = <Debtor>event;
    this.chosenDebtor.emit(this.selectedDebtor);
  }

  getAllDebtors() {
    this.debtorService.getAllDebtors().subscribe(
      values => {
        values.forEach(debtor => {
          // tslint:disable-next-line:prefer-const
          let debtorViewModel = new DebtorViewModel();
          debtorViewModel.ssn = debtor.ssn;
          debtorViewModel.first_name = debtor.first_name;
          debtorViewModel.last_name = debtor.last_name;
          debtorViewModel.bank_account = debtor.bank_account;
          debtorViewModel.email = debtor.email;
          debtorViewModel.phone = debtor.phone;

          this.debtors.push(debtorViewModel);
        });
        this.setAddress();
      },
      (error) => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }
}
