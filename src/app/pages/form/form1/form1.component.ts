import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { size } from 'lodash';

@Component({
  selector: 'form1',
  templateUrl: './form1.component.html',
  styleUrls: ['./form1.component.css']
})
export class Form1Component implements OnInit {
  commentFormGroup: FormGroup;

  nameFormControl: AbstractControl;
  emailFormControl: AbstractControl;
  bodyFormControl: AbstractControl;

  _: Object = { size };

  constructor(private fb: FormBuilder) { }

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
    console.log('valid');
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
