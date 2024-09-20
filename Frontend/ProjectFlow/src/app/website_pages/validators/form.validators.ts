import { AbstractControl, FormControl, ValidatorFn } from "@angular/forms";

export class CustomValidators{
    static noSpaceAllowed(control: FormControl){
        if(control.value != null && control.value.indexOf(' ') != -1){
            return {noSpaceAllowed: true}
        }
        return null;
    }

    static matchPasswords(passwordControlName: string, confirmPasswordControlName: string): ValidatorFn {
        return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
          const passwordControl = formGroup.get(passwordControlName);
          const confirmPasswordControl = formGroup.get(confirmPasswordControlName);
    
          if (!passwordControl || !confirmPasswordControl) {
            return null; // Return null if controls are not found
          }
    
          if (confirmPasswordControl.errors && !confirmPasswordControl.errors['passwordMismatch']) {
            return null; // Return if another validator has already found an error
          }
    
          // Check if passwords match
          if (passwordControl.value !== confirmPasswordControl.value) {
            confirmPasswordControl.setErrors({ passwordMismatch: true });
            return { passwordMismatch: true }; // Return an error object
          } else {
            confirmPasswordControl.setErrors(null); // Clear the error if passwords match
          }
    
          return null; // No errors
        };
      }

    static titleValidation(title: string): ValidatorFn {
    return (formGroup: AbstractControl): { [key: string]: boolean } | null => {
        const titleControl = formGroup.get(title);

        if (!titleControl) {
            return null; // Return null if controls are not found
        }

        if (titleControl.errors && !titleControl.errors['titleValidation']) {
            return null; // Return if another validator has already found an error
        }

        // Check if title was set
        if (titleControl.value === 'Title' || titleControl.value === null) {
            titleControl.setErrors({ titleValidation: true });
            return { titleValidation: true }; // Return an error object
        } else {
            titleControl.setErrors(null); // Clear the error if passwords match
        }

        return null; // No errors
    };
    }
}