import { Component } from '@angular/core';
import { DatabaseService } from '../database.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-generative-ai',
  standalone: true,
  imports: [],
  templateUrl: './generative-ai.component.html',
  styleUrl: './generative-ai.component.css'
})
export class GenerativeAiComponent {
  socket: any
  packages: any[]=[]
  generatedText:string = ""

  constructor(private db:DatabaseService){
    
    // Initialize the Socket.io connection with the backend
    this.socket = io('/');

    // Fetch packages from the backend using the DatabaseService
    this.db.getPackage().subscribe((data:any)=>{
      this.packages = data;
    })

    // Listen for 'success' events from the backend
    this.socket.on('success', (data: { message: any }) => {
      this.generatedText = data.message;
  });

  }
// Emit 'languageModel' event with destination data to the backend
  calculate(destination:string){
    this.socket.emit('languageModel', {destination: destination})
  }

}
