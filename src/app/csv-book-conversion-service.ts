import {Observable} from 'rxjs';
import * as XLSX from 'xlsx';
import {FileToWorkBookConversionService} from './file-to-work-book-conversion-service';

export class CsvToWorkBookConversionService extends FileToWorkBookConversionService {
  type = 'text/csv';

  public convert(blob: Blob): Observable<XLSX.WorkBook> {
    return Observable.create((observer) => {

      const reader = new FileReader();
      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb: XLSX.WorkBook = XLSX.read(bstr, {type: 'binary'});
        observer.next(wb);
        observer.complete();
      };
      reader.readAsText(blob);
    });
  }
}
