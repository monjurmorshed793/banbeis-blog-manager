import { Component, OnInit } from '@angular/core';
import {DivisionService, IDivision} from 'banbeis-shared-services';
import {MenuItem, MessageService} from "primeng/api";
import {ListComponentImpl} from "../../common/ListComponentImpl";
import {Router} from "@angular/router";

@Component({
  selector: 'app-division',
  templateUrl: './division.component.html',
  styleUrls: ['./division.component.scss']
})
export class DivisionComponent extends ListComponentImpl implements OnInit {


  constructor(protected override messageService: MessageService,
              protected override router: Router,
              protected divisionService: DivisionService) {
    super(messageService, router, divisionService);
  }

  ngOnInit(): void {
    this.breadcrumbItems = [
      {label: 'Division', routerLink: ['/division']}
    ];

    this.fetchAll();
  }

  downloadPdf(): void{
    this.divisionService.generateReport();
  }

}
