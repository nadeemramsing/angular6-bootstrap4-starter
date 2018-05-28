import { Component, OnInit } from '@angular/core';

//RxJS
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { tap, map } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

import { CommentService } from './../../../common/services/comment.service';

//Lodash
import { times, chain, last, first } from 'lodash';
const _ = { times, chain, last, first };

@Component({
  selector: 'table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css'],
  providers: [CommentService]
})
export class Table1Component implements OnInit {
  private _: Object = {
    last
  };

  //$ => Observable
  private comments$: Observable<Object>;

  /* Pagination variables */
  private totalCountArr: Array<number>;
  private displayCountArr: Array<number>;
  private currentPage: number = 20;
  private noOfPages: number = 5;
  private halfNoOfPages: number = Math.floor(this.noOfPages / 2);

  //Acts as both Observable and Observer
  //observable.subscribe(observerOrOnNext)
  //observer.next(value)
  displayCountSubject: Subject<number> = new Subject();

  query: any = {
    skip: 0,
    limit: 25,
    searchText: ''

  };

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    /* RXJS INIT */
    this.displayCountSubject.subscribe(currentPage => {
      const
        isEnd = (this.totalCountArr.length - currentPage) < this.halfNoOfPages,
        beforeCurrentPage = isEnd ? currentPage - (this.halfNoOfPages - (this.totalCountArr.length - currentPage)) : currentPage,
        afterCurrentPage = this.noOfPages - this.halfNoOfPages;

      this.displayCountArr = _.chain(this.totalCountArr)
        .drop(beforeCurrentPage - afterCurrentPage)
        .take(this.noOfPages)
        .value()
    })

    /* API */
    this.getComments(this.query);
  }

  getComments(query?) {
    this.comments$ = this.commentService.getComments(query)
      .pipe(
        tap(values => {
          let [comments, { count }] = values;
          this.totalCountArr = _.times(Math.floor(count / this.query.limit) || 1, page => Number(++page));
          this.displayCountSubject.next(this.currentPage);
        }),
        map(values => values[0])
      );
    //(comments$ | async) pipe in view calls subscribe automatically
    /* 
      .subscribe({
      next: comments$ => this.comments$ = of(comments$),
      error: err => console.error(err)
    });
    */
  }

  /* Pagination methods */

  //jumpToPage directly called from view
  /* next() {
    //[ngClass]=disabled used
    const isLast = this.currentPage === _.last(this.totalCountArr);
    if (isLast)
      return;

    this.jumpToPage(this.currentPage + 1);
  }

  previous() {
    const isFirst = this.currentPage === _.first(this.totalCountArr);
    if (isFirst)
      return;

    this.jumpToPage(this.currentPage - 1);
  } */

  jumpToPage(page) {
    this.query.skip = (page - 1) * this.query.limit;
    this.currentPage = page;
    this.displayCountSubject.next(page);
    this.apiCall();
  }

  apiCall() {
    this.getComments(this.query);
  }

}
