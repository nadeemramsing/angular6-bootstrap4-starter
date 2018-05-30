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

  @Input('limit') limit: number;
  @Input('countObservable') count$: Observable<number>;
  @Output('onPageChange') changePage = new EventEmitter();

  private options = {
    skip: 0,
    limit: 50
  };

  private totalCountArr: Array<number> = [];
  private displayCountArr: Array<number> = [];
  private currentPage: number = 1;
  private noOfPages: number = 5;
  private halfNoOfPages: number = Math.floor(this.noOfPages / 2);

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.options.limit = this.limit;
  }

  //Fires when data-bound properties/@Input variable changes (change should be by reference?)
  ngOnChanges(changes) {
    //changes: {currentValue, firstChange, previousValue}
    if (this.count$ instanceof Observable)
      this.count$.subscribe(count => this.constructTotalCountArr(count));
  }

  constructTotalCountArr(count) {
    this.totalCountArr = _.times(Math.floor(count / this.options.limit) || 1, page => Number(++page));
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

    //If view not updated:
    //Try markForCheck first (to include current component in next Angular's change detection)
    this.ref.markForCheck();
    //If does not work, try detectChanges (to immediately run change detection for current component and its children)
    /* this.ref.detectChanges(); */
  }

  jumpToPage(page) {
    this.currentPage = page;
    this.options.skip = (page - 1) * this.options.limit;
    this.constructDisplayCountArr(page)
    this.changePage.emit({
      skip: this.options.skip,
      limit: this.options.limit
    });
  }
}
