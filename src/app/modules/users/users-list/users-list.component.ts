import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../_services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../components/add-users/add-users.component';
import { Observable } from 'rxjs';

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

  addUser(){
    const modalRef = this.modelService.open(AddUsersComponent, {centered: true, size: 'md'});
    modalRef.result.then(
      () => {

      },
      () => {
        
      }
    )
  }

  loadPage(index){
    this.allUsers(index);
  }

  editUser(user){
    
  }

  delete(user){
    
  }

}
