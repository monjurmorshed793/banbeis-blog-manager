import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";

function navigationLinkChecker(c: AbstractControl): {[key: string]: boolean} | null{
  if(c.value!==null && c.value.charAt(0)!=='/'){
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

  private validationMessages: {[key:string]: string} = {
    required: 'The field is required.',
    route: 'Input a valid router. The router must have slash at the beginning'
  };

  public navigationValidationMessage = '';
  public routeValidationMessage = '';
  public iconValidationMessage = '';
  public rolesValidationMessage = '';

  public breadcrumbItems: MenuItem[] = [];
  public navigationId!: string;
  public navigationForm: FormGroup = this.fb.group({
    id: [null],
    sequence: [null],
    label: [null, [Validators.required]],
    route: [null, [Validators.required, navigationLinkChecker]],
    icon: [null, [Validators.required]],
    roles: [null, [Validators.required]],
    submenus: this.fb.array([])
  });


  get submenus(): FormArray{
    return this.navigationForm.get('submenus') as FormArray;
  }

  getSubmenus(): FormArray{
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

    this.validationWatcher();
  }

  private validationWatcher(){
    const labelControl = this.navigationForm.get('label');
    labelControl?.valueChanges.subscribe(value=> this.setValidationMessages(labelControl, 'label'));


    const routeControl = this.navigationForm.get('route');
    routeControl?.valueChanges.pipe(
      debounceTime(10)
    ).subscribe(value=> this.setValidationMessages(routeControl,'route'));

    const iconControl = this.navigationForm.get('icon');
    iconControl?.valueChanges.pipe(
      debounceTime(10)
    ).subscribe(value=> this.setValidationMessages(iconControl,'icon'));

    const roleControl = this.navigationForm.get('roles');
    roleControl?.valueChanges.pipe(
      debounceTime(10)
    ).subscribe(value=> this.setValidationMessages(roleControl,'roles'));
  }

  setValidationMessages(c: AbstractControl, type?: string): void{
    if(type==='label'){
      this.navigationValidationMessage = '';

      if ((c.touched || c.dirty) && c.errors) {
        this.navigationValidationMessage = Object.keys(c.errors).map(
          (key:string) => this.validationMessages[key]).join(' ');
      }
    }
    else if(type==='route'){
      this.routeValidationMessage = '';
      if ((c.touched || c.dirty) && c.errors) {
        this.routeValidationMessage = Object.keys(c.errors).map(
          (key:string) => this.validationMessages[key]).join(' ');
      }
    }
    else if(type==='icon'){
      this.iconValidationMessage = '';
      if ((c.touched || c.dirty) && c.errors) {
        this.iconValidationMessage = Object.keys(c.errors).map(
          (key:string) => this.validationMessages[key]).join(' ');
      }
    }
    else if(type==='roles'){
      this.rolesValidationMessage = '';
      if ((c.touched || c.dirty) && c.errors) {
        this.rolesValidationMessage = Object.keys(c.errors).map(
          (key:string) => this.validationMessages[key]).join(' ');
      }
    }
  }

  addSubmenu(){
    // const existingSubmenus =  this.navigationForm.get('submenus') as FormArray;
    // const sequenceNumber = existingSubmenus.length+1;
    const submenuForm = this.fb.group({
      label: [null, Validators.required],
      route: [null, [Validators.required, navigationLinkChecker]],
      icon: [null, [Validators.required]],
      roles: [null, [Validators.required]]
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


  getSubmenuValidationMessage(submenuIndex: number, controlName: string): string{
    console.log('In validation message');
    const providedSubmenu =  this.navigationForm.get('submenus') as FormArray;
    const providedSubmenuControl = providedSubmenu.get(controlName);
    let validationMessage = '';
    validationMessage = Object.keys(providedSubmenuControl?.errors!).map(
        (key:string) => this.validationMessages[key]).join(' ');
    console.log(validationMessage);
    return validationMessage;
  }

  save(){

  }
}
