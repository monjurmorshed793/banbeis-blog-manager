import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {KeycloakService} from "keycloak-angular";
import {environment} from "../../environments/environment";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

  @Output()
  toggleSidenav = new EventEmitter<void>();

  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
  }

  gotoProfile(): void{
    this.keycloakService.getKeycloakInstance().accountManagement();
  }

  logout(): void{
    this.keycloakService.logout();
  }

}
