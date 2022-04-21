import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient: HttpClient) { }

  getUserCount(): Observable<any>{
    return this.httpClient
      .get(environment.apiUrl+'/api/shared/user/total-user', {observe: "response"});
  }

  getAllUsers(): Observable<any>{
    return this.httpClient
      .get(environment.apiUrl+'/api/shared/user/all', {observe: "response"});
  }
}
