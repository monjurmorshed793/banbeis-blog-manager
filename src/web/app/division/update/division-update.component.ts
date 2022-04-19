import { Component, OnInit } from '@angular/core';
import {DivisionService, IDivision} from 'banbeis-shared-services';
import {MenuItem, MessageService} from "primeng/api";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {UpdateComponentImpl} from "../../common/UpdateComponentImpl";

@Component({
  selector: 'app-division-update',
  templateUrl: './division-update.component.html',
  styleUrls: ['./division-update.component.scss']
})
export class DivisionUpdateComponent extends UpdateComponentImpl implements OnInit  {

  override model!: IDivision;
  override modelForm: FormGroup = this.fb.group({
    divisionId: [null],
    name: this.fb.group({
      bangla: [null, [Validators.required]],
      english: [null, [Validators.required]]
    }),
    url: null
  })

  constructor(protected override messageService: MessageService,
              protected override route: ActivatedRoute,
              protected override  fb: FormBuilder,
              protected divisionService: DivisionService) {
    super(messageService, route, fb, divisionService);
  }

  ngOnInit(): void {
    this.breadCrumbItems = [
      {label:'Division', routerLink: '/division'}
    ];

    this.route.queryParams.subscribe((params)=>{
      const divisionId = params['id'];
      if(divisionId){
        this.breadCrumbItems.push({
          label: 'Edit Division',
          routerLink: '/division/edit',
          queryParams: {id: divisionId}
        });
        this.fetchById(divisionId);
      }else{
        this.breadCrumbItems.push({
          label: 'New Division',
          routerLink: '/division/new'
        });
        this.modelForm.reset();
      }
    })
  }


  override convertToFormGroup(division: IDivision): void{
    this.modelForm.reset();
    this.modelForm.patchValue({
      divisionId: division.divisionId,
      name: {
        bangla: division.name.bangla,
        english: division.name.english
      },
      url: division.url
    })
  }



}
