import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {debounceTime} from "rxjs";
import {INavigation, NavigationService, IconService} from "banbeis-shared-services";
import {EventData} from "@angular/cdk/testing";

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
  public updatedSubmenus: INavigation[] = [];
  public icons: string[] = [];
  public filteredIcons: string[] = [];

  public breadcrumbItems: MenuItem[] = [];
  public navigationId!: string;
  public navigation?: INavigation;
  public navigationForm: FormGroup = this.fb.group({
    id: [null],
    sequence: [null],
    label: [null, [Validators.required]],
    route: [null],
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
              private fb: FormBuilder,
              private navigationService: NavigationService,
              private iconService: IconService) { }


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
        this.fetchNavigation(this.navigationId);
      }else{
        this.breadcrumbItems.push({
          label: 'New Navigation',
          routerLink: '/navigation/new'
        });
      }
    });

    this.icons = this.iconService.getIcons();
    console.log(this.icons);
  }

  fetchNavigation(id: string){
    this.navigationService.find(id).subscribe((res)=>{
      this.navigation = res.body!;
      this.convertToReactiveForm(this.navigation);
    });
  }

  filterIcons(event:any){
    let filtered: string[] = [];
    let query = event.query;
    console.log('in the filter icons');
    for(let i=0; i< this.icons.length; i++){
      let icon = this.icons[i];
      if(icon.toLocaleLowerCase().indexOf(query.toLowerCase()) == 0){
        filtered.push(icon);
      }
    }
    this.filteredIcons = filtered;
    console.log(this.filteredIcons);
  }

  convertToReactiveForm(navigation: INavigation){
    console.log(navigation);
    this.navigationForm.reset();
    this.navigationForm.patchValue({
      id: navigation.id,
      label: navigation.label,
      route: navigation.route,
      icon: navigation.icon,
      roles: navigation.roles,
      submenus: navigation.submenus
    });
    this.navigationForm.setControl('submenus',this.submenus);
    this.convertArrayToReactiveFormsArray(navigation);
  }

  convertArrayToReactiveFormsArray(navigation: INavigation){
    navigation.submenus.forEach((n)=>{
      const submenuForm = this.fb.group({
        label: [n.label, Validators.required],
        route: [n.route, [Validators.required, navigationLinkChecker]],
        icon: [n.icon, [Validators.required]],
        roles: [n.roles, [Validators.required]]
      });

      this.submenus.push(submenuForm);
    });
  }


  addSubmenu(){
    // const existingSubmenus =  this.navigationForm.get('submenus') as FormArray;
    // const sequenceNumber = existingSubmenus.length+1;
    const submenuForm = this.fb.group({
      sequence: [null],
      label: [null, Validators.required],
      route: [null, [Validators.required, navigationLinkChecker]],
      icon: [null, [Validators.required]],
      roles: [null, [Validators.required]]
    });

    this.submenus.push(submenuForm);
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
    if(this.navigationForm.valid){
        const navigation = {...this.navigation, ...this.navigationForm.value};
        console.log(navigation);
        if(!navigation.id){
            this.navigationService.create(navigation)
              .subscribe({
              next: ()=> this.onSaveComplete(),
              error: err=> this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error in saving data.'
              })
              })
        }else{
          this.navigationService.update(navigation)
            .subscribe({
              next: ()=> this.onSaveComplete(),
              error: err => this.messageService.add({
                severity: 'error',
                summary: 'Error',
                detail: 'Error in updating data.'
              })
            })
        }
    }else{
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'The form is not yet complete.'
      });
    }
  }

  public detectRowIndexChange($event: Event, formControl: AbstractControl[]){
    let submenuSequence = 0;
    formControl.forEach((f)=>{
      submenuSequence+=1;
      f.patchValue('sequence', submenuSequence);
    });
  }


  onSaveComplete(){
    this.navigationForm.reset();
    this.back();
  }

  back(){
    window.history.back();
  }
}
