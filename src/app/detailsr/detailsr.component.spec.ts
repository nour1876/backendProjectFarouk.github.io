import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsrComponent } from './detailsr.component';

describe('DetailsrComponent', () => {
  let component: DetailsrComponent;
  let fixture: ComponentFixture<DetailsrComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsrComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
