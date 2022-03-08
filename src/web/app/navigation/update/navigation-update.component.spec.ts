import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationUpdateComponent } from './navigation-update.component';

describe('NavigationUpdateComponent', () => {
  let component: NavigationUpdateComponent;
  let fixture: ComponentFixture<NavigationUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavigationUpdateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavigationUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
