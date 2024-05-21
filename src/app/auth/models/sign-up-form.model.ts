import { FormControl, Validators } from "@angular/forms";

export class SignUpForm {
    email = new FormControl<string>("", [Validators.required, Validators.email]);
    password = new FormControl<string>
        ("", [
            Validators.required,  
            Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
            Validators.minLength(8)]);
    displayName = new FormControl<string>("", [Validators.required, Validators.maxLength(20)]);
    dateOfBirth = new FormControl<Date>(new Date());
    gender = new FormControl<number>(0, Validators.required);
    voivodeship = new FormControl<number>(0, Validators.required);
    acceptTerms = new FormControl<boolean>(false, Validators.requiredTrue);
}