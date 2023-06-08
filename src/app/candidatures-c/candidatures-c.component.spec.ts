import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturesCComponent } from './candidatures-c.component';

describe('CandidaturesCComponent', () => {
  let component: CandidaturesCComponent;
  let fixture: ComponentFixture<CandidaturesCComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidaturesCComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidaturesCComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
