import { Component, OnInit } from '@angular/core';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-import-user',
  templateUrl: './import-user.component.html',
  styleUrls: ['./import-user.component.scss']
})
export class ImportUserComponent implements OnInit {
  users: User[] = [];
  toastOptions: ToastOptions;

  constructor(private titleService: Title, private userService: UserService, private toastyService: ToastyService,
    private route: ActivatedRoute, private router: Router) {

    this.titleService.setTitle('Import Users - inVoice');
    this.toastOptions = {
      title: 'Success',
      msg: 'User(s) have been successfully added!',
      theme: ' bootstrap',
      showClose: true,
      timeout: 4000
    };
  }

  ngOnInit() { }

  upload(event: any) {
    this.extractData(event.target);
  }

  private mapToUser(data: any[]) {
    const user = new User();
    user.user_id = Number.parseInt(data[0]);
    user.first_name = data[1];
    user.last_name = data[2];
    user.email = data[3];
    user.password = data[4];
    user.profile_pic = data[5];

    this.users.push(user);
  }

  private extractData(fileInput: any) {
    const fileReaded = fileInput.files[0];
    const lines = [];

    const reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);

    reader.onload = (e) => {
      const csv: string = reader.result;
      const allTextLines = csv.split(/\r|\n|\r/);
      const headers = allTextLines[0].split(',');

      for (let i = 1; i < allTextLines.length; i++) {
        // split content based on comma
        const data = allTextLines[i].split(',');
        if (data.length === headers.length) {
          const tarr = [];
          for (let j = 0; j < headers.length; j++) {
            tarr.push(data[j]);
          }

          this.mapToUser(tarr);
        }
      }

      this.saveUsers();
    };
  }

  private saveUsers() {
    let count = 0;
    for (let i = 0; i < this.users.length; i++) {
      const user = this.users[i];

      this.userService.createUser(user).subscribe(
        (res) => {
          count++;
          if (count === this.users.length) {
            this.toastyService.success(this.toastOptions);
          }
        },
        (error) => {
          console.log(error);
          return Observable.throw(error);
        }
      );
    }

    setTimeout(() => {
      this.router.navigate(['/users']);
    }, 3000);
  }

}
