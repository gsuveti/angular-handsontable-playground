import {BrowserModule} from '@angular/platform-browser';
import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {HotTableModule} from '@handsontable/angular';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CsvToWorkBookConversionService} from './csv-book-conversion-service';
import {FileToWorkBookConversionService} from './file-to-work-book-conversion-service';
import {XlsxToWorkBookConversionService} from './xlsx-book-conversion-service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HotTableModule.forRoot(),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: FileToWorkBookConversionService,
    useClass: CsvToWorkBookConversionService,
    multi: true
  },
    {
    provide: FileToWorkBookConversionService,
    useClass: XlsxToWorkBookConversionService,
    multi: true
  }],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {
}
