import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// creamos un validador para comprobar si el campo contraseña y repetir contraseña coinciden
export const matchPassword : ValidatorFn = (control: AbstractControl): ValidationErrors|null => {

    let password = control.get('password');
    let confirmPassword = control.get('confirmPassword');

    if(password && confirmPassword && password?.value !== confirmPassword?.value){
        return {
            passwordmatcherror: true
        }
    }

    return null;
}