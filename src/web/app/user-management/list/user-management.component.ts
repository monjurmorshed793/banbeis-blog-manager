import { Component, OnInit } from '@angular/core';
import {UserManagementService} from "../service/user-management.service";

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  constructor(private userManagementService: UserManagementService) { }

  ngOnInit(): void {
    this.userManagementService.getUserCount().subscribe((res)=>{
      console.log(res);
    });

    this.userManagementService.getAllUsers().subscribe((res)=>{
      console.log(res.body);
    });
  }

}
