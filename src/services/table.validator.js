"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
class ValidateCaption {
    constructor(tableRepo) {
        this.tableRepo = tableRepo;
    }
    createValidator() {
        return (control) => {
            if (!control.valueChanges || control.pristine) {
                return rxjs_1.of(Boolean);
            }
            else {
                return control.valueChanges.pipe(operators_1.debounceTime(300), operators_1.distinctUntilChanged(), operators_1.take(1), operators_1.switchMapTo(this.tableRepo.checkCaptionExists(control.value)), operators_1.tap(() => control.markAsTouched()), operators_1.map((data) => (!data ? { captionExist: true } : false)));
            }
        };
    }
}
exports.ValidateCaption = ValidateCaption;
//# sourceMappingURL=table.validator.js.map