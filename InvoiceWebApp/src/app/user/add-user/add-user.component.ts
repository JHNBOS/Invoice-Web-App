import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-add-user',
    templateUrl: './add-user.component.html',
    styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
    currentUser: User = new User;
    
    constructor(private titleService: Title, private route: ActivatedRoute, private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Create User - inVoice');
    }

    submitForm() {
        this.userService.create(this.currentUser).subscribe(
            (response) => { this.router.navigate(['/users']); },
            (error) => { throw error; }
        );
    }
}
