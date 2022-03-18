import { Component, OnInit } from '@angular/core';
import {DesignationService} from "banbeis-shared-services";
import {IDesignation} from "banbeis-shared-services/lib/models/designation";
import {MenuItem, MessageService} from "primeng/api";

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.sass']
})
export class DesignationComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  designations!: IDesignation[];

  constructor(private designationService: DesignationService,
              private messageService: MessageService) { }

  ngOnInit(): void {

    this.breadcrumbItems = [
      {label: 'Designation', routerLink: '/designation'}
    ];

    this.fetchAllDesignations();
  }

  fetchAllDesignations(){
    this.designationService.getAll().subscribe((res)=>{
        this.designations = res.body!;
      },
      error => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error in fetching the data.'
        })
      });
  }

  deleteDesignation(id: string){
    this.designationService.delete(id).subscribe({
      complete: ()=>{
        console.log('designation deleted');
      },
      next: ()=> this.fetchAllDesignations(),
      error: ()=> {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error in deleting data'
        });
      }
    })
  }

}
