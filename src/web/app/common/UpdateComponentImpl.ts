import {UpdateComponent} from "./UpdateComponent";
import {MenuItem, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CrudService} from 'banbeis-shared-services';

export class UpdateComponentImpl implements UpdateComponent{
  model!: any;
  modelForm: FormGroup = this.fb.group({});
  showLoader: boolean = false;
  breadCrumbItems: MenuItem[] = [];
  disableSaveButton = false;


  constructor(protected messageService: MessageService,
              protected route: ActivatedRoute,
              protected fb: FormBuilder,
              protected componentService: CrudService){

  }

  back(): void {
    window.history.back();
  }

  convertToFormGroup(model: any): void {
    // implement it in extended classes
  }

  fetchById(id: string): void {
    this.showLoader = true;
    this.componentService.findById(id).subscribe((res)=>{
        const model = res.body!;
        this.convertToFormGroup(model);
        this.showLoader = false;
    },
      error=>{
        this.showLoader = false;
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'Error in fetching data.'
        });
      });
  }

  onSaveComplete(): void {
    this.modelForm.reset();
    this.back();
  }

  save(): void {
    if(this.modelForm.valid){
      const modelFromForm = {...this.model, ...this.modelForm};
      this.componentService.save(modelFromForm)
        .subscribe({
          next:()=> this.onSaveComplete(),
          error: ()=>{
            this.messageService.add({
              severity: 'error',
              summary: 'Error',
              detail: 'Error in saving data.'
            });
          }
        })
    }else{
      this.messageService.add({
        severity:'error',
        summary: 'Error',
        detail: 'Form is not valid'
      });
    }
  }

}
