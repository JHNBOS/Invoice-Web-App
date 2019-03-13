import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationResult } from '../../shared/models/pagination.result';
import Settings from '../../shared/models/settings.model';
import User from '../../shared/models/user.model';
import { UserService } from '../../shared/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.scss']
})

export class UserComponent implements OnInit {
    settings: Settings = JSON.parse(sessionStorage.getItem('settings'));

    query = '';
    originalData: User[];
    pagedResult: PaginationResult<User>;
    isDesc = false;
    column: string;

    selectedRows: string[] = [];

    constructor(private titleService: Title, private route: ActivatedRoute,
        private userService: UserService, private router: Router) { }

    ngOnInit() {
        this.titleService.setTitle('Users - ' + this.settings.company_name);
        this.getPage(1);
    }

    search() {
        this.pagedResult.data = this.originalData;
        let results: User[] = [];

        if (this.pagedResult) {
            this.pagedResult.data.forEach(f => {
                if (f.company_name == null) {
                    if (f.email.toLowerCase().includes(this.query.toLowerCase())
                        || f.first_name.toLowerCase().includes(this.query.toLowerCase())
                        || f.last_name.toLowerCase().includes(this.query.toLowerCase())) {

                        results.push(f);
                    }
                } else {
                    if (f.email.toLowerCase().includes(this.query.toLowerCase())
                        || f.company_name.toLowerCase().includes(this.query.toLowerCase())) {

                        results.push(f);
                    }
                }
            });
        }

        this.pagedResult.data = results;
    }

    async getPage(page: number) {
        await this.userService.index(page).toPromise().then(
            (response) => {
                this.pagedResult = response;
                this.originalData = response.data;
            },
            (error: HttpErrorResponse) => { throw error; }
        );
    }

    sort(property: string) {
        this.isDesc = !this.isDesc;
        this.column = property;
        const direction = this.isDesc ? 1 : -1;

        this.pagedResult.data.sort(function (a, b) {
            if (a[property] < b[property]) {
                return -1 * direction;
            } else if (a[property] > b[property]) {
                return 1 * direction;
            } else {
                return 0;
            }
        });
    }

    selectAll(event: any) {
        if (event.target.checked) {
            this.pagedResult.data.forEach(user => {
                user.selected = true;
                this.selectedRows.push(user.email);
            });
        } else {
            this.pagedResult.data.forEach(user => {
                user.selected = false;
            });

            this.selectedRows.splice(0, this.selectedRows.length);
        }
    }

    selected(user: User, event: any) {
        if (event.target.checked) {
            if (this.selectedRows.length === this.pagedResult.data.length - 1 && this.selectedRows.indexOf(user.email) === -1) {
                let selectAllBox = <HTMLInputElement>document.querySelector('#selectAll');
                selectAllBox.checked = true;
            }

            user.selected = true;
            this.selectedRows.push(user.email);
        } else {
            if (this.selectedRows.length === 1 && this.selectedRows.indexOf(user.email) !== -1) {
                let selectAllBox = <HTMLInputElement>document.querySelector('#selectAll');
                selectAllBox.checked = false;
            }

            user.selected = false;
            this.selectedRows.splice(this.selectedRows.indexOf(user.email), 1);
        }
    }

    deleteSelected(email?: string) {
        if (email) {
            if (confirm('Are you sure you want to delete this user?')) {
                this.userService.delete(email).subscribe(
                    () => this.ngOnInit(),
                    (error) => { throw error; }
                );
            }
        } else {
            if (this.selectedRows.length == 0) {
                confirm('Please select one or more users.');
            } else {
                let confirmText = '';
                if (this.selectedRows.length === 1) {
                    confirmText = 'Are you sure you want to delete this user?';
                } else if (this.selectedRows.length > 1) {
                    confirmText = 'Are you sure you want to delete these users?';
                }

                if (confirm(confirmText)) {
                    this.selectedRows.forEach(row => {
                        this.userService.delete(row).subscribe(
                            () => this.ngOnInit(),
                            (error) => { throw error; }
                        );
                    });
                }
            }
        }
    }
}
