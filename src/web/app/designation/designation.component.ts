import {Component, OnDestroy, OnInit} from '@angular/core';
import {DesignationService, AllDesignationResponse} from "banbeis-shared-services";
import {IDesignation} from "banbeis-shared-services/lib/models/designation";
import {MenuItem, MessageService} from "primeng/api";
import {QueryRef} from "apollo-angular";


@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.sass']
})
export class DesignationComponent implements OnInit, OnDestroy {

  breadcrumbItems: MenuItem[] = [];
  designations!: IDesignation[];
  private allDesignationsQuery!: QueryRef<AllDesignationResponse>;

  constructor(private designationService: DesignationService,
              private messageService: MessageService) { }

  ngOnInit(): void {

    this.breadcrumbItems = [
      {label: 'Designation', routerLink: '/designation'}
    ];

    this.fetchAllDesignations();

  }

  fetchAllDesignations(){
    this.allDesignationsQuery = this.designationService.getAllDesignations();
    this.allDesignationsQuery.options.fetchPolicy = "no-cache";
    this.allDesignationsQuery.valueChanges
      .subscribe((data)=>{
        console.log('in the graphql data');
        console.log(data);
        this.designations = data.data.designations;
      });
    // this.allDesignationsQuery.refetch();
  }

  deleteDesignation(id: string){
    const deleteDesignationByIdQuery = this.designationService.deleteDesignation(id);
    deleteDesignationByIdQuery.subscribe((response)=>{
      this.allDesignationsQuery.refetch();
    });
  }

  ngOnDestroy(): void {
  }


}
