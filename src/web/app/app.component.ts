import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {TestService} from "./TestService";
import {Router, RouterModule} from "@angular/router";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {MenuItem} from "primeng/api";

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
  items: MenuItem[] = [];

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


    this.items = [
      {
        label: 'File',
        icon: 'pi pi-pw pi-file',
        items: [{
          label: 'New',
          icon: 'pi pi-fw pi-plus',
          items: [
            {label: 'User', icon: 'pi pi-fw pi-user-plus'},
            {label: 'Filter', icon: 'pi pi-fw pi-filter'}
          ]
        },
          {label: 'Open', icon: 'pi pi-fw pi-external-link'},
          {separator: true},
          {label: 'Quit', icon: 'pi pi-fw pi-times'}
        ]
      },
      {
        label: 'Edit',
        icon: 'pi pi-fw pi-pencil',
        items: [
          {label: 'Delete', icon: 'pi pi-fw pi-trash'},
          {label: 'Refresh', icon: 'pi pi-fw pi-refresh'}
        ]
      },
      {
        label: 'Help',
        icon: 'pi pi-fw pi-question',
        items: [
          {
            label: 'Contents',
            icon: 'pi pi-pi pi-bars'
          },
          {
            label: 'Search',
            icon: 'pi pi-pi pi-search',
            items: [
              {
                label: 'Text',
                items: [
                  {
                    label: 'Workspace'
                  }
                ]
              },
              {
                label: 'User',
                icon: 'pi pi-fw pi-file',
              }
            ]}
        ]
      },
      {
        label: 'Actions',
        icon: 'pi pi-fw pi-cog',
        items: [
          {
            label: 'Edit',
            icon: 'pi pi-fw pi-pencil',
            items: [
              {label: 'Save', icon: 'pi pi-fw pi-save'},
              {label: 'Update', icon: 'pi pi-fw pi-save'},
            ]
          },
          {
            label: 'Other',
            icon: 'pi pi-fw pi-tags',
            items: [
              {label: 'Delete', icon: 'pi pi-fw pi-minus'}
            ]
          }
        ]
      }
    ];
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
