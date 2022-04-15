import {ListComponent} from "./ListComponent";
import {MenuItem, MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {CrudService} from "../../../../../banbeis-shared-service/dist/banbeis-shared-services";

export class ListComponentImpl implements ListComponent{
  breadcrumbItems: MenuItem[] = [];
  entities:any[] = [];

  constructor(protected messageService: MessageService,
              protected router: Router,
              protected crudService: CrudService) {
  }

  delete(id: string): void {
    this.crudService.delete(id)
      .subscribe((res)=>{
        this.fetchAll();
      });
  }

  fetchAll(): void {
    this.crudService.getAll().subscribe((response)=>{
      this.entities = response.body!;
    },
      (error=>{
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'Error in fetching data'
        });
      }));
  }

}
