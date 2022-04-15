import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";

@Component({
  selector: 'app-common-breadcrumb',
  templateUrl: './common-breadcrumb.component.html',
  styleUrls: ['./common-breadcrumb.component.scss']
})
export class CommonBreadcrumbComponent implements OnInit {

  @Input()
  public breadcrumbItems: MenuItem[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
