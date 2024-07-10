import { Injectable } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from "@angular/material/snack-bar";
import { SnackbarComponent } from "./snackbar.component";

@Injectable({
    providedIn: 'root',
})

export class SnackBarService {
    constructor(
        private _snackBar: MatSnackBar
    ) { }

    openSnackBar(
        message: string,
        isSuccess = true,
        config: MatSnackBarConfig = { duration: 3000, verticalPosition: "top", horizontalPosition: "right"}
        ) {
        config.data = {message: message, isSuccess: isSuccess};

        this._snackBar.openFromComponent(SnackbarComponent, config);
    }
}