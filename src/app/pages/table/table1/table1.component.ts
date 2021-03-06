import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

//RxJS
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { tap, map, concatMap, debounceTime } from 'rxjs/operators';

import { CommentService } from './../../../common/services/comment.service';

@Component({
  selector: 'table1',
  templateUrl: './table1.component.html',
  styleUrls: ['./table1.component.css'],
  providers: [CommentService]
})
export class Table1Component implements OnInit, AfterViewInit {

  //$ => Observable
  private comments$: Observable<Object>;
  private count$: Observable<number>;

  private query: any = {
    skip: 0,
    limit: 25,
    searchText: ''
  };

  /* SEARCH */
  @ViewChild('search') search: ElementRef;
  private searchClick$: Observable<any>;

  constructor(
    private commentService: CommentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private ref: ChangeDetectorRef
  ) { }

  ngOnInit() {
    /* API */
    this.getComments(this.query);
  }

  ngAfterViewInit() {
    this.searchClick$ = fromEvent(this.search.nativeElement, 'input') //change does not work
      .pipe(
        debounceTime(500),
        concatMap((value: any) => value.data || of(null))
      );
    this.searchClick$.subscribe(key => {
      this.query = Object.assign({}, this.query, { searchText: this.search.nativeElement.value, skip: 0 });

      this.getComments(this.query)
        .pipe(
          (o => { this.ref.detectChanges(); return o })
        );
    });
  }

  getComments(query?) {
    return this.comments$ = this.commentService.getComments(query)
      .pipe(
        tap(values => {
          let [comments, count] = values;

          //separated from comments (due to pagination)
          this.count$ = of(count);
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

  goToForm(comment) {
    //Both works; navigateByUrl seems faster?

    //router.navigateByUrl: Similar to changing the location bar directly – we are providing the “whole” new URL. 
    //router.navigate: creates a new URL by applying an array of passed-in commands, a patch, to the current URL

    //queryParams does not work here => Use to redirect with queryParams only
    /* this.router.navigateByUrl('pages/form/form1', {
      queryParams: { comment },
      queryParamsHandling: "merge"
      //merge: same as Object.assign(previousQueryParams, queryParams)
      //preserve: queryParams won't work; rather currentQueryParams in targetted route will be preserved
    }); */

    //queryParams work
    this.router.navigate(['pages/form/form1'], {
      queryParams: { comment: JSON.stringify(comment) },
      queryParamsHandling: "merge"
    });
  }

  onPageChange(paginationOptions) {
    this.query = Object.assign({}, this.query, paginationOptions);
    this.getComments(this.query);
  }

  /* SEARCH */

}
