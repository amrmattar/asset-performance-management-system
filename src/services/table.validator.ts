import { ValidationErrors, AbstractControl } from '@angular/forms';
import { TablesRepository } from '../app/data/tables.repository';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, take, switchMapTo, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ValidateCaption {
  constructor(private tableRepo: TablesRepository) {
  }
  public createValidator() {
    return (control: AbstractControl): Observable<ValidationErrors | Boolean> => {
      if (!control.valueChanges || control.pristine) {
        return of(Boolean);
      } else {
        return control.valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          take(1),
          switchMapTo(this.tableRepo.checkCaptionExists(control.value)),
          tap(() => control.markAsTouched()),
          map((data) => (!data ? { captionExist: true } : false))
        );
      }
    };
  }
}
