import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailscComponent } from './detailsc.component';

describe('DetailscComponent', () => {
  let component: DetailscComponent;
  let fixture: ComponentFixture<DetailscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
