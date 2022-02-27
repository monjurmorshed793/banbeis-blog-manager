import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {TestService} from "./TestService";
import {Router, RouterModule} from "@angular/router";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'web';
  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;
  public testMessage: string = '';
  public isScreenSmall?: boolean;

  constructor(private readonly keyalockService: KeycloakService,
              private testService: TestService,
              private router: Router,
              private breakPointObserver: BreakpointObserver){

  }


  async ngOnInit() {

    this.breakPointObserver
      .observe([Breakpoints.XSmall])
      .subscribe((state: BreakpointState)=>{
        this.isScreenSmall = state.matches;
      });

    this.isLoggedIn = await this.keyalockService.isLoggedIn();

    console.log(this.isLoggedIn);
    if(this.isLoggedIn){
      this.userProfile = await this.keyalockService.loadUserProfile();
      this.testService.getTestMessageJson().subscribe((res)=>{
        console.log(res);
        this.testMessage = res.body!.response;
      })
    }else{
      this.login();
    }
  }


  public login(){
    this.keyalockService.login();
  }

  public logout(){
    this.keyalockService.logout();
  }

  public toggleSidenav(){

  }

}
