import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

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

  constructor(
    private commentService: CommentService
  ) { }

  ngOnInit() {
    const query = {
      skip: 0,
      limit: 50
    }

    //(comments$ | async) pipe in view calls subscribe automatically
    this.comments$ = this.commentService.getComments(query)/* .subscribe({
      next: comments$ => this.comments$ = of(comments$),
      error: err => console.error(err)
    }) */;
  }

}
