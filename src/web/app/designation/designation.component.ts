import { Component, OnInit } from '@angular/core';
import {DesignationService, AllDesignationsGqlService, AllDesignationResponse} from "banbeis-shared-services";
import {IDesignation} from "banbeis-shared-services/lib/models/designation";
import {MenuItem, MessageService} from "primeng/api";
// import {Apollo, gql} from "apollo-angular";
import {map, Subscription} from "rxjs";
import {QueryRef} from "apollo-angular";

// const GET_DESIGNATIONS = gql`
//     query allDesignations{
//       allDesignations{
//         id
//         name
//         shortName
//         grade
//         bn{
//           name
//           shortName
//         }
//       }
//     }
// `;

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.sass']
})
export class DesignationComponent implements OnInit {

  breadcrumbItems: MenuItem[] = [];
  designations!: IDesignation[];
  private allDesignationsQuery!: QueryRef<AllDesignationResponse>;

  constructor(private designationService: DesignationService,
              private messageService: MessageService,
              private allDesignationsGQL: AllDesignationsGqlService) { }

  ngOnInit(): void {

    this.breadcrumbItems = [
      {label: 'Designation', routerLink: '/designation'}
    ];

    this.fetchAllDesignations();

  }

  fetchAllDesignations(){
    this.allDesignationsQuery = this.allDesignationsGQL.watch();
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
    this.designationService.delete(id).subscribe({
      complete: ()=>{
        console.log('designation deleted');
      },
      next: ()=> this.allDesignationsQuery.refetch(),
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
