import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';
import { ToastOptions, ToastyService } from 'ngx-toasty';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
    toastOptions: ToastOptions;

    constructor(private ngZone: NgZone, private toastyService: ToastyService) {
        this.toastOptions = {
            title: 'Error',
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
                    this.toastOptions.msg = error.error;
                } else if (error instanceof TypeError) {
                    this.toastOptions.msg = error.message;
                } else if (error instanceof Error) {
                    this.toastOptions.msg = error.message;
                } else if (error instanceof Response) {
                    this.toastOptions.msg = error.statusText;
                } else {
                    this.toastOptions.msg = error;
                }

                // Show message
                this.toastyService.error(this.toastOptions);
            }
        });
    }
}
