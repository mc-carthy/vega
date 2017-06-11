import * as Raven from 'raven-js';
import { ToastyService } from 'ng2-toasty';
import { ErrorHandler, Inject, NgZone, isDevMode } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {

    constructor(
        private ngZone: NgZone,
        @Inject(ToastyService) private toastyService: ToastyService) {
    }

    handleError(err: any): void {
        this.ngZone.run(() => {
            this.toastyService.error({
                title: 'Error',
                msg: err.text(),
                theme: 'bootstrap',
                showClose: true,
                timeout: 5000
            });
        })
        
        if (!isDevMode)
        {
            Raven.captureException(err.originalError || err);
        }
        else
        {
            throw err;
        }
        

    }
}