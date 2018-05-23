import { Injectable } from "@angular/core";


@Injectable({
    providedIn: 'root'
})
export class Config {
    BASEURL: string = 'http://localhost:4000/api/';
}