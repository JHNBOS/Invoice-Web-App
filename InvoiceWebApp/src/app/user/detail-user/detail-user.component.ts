import { Component, OnInit } from '@angular/core';
import User from '../../shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-detail-user',
  templateUrl: './detail-user.component.html',
  styleUrls: ['./detail-user.component.scss']
})
export class DetailUserComponent implements OnInit {
  userId: number;
  currentUser: User;

  constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('User Details - inVoice');
    this.route.params.subscribe(
      (params) => {
        this.userId = +params['id'];
        this.getUser(this.userId);
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
