import { FormControl, Validators } from "@angular/forms";

export class SignUpForm {
    email = new FormControl<string>("", [Validators.required, Validators.email]);
    password = new FormControl<string>("", [Validators.required, Validators.minLength(8)]);
    displayName = new FormControl<string>("", [Validators.required, Validators.maxLength(20)]);
    dateOfBorn = new FormControl<Date>(new Date());
    gender = new FormControl<string>("", Validators.required);
    voivodeship = new FormControl<string>("", Validators.required);
    acceptTerms = new FormControl<boolean>(false, Validators.requiredTrue);
}