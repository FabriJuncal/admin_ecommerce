import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../_services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { Observable } from 'rxjs';
import { EditUsersComponent } from '../components/edit-users/edit-users.component';
import { DeleteUserComponent } from '../components/delete-user/delete-user.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  isLoading$: Observable<boolean>;
  isLoading = false;
  totalPages = 1;
  currentPage = 1;

  state: string;
  search: string;

  users: any = [];

  constructor(
    private fb: FormBuilder,
    private _userService: UsersService,
    private modelService: NgbModal
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this._userService.isLoading$;
    this.allUsers();
  }

  allUsers(page = 1){
    this._userService.allUsers(page, this.state, this.search)
    .subscribe((resp:any) => {
      console.log(resp);
      this.users = resp.users.data;
      this.totalPages = resp.total;
      this.currentPage = page; 
    })
  }

  reset(){
    this.state = '';
    this.search = '';
    this.allUsers()
  }

  addUser(){
    const modalRef = this.modelService.open(AddUsersComponent, {centered: true, size: 'md'});
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )

    modalRef.componentInstance.usersE.subscribe((resp:any) => {
      this.users.unshift(resp);
    });
  }

  loadPage(index){
    this.allUsers(index);
  }

  editUser(user){
    const modalRef = this.modelService.open(EditUsersComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )

    modalRef.componentInstance.usersE.subscribe((resp:any) => {
      const INDEX = this.users.findIndex(user => user.id === resp.id);
      this.users[INDEX] = resp;
    });
  }

  delete(user){
    const modalRef = this.modelService.open(DeleteUserComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.user_selected = user;
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )

    modalRef.componentInstance.usersE.subscribe((resp:any) => {
      const INDEX = this.users.findIndex(user => user.id === resp.id);
      this.users.splice(INDEX, 1);
    });
  }

}
