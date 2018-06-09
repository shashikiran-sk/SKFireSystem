import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule,MatSelectModule,MatButtonModule,MatMenuModule,MatIconModule,MatCardModule,MatFormFieldModule,MatInputModule } from '@angular/material';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports:[
        FormsModule,ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule
    ],
    exports:[
        FormsModule,ReactiveFormsModule,
        BrowserAnimationsModule,
        MatSelectModule,
        MatButtonModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule
    ]
})
export class MyOwnCustomMaterialModule { }