import { Component, OnInit, Input, Output, OnChanges, EventEmitter, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs';

//Lodash
import { last, times, chain } from 'lodash';
const _ = { times, chain };

@Component({
  selector: 'nr-pagination',
  templateUrl: './nr-pagination.component.html',
  styleUrls: ['./nr-pagination.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NrPaginationComponent implements OnInit, OnChanges {
  private _: Object = {
    last
  };

  @Input('skip') skip: number = 0;
  @Input('limit') limit: number = 50;
  @Input('countObservable') count$: Observable<number>;
  @Output('onPageChange') changePage = new EventEmitter();


  private totalCountArr: Array<number> = [];
  private displayCountArr: Array<number> = [];
  private currentPage: number = 1;
  private noOfPages: number = 5;
  private halfNoOfPages: number = Math.floor(this.noOfPages / 2);

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {}

  //Fires when data-bound properties/@Input variable changes (change should be by reference?)
  ngOnChanges(changes) {
    //changes: {currentValue, firstChange, previousValue}
    if (this.count$ instanceof Observable)
      this.count$.subscribe(count => this.constructTotalCountArr(count));

    if (this.skip === 0)
      this.currentPage = 1;
  }

  constructTotalCountArr(count) {
    this.totalCountArr = _.times(Math.floor(count / this.limit) || 1, page => Number(++page));
    this.constructDisplayCountArr(this.currentPage)
  }

  constructDisplayCountArr(currentPage) {
    const
      isEnd = (this.totalCountArr.length - currentPage) < this.halfNoOfPages,
      beforeCurrentPage = isEnd ? currentPage - (this.halfNoOfPages - (this.totalCountArr.length - currentPage)) : currentPage,
      afterCurrentPage = this.noOfPages - this.halfNoOfPages;

    this.displayCountArr = _.chain(this.totalCountArr)
      .drop(beforeCurrentPage - afterCurrentPage)
      .take(this.noOfPages)
      .value();

    //@Input('skip') used => detectChanges triggered as soon as input bindings change

    //If view not updated:
    //Try detectChanges first (to immediately run change detection for current component and its children)
    //Current -> Children
    /* this.ref.detectChanges(); */

    //If does not work, try markForCheck (to mark all ChangeDetectionStrategy ancestors as to be checked.)
    //Current -> Parents
    /* this.ref.markForCheck(); */

    //How CD works: 
    //It always goes from root component down. 
    //So, if we want to run CD on a specific component, we will need to do CD from root to the specific component

    //ChangeDetectorRef is a reference to the CD of the current component
  }

  jumpToPage(page) {
    this.currentPage = page;
    this.skip = (page - 1) * this.limit;
    this.constructDisplayCountArr(page)
    this.changePage.emit({
      skip: this.skip,
      limit: this.limit
    });
  }
}
