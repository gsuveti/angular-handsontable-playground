import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as XLSX from 'xlsx';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {style} from './canvas-datagrid-style';
import {FileToWorkBookConversionService} from './file-to-work-book-conversion-service';
import {switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  data;
  $gridData: BehaviorSubject<any> = new BehaviorSubject([]);
  @ViewChild('grid') gridRef: ElementRef;
  url = '';
  file: any = {};

  constructor(private http: HttpClient,
              @Inject(FileToWorkBookConversionService) private fileToWorkBookConversionServices: FileToWorkBookConversionService[]) {

  }

  ngOnInit(): void {
    const cDg = this.gridRef.nativeElement;
    cDg.style = style;
    this.$gridData.subscribe(data => {
      cDg.data = data;
    });

    this.fetchData('/assets/FE52488DD343407A94B2D35CBB62BAAC.xlsx').pipe(this.convertToWorkBook()).subscribe(this.displayData());
  }


  onSubmit() {
    this.fetchData(this.url).pipe(this.convertToWorkBook()).subscribe(this.displayData());
  }

  convertToWorkBook() {
    return switchMap((blob: Blob) => {
      const conversionService = this.fileToWorkBookConversionServices.find(service => service.type === blob.type);
      return conversionService ? conversionService.convert(blob) : of(null);
    });
  }

  displayData() {
    return (wb: XLSX.WorkBook) => {
      if (wb) {
        const wsname: string = wb.SheetNames[0];
        const ws: XLSX.WorkSheet = wb.Sheets[wsname];

        this.data = XLSX.utils.sheet_to_json(ws, {header: 1});
        this.$gridData.next(XLSX.utils.sheet_to_json(ws, {header: 'A'}));
      }
    };
  }

  onUpload() {
    of(this.file).pipe(this.convertToWorkBook()).subscribe(this.displayData());
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      this.file = file;
    }
  }

  private fetchData(url: string): Observable<Blob> {
    return this.http.get(url, {responseType: 'blob'});
  }
}
