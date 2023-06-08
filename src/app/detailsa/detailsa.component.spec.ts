import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsaComponent } from './detailsa.component';

describe('DetailsaComponent', () => {
  let component: DetailsaComponent;
  let fixture: ComponentFixture<DetailsaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailsaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
