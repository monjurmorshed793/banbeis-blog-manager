import { Component, OnInit } from '@angular/core';
import {INavigation, NavigationService} from "banbeis-shared-services";
import {MenuItem, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-navigation-detail',
  templateUrl: './navigation-detail.component.html',
  styleUrls: ['./navigation-detail.component.scss']
})
export class NavigationDetailComponent implements OnInit {

  public breadcrumbItems: MenuItem[] = [];
  public navigation?: INavigation;

  constructor(private navigationService:NavigationService,
              private route: ActivatedRoute,
              private messageService:MessageService ) { }

  ngOnInit(): void {
    this.breadcrumbItems = [
      {label: 'Navigation', routerLink:'/navigation'},
    ];

    this.route.queryParams.subscribe(params=>{
      const navigationId = params['id'];
      if(navigationId){
        this.breadcrumbItems.push({label: 'Navigation Detail', routerLink: '/navigation/detail', queryParams: {id: navigationId}});
        this.navigationService.find(navigationId)
          .subscribe((res)=>{
            this.navigation = res.body!;
          },
            (error)=>{
              this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error in fetching navigation data.'
              });
            });
      }
    });
  }

  back(){
    window.history.back();
  }

}
