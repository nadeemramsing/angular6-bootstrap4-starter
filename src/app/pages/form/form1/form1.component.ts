import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { size } from 'lodash';
import { ModalDirective } from 'angular-bootstrap-md';

//RxJS
import { Observable, concat, Subscriber } from 'rxjs';
import { forkJoin } from 'rxjs/observable/forkJoin';
import { concatMap, delay, tap } from 'rxjs/operators';

import { CommentService } from './../../../common/services/comment.service';

@Component({
  selector: 'form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css'],
  providers: [CommentService]
})
export class Form1Component implements OnInit {
  //ViewChild returns first element or directive matching the selector from the view DOM. 
  //If the view DOM changes and a new child matches the selector, the property will be updated.

  //read is optional; tells element of which class should be returned
  @ViewChild('infoBasicModal', { read: ModalDirective }) infoBasicModal: ModalDirective;
  @ViewChild('errorBasicModal', { read: ModalDirective }) errorBasicModal: ModalDirective;

  commentFormGroup: FormGroup;

  nameFormControl: AbstractControl;
  emailFormControl: AbstractControl;
  bodyFormControl: AbstractControl;

  _: Object = { size };

  constructor(
    private fb: FormBuilder,
    private commentService: CommentService
  ) { }

  ngOnInit() {
    //FormGroup init
    //[controlsConfig, ...extra: ValidatorFn || AsyncValidatorFn] <- ~FormGroup
    this.commentFormGroup = this.fb.group({
      'name': ['Ramsing', Validators.compose([Validators.minLength(10), customValidator])],
      'email': ['nadeem.ramsing@chb-technologies.ch'],
      'body': [],
    });

    //FormControl init
    this.nameFormControl = this.commentFormGroup.controls['name'];
    this.emailFormControl = this.commentFormGroup.controls['email'];
    this.bodyFormControl = this.commentFormGroup.controls['body'];
  }

  postComment() {
    const showModal = modal => Observable.create(subscriber => subscriber.next(
      this[modal].show()
    ));

    const hideModal = modal => Observable.create(subscriber => subscriber.next(
      this[modal].hide()
    ));

    this.commentService.postComment(this.commentFormGroup.value)
      .pipe(
        tap(comments => console.log(comments)),
        //using concat
        //NOT an operator => needs to be executed 
        //(observable) => concat(showInfoModal),

        //using concatMap
        //~async.waterfall
        //cleaner
        concatMap(() => showModal('infoBasicModal')),
        delay(2500),
        concatMap(() => hideModal('infoBasicModal'))
      )
      .subscribe({
        next:
          value => { },
        error:
          err => showModal('errorBasicModal')
            .pipe(
              delay(2500),
              concatMap(() => hideModal('errorBasicModal'))
            )
            .subscribe()
      });
  }

}

/* HELPER FUNCTIONS */
function customValidator(control: FormControl): ValidationErrors {
  let name = control.value || '';

  if (name.toLocaleLowerCase() === 'nadeem')
    return {
      custom: 'Nadeem'
    }

  return null;

}
