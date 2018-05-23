import { Component, OnInit } from '@angular/core';

import { CommentService } from './../../../common/services/comment.service';

@Component({
  selector: 'app-table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css'],
  providers: [CommentService]
})
export class Table1Component implements OnInit {

  constructor(/* private commentService: CommentService */) { }

  ngOnInit() {

  }

}
