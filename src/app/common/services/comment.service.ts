import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable, of, forkJoin } from 'rxjs';
import { ReplaySubject } from 'rxjs/ReplaySubject';

import { Config } from './../Config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  //Caches value => Can be used to get last n emitted values elsewhere using bs.getValue()
  //vs. BehaviorSubject: Caches last value only and allow to provide inital value
  getCommentsSubject: ReplaySubject<Object> = new ReplaySubject(1);

  constructor(private http: HttpClient, private config: Config) { }

  getComments(query?): Observable<any> {
    const
      getComments = this.http.get(this.config.BASEURL + 'comments', {
        params: query
      }),
      getCommentsCount = this.getCommentsCount(query);

    //init
    //Previous values were being emitted => init (workaround)
    this.getCommentsSubject = new ReplaySubject(1);

    forkJoin(
      getComments,
      getCommentsCount
    ).subscribe(this.getCommentsSubject);
    //assigning an Observable to a BehaviorSubject

    return this.getCommentsSubject.asObservable();
  }

  getCommentsCount(query?): Observable<any> {
    return this.http
      .get(this.config.BASEURL + 'comments/count', {
        params: query
      });
  }

  postComment(body): Observable<any> {
    return this.http.post(this.config.BASEURL + 'comment', body);
  }
}
