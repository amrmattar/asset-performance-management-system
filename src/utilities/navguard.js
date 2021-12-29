"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class NavGuard {
    constructor(repo, confirmDialogService) {
        this.repo = repo;
        this.confirmDialogService = confirmDialogService;
    }
    canActivate(route, state) {
        throw new Error("Method not implemented.");
    }
    canDeactivate(component, route, state) {
        // you can just return true or false synchronously
        if (this.repo.editsOn === true) {
            console.log(this.repo.editsOn);
            return true;
        }
        // or, you can also handle the guard asynchronously, e.g.
        // asking the user for confirmation.
        // return component.dialogService.confirm('Discard changes?');
        // new ModalConfirmComponent(this.confirmDialogService).openModal();
        this.showDialog();
    }
    showDialog() {
        this.confirmDialogService.confirmThis("Are you sure to delete?", function () {
            alert("Yes clicked");
        }, function () {
            alert("No clicked");
        });
    }
}
exports.NavGuard = NavGuard;
//# sourceMappingURL=navguard.js.map