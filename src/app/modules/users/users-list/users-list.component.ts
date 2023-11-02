import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UsersService } from '../_services/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersComponent } from '../components/add-users/add-users.component';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private _userService: UsersService,
    private modelService: NgbModal
    ) { }

  ngOnInit(): void {
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

}
