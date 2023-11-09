import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UsersService } from '../../_services/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { NoticyAlertComponent } from '../../../../componets/notifications/noticy-alert/noticy-alert.component';
import { Toaster } from 'ngx-toast-notifications';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent implements OnInit {

  @Input() user_selected: any = null;
  @Output() usersE: EventEmitter<any> = new EventEmitter();

  errorMessage: string;
  isLoading$;
  isLoading = false;

  constructor(
    private _userService: UsersService,
    public modal: NgbActiveModal,
    public toaster: Toaster
  ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
  }

  delete(){
    this._userService.delete(this.user_selected.id)
    .pipe(
      catchError((message) => {
        this.errorMessage = message.error.errors;
        this.toaster.open(NoticyAlertComponent, {text: `danger-'${this.errorMessage}'`});
        return of(undefined);
      })
    ).subscribe((resp:any) => {
      if(resp.status){
        this.toaster.open(NoticyAlertComponent, {text: `primary-'${resp.message}'`});
        this.modal.close();
        this.usersE.emit(this.user_selected);
      }
    });
  }

}
