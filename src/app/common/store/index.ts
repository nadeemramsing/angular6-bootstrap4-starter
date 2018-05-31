import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { commentReducer } from './comment/comment.reducer';

@NgModule({
    imports: [
        StoreModule.forRoot({ 'commentState': commentReducer })
    ],
    providers: [],
    declarations: [],
    exports: []
})

export class CoreStoreModule { };