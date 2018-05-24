import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { tap, map } from 'rxjs/operators';

import { CommentService } from './../../../common/services/comment.service';

@Component({
  selector: 'table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css'],
  providers: [CommentService]
})
export class Table1Component implements OnInit {
  //$ => Observable
  private comments$: Observable<Object>;
  private count: Number;

  skip: Number = 0;
  limit: Number = 50;
  searchText: String = 'nad';

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    const query = {
      skip: this.skip,
      limit: this.limit,
      searchText: this.searchText
    }

    //(comments$ | async) pipe in view calls subscribe automatically
    this.comments$ = this.commentService.getComments(query)
      .pipe(
        tap(values => {
          let [comments, { count }] = values;
          this.count = count;
        }),
        map(values => values[0])
      );/* .subscribe({
      next: comments$ => this.comments$ = of(comments$),
      error: err => console.error(err)
    }) */;
  }

}
