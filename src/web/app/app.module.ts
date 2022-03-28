import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {environment} from "../environments/environment";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {RouterModule} from "@angular/router";
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidenavComponent } from './sidenav/sidenav.component';
import { MaterialModule } from './shared/material.module';
import {PanelMenuModule} from "primeng/panelmenu";
import {MenuModule} from "primeng/menu";
import {MessageService} from "primeng/api";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BanbeisSharedServicesModule} from "banbeis-shared-services";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {TranslateLoader, TranslateModule} from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import {InputTextModule} from "primeng/inputtext";
import {APOLLO_OPTIONS, ApolloModule} from "apollo-angular";
import {InMemoryCache} from "@apollo/client/core";
import {HttpLink} from "apollo-angular/http";


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: environment.keycloakUrl+'/auth',
        realm: 'banbeis-blog',
        clientId: 'banbeis-web'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    KeycloakAngularModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    PanelMenuModule,
    MenuModule,
    FormsModule,
    ReactiveFormsModule,
    BanbeisSharedServicesModule.forRoot(environment.apiUrl),
    ToolbarModule,
    ButtonModule,
    ApolloModule,
    TranslateModule.forRoot({
      defaultLanguage: 'bn',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }, MessageService,
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink)=>{
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:8081/graphql'
          })
        }
      },
      deps: [HttpLink]
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
