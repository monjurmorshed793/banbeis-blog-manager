import { Component, OnInit } from '@angular/core';
import {DivisionService, IDivision} from 'banbeis-shared-services';
import {MenuItem, MessageService} from "primeng/api";

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent implements OnInit {

  breadcumbItems: MenuItem[] = [];
  divisions!:IDivision[];

  constructor(private divisionService: DivisionService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.breadcumbItems = [
      {label: 'Division', routerLink: ['/division']}
    ];

    this.divisionService.getAll().subscribe((resposne)=>{
      this.divisions = resposne.body!;
    },
      (error => {
        this.messageService.add({
          severity:'error',
          summary: 'Error',
          detail: 'Error in fetching data'
        });
      }));
  }

}
