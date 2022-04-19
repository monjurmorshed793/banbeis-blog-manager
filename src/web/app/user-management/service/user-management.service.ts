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
      .get(environment.keycloakUrl+'/auth/admin/banbeis-blog/users', {observe: "response"});
  }
}
