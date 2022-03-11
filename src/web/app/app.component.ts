import {Component, OnInit} from '@angular/core';
import {KeycloakProfile} from "keycloak-js";
import {KeycloakService} from "keycloak-angular";
import {TestService} from "./TestService";
import {Router, RouterModule} from "@angular/router";
import {BreakpointObserver, Breakpoints, BreakpointState} from "@angular/cdk/layout";
import {MenuItem} from "primeng/api";
import {INavigation, NavigationService} from "banbeis-shared-services";
import {Menu} from "primeng/menu";

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
              private breakPointObserver: BreakpointObserver,
              private navigationService: NavigationService){

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

    this.navigationService.getAll().subscribe((navigations)=>{
      this.generateSideMenus(navigations.body!);
    });


  }

  generateSideMenus(navigations: INavigation[]){
    this.items = [];
    this.items.push({
      label: 'Navigation',
      icon: 'pi pi-link',
      routerLink: ['/navigation'],
      routerLinkActiveOptions: {
        exact: true
      },
      expanded: this.checkActiveState('/navigation')
    });

    navigations.forEach((n)=>{
      let menuItem: MenuItem = <MenuItem>{};
      menuItem.label = n.label;
      menuItem.icon = 'pi pi-'+n.icon;
      if(n.route){
        menuItem.routerLink = [n.route];
        menuItem.expanded = this.checkActiveState(n.route);
      }
      menuItem.routerLinkActiveOptions = {
        exact: true
      };
      if(n.submenus.length>0){
        menuItem.items = [];
        n.submenus.forEach((s)=>{
          let submenuItem: MenuItem = <MenuItem>{};
          submenuItem.label = s.label;
          submenuItem.icon = 'pi pi-'+s.icon;
          if(s.route){
            submenuItem.routerLink = [s.route];
            submenuItem.expanded = this.checkActiveState(s.route);
          }
          submenuItem.routerLinkActiveOptions = {
            exact: true
          };
          menuItem.items?.push(submenuItem);
        })
      }
      this.items.push(menuItem);
    });
  }

  checkActiveState(givenLink: string) {
    console.log(this.router.url);
    if (this.router.url.indexOf(givenLink) === -1) {
      return false;
    } else {
      return true;
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
