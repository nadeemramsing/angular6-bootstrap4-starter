import { Component, OnInit } from '@angular/core';

//RxJS
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { tap, map } from 'rxjs/operators';

import { CommentService } from './../../../common/services/comment.service';

//Lodash
import { times } from 'lodash';
const _ = { times };

@Component({
  selector: 'table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css'],
  providers: [CommentService]
})
export class Table1Component implements OnInit {
  //$ => Observable
  private comments$: Observable<Object>;
  private countArr: Array<number>;

  skip: number = 0;
  limit: number = 50;
  searchText: string = 'na';

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
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
          this.countArr = _.times(Math.floor(count / this.limit) || 1, page => Number(++page));
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

}
