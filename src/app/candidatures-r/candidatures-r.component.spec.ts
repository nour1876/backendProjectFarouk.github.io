import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidaturesRComponent } from './candidatures-r.component';

describe('CandidaturesRComponent', () => {
  let component: CandidaturesRComponent;
  let fixture: ComponentFixture<CandidaturesRComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CandidaturesRComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidaturesRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
