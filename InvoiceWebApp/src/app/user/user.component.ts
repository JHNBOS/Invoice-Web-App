import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import User from '../shared/models/user.model';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
  users: User[] = [];

  constructor(private titleService: Title, private route: ActivatedRoute,
    private userService: UserService, private router: Router) {}

  ngOnInit() {
    this.titleService.setTitle('Users - inVoice');
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe(
      res => {
        if (res.toString() !== 'No users available!') {
          this.users = res;
        }
      },
      (err) => {
        throw(err);
      }
    );
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUserById(id).subscribe(
        res => this.ngOnInit(),
        (err) => {
          throw(err);
        }
      );
    }
  }

}
