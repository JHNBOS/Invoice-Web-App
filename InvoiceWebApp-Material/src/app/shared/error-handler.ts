import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, NgZone } from '@angular/core';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {

    constructor(private ngZone: NgZone) {}

    handleError(error: any): void {
        console.log('An error occured!', error);
        this.ngZone.run(() => {
            if (typeof (window) !== 'undefined') {
                const date = new Date().toISOString();

                // Set message based on error
                if (error instanceof HttpErrorResponse) {
                    //this.toastOptions.msg = error.error;
                } else if (error instanceof TypeError) {
                    //this.toastOptions.msg = error.message;
                } else if (error instanceof Error) {
                    //this.toastOptions.msg = error.message;
                } else if (error instanceof Response) {
                    //this.toastOptions.msg = error.statusText;
                } else {
                    //this.toastOptions.msg = error;
                }

                // Show message
            }
        });
    }
}
