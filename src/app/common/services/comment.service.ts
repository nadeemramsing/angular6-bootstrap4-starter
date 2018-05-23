import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Config } from './../Config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http: HttpClient, private config: Config) { }

  postComment(body): Observable<Object> {
    return this.http.post(this.config.BASEURL + 'comment', body);
  }
}
