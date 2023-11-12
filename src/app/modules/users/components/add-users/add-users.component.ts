import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { UsersService } from '../../_services/users.service';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Toaster } from 'ngx-toast-notifications';
import { NoticyAlertComponent } from '../../../../componets/notifications/noticy-alert/noticy-alert.component';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.scss']
})
export class AddUsersComponent implements OnInit {

  @Output() usersE: EventEmitter<any> = new EventEmitter();

  errorMessage: string;
  isLoading$;
  isLoading = false;
  validatePassword = true;

  formGroup: FormGroup

  constructor(
    private fb: FormBuilder,
    private _userService: UsersService,
    public modal: NgbActiveModal,
    public toaster: Toaster
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.loadForm();
  }

  // convenience getter for easy access to form fields
  // get f() {
  //   return this.formGroup.controls;
  // }

  loadForm(){
    this.formGroup = this.fb.group({
      name: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      surname: [null, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      email: [null, Validators.compose([Validators.required, Validators.email, Validators.maxLength(255)])],
      role_id: ['0', this.isControlRoleId],
      password: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255)])],
      cpassword: [null, Validators.compose([Validators.required, Validators.minLength(8), Validators.maxLength(255)])],
      type_user: ['2']
    });
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation: string, controlName: string) {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }

  isControlRoleId(control: FormControl){
    const selectedRole = control.value;
    if(selectedRole === '0'){
      return { roleIdInvalid: true};
    }

    return null;
  }

  validateConfirmPassword() {
    return this.formGroup.value.password === this.formGroup.value.cpassword
  }
  

  save(){
    if(!this.validateConfirmPassword()){
      this.validatePassword = false;
      return;
    }

    this._userService.registration(this.formGroup.value)
    .pipe(
      catchError((message) => {
        this.errorMessage = message.error.errors;
        this.toaster.open(NoticyAlertComponent, {text: `danger-${this.errorMessage}`});
        return of(undefined);
      })
    ).subscribe((resp:any) => {
      if(resp.status){
        this.toaster.open(NoticyAlertComponent, {text: `primary-${resp.message}`});
        this.modal.close();
        this.usersE.emit(resp.user);
      }
    });

  }

}
