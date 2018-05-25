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
  //$ => Observable
  private comments$: Observable<Object>;

  /* Pagination variables */
  private totalCountArr: Array<number>;
  private displayCountArr: Array<number>;
  private currentPage: number = 5;

  //Acts as both Observable and Observer
  //observable.subscribe(observerOrOnNext)
  //observer.next(value)
  displayCountSubject: Subject<number> = new Subject();

  skip: number = 0;
  limit: number = 25;
  searchText: string = '';

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    /* RXJS INIT */
    this.displayCountSubject.subscribe(currentPage => this.displayCountArr = _.chain(this.totalCountArr)
      .drop(currentPage - 3)
      .take(5)
      .value())

    /* API */
    const query = {
      skip: this.skip,
      limit: this.limit,
      searchText: this.searchText
    }
    this.getComments(query);
  }

  getComments(query?) {
    this.comments$ = this.commentService.getComments(query)
      .pipe(
        tap(values => {
          let [comments, { count }] = values;
          this.totalCountArr = _.times(Math.floor(count / this.limit) || 1, page => Number(++page));
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
  next() {
    const isLast = this.currentPage === _.last(this.totalCountArr);
    if (isLast)
      return;

    this.displayCountSubject.next(++this.currentPage);
  }

  previous() {
    const isFirst = this.currentPage === _.first(this.totalCountArr);
    if (isFirst)
      return;

    this.displayCountSubject.next(--this.currentPage);
  }

}
