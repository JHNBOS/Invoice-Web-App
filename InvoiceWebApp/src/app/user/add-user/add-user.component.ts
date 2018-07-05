import { Component, OnInit } from '@angular/core';
import User from '../../shared/models/user.model';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  currentUser: User = new User;

  constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService,
    private router: Router) { }

  ngOnInit() {
    this.titleService.setTitle('Create User - inVoice');
  }

  submitForm() {
    this.userService.createUser(this.currentUser).subscribe(
      res => { this.router.navigate(['/users']); },
      (error) => {
        console.log(error);
        return Observable.throw(error);
      }
    );
  }

}
