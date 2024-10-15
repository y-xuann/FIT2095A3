import { Component , ChangeDetectorRef} from '@angular/core';
import io from 'socket.io-client';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-socket-text-to-speech',
  standalone: true,
  imports: [],
  templateUrl: './socket-text-to-speech.component.html',
  styleUrl: './socket-text-to-speech.component.css'
})
export class SocketTextToSpeechComponent {
  drivers:any[]=[]
  driverLicense=""
  socket: any
  audioFile: string | null = null; // Variable to store the audio file URL

  constructor(private db:DatabaseService, private cdr: ChangeDetectorRef){
    this.socket = io('/');
    this.db.getDriver().subscribe((data:any)=>{
      this.drivers = data;
    })

    this.socket.on('convert', (data: { audioFile: any; }) => {
      // Handle the playback of the audio file here
      this.audioFile = data.audioFile
      this.cdr.detectChanges(); // Manually trigger change detection
  });
  }

  convert(driverLicense:string){
    this.audioFile = null
    this.driverLicense = driverLicense
    this.socket.emit('convert', {text: driverLicense})
  }

}
