import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";

function navigationLinkChecker(c: AbstractControl): {[key: string]: boolean} | null{
  if(c.value!==null && c.value.charAt(0)==='/'){
    return {route: true};
  }
  return null;
}

@Component({
  selector: 'app-navigation-update',
  templateUrl: './navigation-update.component.html',
  styleUrls: ['./navigation-update.component.scss']
})
export class NavigationUpdateComponent implements OnInit {
  public breadcrumbItems: MenuItem[] = [];
  public navigationId!: string;
  public navigationForm: FormGroup = this.fb.group({
    id: [null],
    sequence: [null],
    label: [null, Validators.required],
    route: [null, [Validators.required, navigationLinkChecker]],
    icon: [null, [Validators.required]],
    roles: [null, [Validators.required]],
    submenus: this.fb.array([])
  });

  get submenus(): FormArray{
    return this.navigationForm.get('submenus') as FormArray;
  }

  constructor(private messageService: MessageService,
              private route: ActivatedRoute,
              private fb: FormBuilder) { }


  ngOnInit(): void {
    this.breadcrumbItems = [
      {label: 'Navigation', routerLink:'/navigation'}
    ];
    this.route.queryParams.subscribe(params=>{
      this.navigationId = params['id'];
      if(this.navigationId){
        this.breadcrumbItems.push({
          label: 'Edit Navigation',
          routerLink: '/navigation/edit/'+this.navigationId
        });
      }else{
        this.breadcrumbItems.push({
          label: 'New Navigation',
          routerLink: '/navigation/new'
        });
      }
    });
  }

  addSubmenu(){
    // const existingSubmenus =  this.navigationForm.get('submenus') as FormArray;
    // const sequenceNumber = existingSubmenus.length+1;
    const submenuForm = this.fb.group({
      sequence: [],
      label: ['Enter Label', Validators.required],
      route: ['/route', [Validators.required, navigationLinkChecker]],
      icon: ['Enter Icon', [Validators.required]],
      roles: ['Enter Roles', [Validators.required]]
    });

    this.submenus.push(submenuForm);

    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Submenu successfully added'
    });
  }

  deleteSubmenu(submenuIndex: number){
    this.submenus.removeAt(submenuIndex);
    this.messageService.add({
      severity: 'success',
      summary: 'Success',
      detail: 'Submenu successfully removed'
    });
  }

  save(){

  }

}
