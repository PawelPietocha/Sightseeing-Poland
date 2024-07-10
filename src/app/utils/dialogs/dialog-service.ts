import { Injectable, Injector } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { ConfirmDialogComponent } from "./confirm-dialog/confirm-dialog.component";

@Injectable({
    providedIn: 'root',
})

export class DialogService {
    constructor(
        public dialog: MatDialog,
        private injector: Injector,
    ) { }


    openConfirmDialog(question: string): Observable<boolean> {
        const dialogRef = this.dialog.open(ConfirmDialogComponent, {
            maxHeight: '900px',
            maxWidth: '500px',
            minWidth: '300px',
            injector: this.injector
        });

        dialogRef.componentInstance.title = "Potwierdzenie";
        dialogRef.componentInstance.question = question;

        return dialogRef.afterClosed();
    }
}