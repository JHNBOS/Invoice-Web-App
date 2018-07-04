import { Injectable } from '@angular/core';

@Injectable()
export class SharedService {
    public data: any;

    constructor() { }

    setData(newData: any) {
        this.data = newData;
    }

    clearData() {
        this.data = null;
    }
}
