import { Component, OnInit } from '@angular/core';
import {MenuItem, MessageService} from "primeng/api";
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

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
    route: [null, [Validators.required]],
    icon: [null, [Validators.required]],
    roles: [null, [Validators.required]]
  });


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


  save(){

  }

}
