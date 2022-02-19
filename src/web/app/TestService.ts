import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

export interface ITestData{
  response: string;
}

@Injectable({providedIn: 'root'})
export class TestService{



  constructor(private http: HttpClient) {
  }

  getTestMessage(): Observable<HttpResponse<string>>{
    return this.http.get<string>("http://localhost:8081/hello", {observe: 'response'});
  }

  getTestMessageJson(): Observable<HttpResponse<ITestData>>{
    return this.http.get<ITestData>("http://localhost:8081/hello/test", {observe: 'response'});
  }
}
