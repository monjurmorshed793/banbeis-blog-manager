import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {INavigation, NavigationService} from "banbeis-shared-services";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  public breadcrumbItems: MenuItem[] = [];
  public navigations: INavigation[] = [];

  constructor(private navigationService: NavigationService,
              private messageService: MessageService,
              private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.setDefaultLang("en");
    this.translate.use("fn");

    this.breadcrumbItems = [
      {label: 'Navigation', routerLink: ['/navigation']}
    ];
    this.getNavigations();
  }


  private getNavigations() {
    this.navigations = [];
    this.navigationService.getAll().subscribe((res) => {
      this.navigations = res.body!;
      let navigation: INavigation = <INavigation>{};
      navigation.label = 'Dashboard';
      navigation.route = '/dashboard';
      navigation.icon = 'building';
      this.navigations.push(navigation);
    });
  }

  updateNavigations(event: Event){
    let sequence = 0;
    this.navigations.forEach(n=>{
      if(n.id){
        sequence+=1;
        n.sequence=sequence;
       this.navigationService.update(n).subscribe();
      }
    });
  }

  deleteNavigation(id: string){
    this.navigationService.delete(id).subscribe((res:any)=>{
      this.messageService.add({
        severity: 'success',
        summary: 'Success',
        detail: 'Successfully deleted.'
      })
      this.getNavigations();
    },
      (error:any) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error in deleting data.'
        })
      });
  }
}
