import { Component, OnInit } from '@angular/core';
import { Route, ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import User from '../../shared/models/user.model';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {
  userId: number;
  currentUser: User;

  constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Edit User - inVoice');
    this.route.params.subscribe(
      (params) => {
        this.userId = +params['id'];
        this.getUser(this.userId);
      }
    );
  }

  submitForm() {
    this.userService.updateUser(this.currentUser).subscribe(
      res => { this.router.navigate(['/users']); },
      (error) => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

  getUser(id: number) {
    this.userService.getUserById(id).subscribe(
      res => this.currentUser = res,
      (error) => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }
}
