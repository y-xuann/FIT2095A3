import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketTranslateComponent } from './socket-translate.component';

describe('SocketTranslateComponent', () => {
  let component: SocketTranslateComponent;
  let fixture: ComponentFixture<SocketTranslateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocketTranslateComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocketTranslateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
