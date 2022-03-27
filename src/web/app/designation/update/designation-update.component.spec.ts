import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationUpdateComponent } from './designation-update.component';

describe('DesignationUpdateComponent', () => {
  let component: DesignationUpdateComponent;
  let fixture: ComponentFixture<DesignationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesignationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
