import { Injectable } from '@angular/core';
import { ToastyService, ToastOptions } from 'ng2-toasty';
import { ErrorHandler, NgZone } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    toastOptions: ToastOptions;

    constructor(private ngZone: NgZone, private toastyService: ToastyService) {
        this.toastOptions = {
            title: 'Oops, an error occured',
            msg: '',
            theme: ' bootstrap',
            showClose: true,
            timeout: 4000
        };
    }

    handleError(error: any): void {
        console.log('An error occured!', error);
        this.ngZone.run(() => {
            if (typeof (window) !== 'undefined') {
                const date = new Date().toISOString();

                // Set message based on error
                if (error instanceof HttpErrorResponse) {
                    this.toastOptions.msg = 'An error occured while your request was being processed, please try again!';
                    console.error(date, 'HTTP Error.', error.message, 'Status code:', (<HttpErrorResponse>error).status);
                } else if (error instanceof TypeError) {
                    this.toastOptions.msg = 'An error occured, please try again!';
                    console.error(date, 'Typescript Error', error.message);
                } else if (error instanceof Error) {
                    this.toastOptions.msg = 'An error occured, please try again!';
                    console.error(date, 'General Error', error.message);
                } else {
                    this.toastOptions.msg = 'Something unexpected happened, please try again!';
                    console.error(date, 'Unexpected Error', error.message);
                }

                // Show message
                this.toastyService.error(this.toastOptions);
            }
        });
    }

}
