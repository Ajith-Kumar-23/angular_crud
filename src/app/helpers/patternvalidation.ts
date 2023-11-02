import { Validators } from "@angular/forms"

export function emailpattern() {
    return [Validators.required, Validators.pattern("^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$")]
}

export function passwordPattern() {
    return [Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[-$#@$_!+=)%~`*?(&^])[A-Za-z\d$@#)$=!+~_`%(*?&^].{7,}')]
}

export function mobilePattern(min: any, max: any) {
    return [Validators.required, Validators.pattern(`([0-9]{${min},${max}})`)]
}

export function namePattern() {
    return [Validators.required, Validators.pattern('^[a-zA-Z ]{3,20}')]
}