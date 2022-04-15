import {MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder} from "@angular/forms";

export interface UpdateComponent{
  fetchById: (id:string)=> void;
  convertToFormGroup: (model:any)=> void;
  save: ()=> void;
  onSaveComplete: ()=> void;
  back:()=> void;
}
