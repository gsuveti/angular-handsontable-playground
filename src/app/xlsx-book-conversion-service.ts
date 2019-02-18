import {Observable} from 'rxjs';
import * as XLSX from 'xlsx';
import {FileToWorkBookConversionService} from './file-to-work-book-conversion-service';

export class XlsxToWorkBookConversionService extends FileToWorkBookConversionService {
  public type = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

  public convert(blob: Blob): Observable<XLSX.WorkBook> {
    return Observable.create((observer) => {

      const reader = new FileReader();

      reader.onload = (e: any) => {
        /* read workbook */
        const bstr: string = e.target.result;
        const wb = XLSX.read(bstr, {type: 'buffer'});
        /* grab first sheet */
        observer.next(wb);
        observer.complete();
      };

      reader.readAsArrayBuffer(blob);

    });
  }
}
