import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {INavigation, NavigationService} from "banbeis-shared-services";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public breadcrumbItems: MenuItem[] = [];
  public navigations: INavigation[] = [];

  constructor(private navigationService: NavigationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.breadcrumbItems = [
      {label: 'Navigation', routerLink: ['/navigation']}
    ];

    this.navigationService.getAll().subscribe((res)=>{
      this.navigations = res.body!;
      let navigation:INavigation = <INavigation>{};
      navigation.id='1';
      navigation.label='Dashboard';
      navigation.route='/dashboard';
      navigation.icon='pi pi-building';
      this.navigations.push(navigation);
    });
  }

}
