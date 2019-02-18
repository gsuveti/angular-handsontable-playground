import {Observable} from 'rxjs';
import * as XLSX from 'xlsx';

export abstract class FileToWorkBookConversionService {
  public abstract type = null;

  public abstract convert(blob: Blob): Observable<XLSX.WorkBook> ;
}
