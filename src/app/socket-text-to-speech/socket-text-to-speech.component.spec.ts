import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SocketTextToSpeechComponent } from './socket-text-to-speech.component';

describe('SocketTextToSpeechComponent', () => {
  let component: SocketTextToSpeechComponent;
  let fixture: ComponentFixture<SocketTextToSpeechComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SocketTextToSpeechComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SocketTextToSpeechComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
