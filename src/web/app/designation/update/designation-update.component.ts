import { Component, OnInit } from '@angular/core';
import {DesignationService} from "banbeis-shared-services";
import {MenuItem, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {IDesignation} from "banbeis-shared-services/lib/models/designation";
import {QueryRef} from "apollo-angular";

@Component({
  selector: 'app-designation-update',
  templateUrl: './designation-update.component.html',
  styleUrls: ['./designation-update.component.sass']
})
export class DesignationUpdateComponent implements OnInit {

  disableSaveButton = false;
  breadcrumbItems: MenuItem[] = [];
  designation!:IDesignation;
  designationForm: FormGroup = this.fb.group({
    id: [null],
    name: [null, [Validators.required]],
    shortName: [null, [Validators.required]],
    grade: [null, [Validators.required]],
    bn: this.fb.group({
      name: [null, [Validators.required]],
      shortName: [null, [Validators.required]]
    })
  });

  constructor(private designationService: DesignationService,
              private messageService: MessageService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.breadcrumbItems = [
      {label: 'Designation', routerLink:'/designation'}
    ];

    this.route.queryParams.subscribe((params)=>{
      const designationId = params['id'];
      if(designationId){
        this.breadcrumbItems.push({
          label:'Edit Designation',
          routerLink: '/designation/edit/'+designationId
        });
        this.fetchDesignation(designationId);
      }else{
        this.breadcrumbItems.push({
          label:'New Navigation',
          routerLink: '/designation/new'
        });
      }
    });
  }

  fetchDesignation(designationId: string): void{
    const designationQuery: QueryRef<any> = this.designationService.getDesignationById(designationId);
    designationQuery.valueChanges
      .subscribe((response)=>{
        this.designation = response.data.designation;
        console.log(response);
        this.convertToFormGroup(this.designation);
      });
    designationQuery.refetch();
  }

  convertToFormGroup(designation: IDesignation): void{
    this.designationForm.reset();
    this.designationForm.patchValue({
      id: designation.id,
      name: designation.name,
      shortName: designation.shortName,
      grade: designation.grade,
      bn: {
        name: designation.bn.name,
        shortName: designation.bn.shortName
      }
    });
  }

  save(){
    if(this.designationForm.valid){
      this.disableSaveButton = true;
      const designation: IDesignation = {...this.designation, ...this.designationForm.value};
      if(designation.id){
        const updateQuery = this.designationService.updateDesignation(designation);
        updateQuery.subscribe({
          next: ()=> this.onSaveComplete(),
          error: ()=> {
            this.disableSaveButton = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error in saving the data'
            });
          }
        })
      }else{
        const saveDesignationQuery = this.designationService.createDesignation(designation);
        saveDesignationQuery.subscribe((response)=>{
          this.onSaveComplete();
        },
          error=>{
            this.disableSaveButton = false;
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error in saving the data'
            });
          });
      }
    }else{
      this.messageService.add({
        severity:'error',
        summary: 'Invalid',
        detail: 'Please complete required fields'
      });
    }
  }

  onSaveComplete():void{
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Data successfully saved'
    });
    setTimeout(()=>{
      this.back();
    }, 500);
  }

  back(){
    window.history.back();
  }
}
