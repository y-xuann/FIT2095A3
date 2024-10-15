import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatabaseService } from '../database.service';
import io from 'socket.io-client';

@Component({
  selector: 'app-socket-translate',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './socket-translate.component.html',
  styleUrl: './socket-translate.component.css'
})
export class SocketTranslateComponent {
  packages: any[]=[]
  socket: any
  translations= [{ oriText: "", language: "", translated: "" }]
  language :string = ""

  constructor(private db:DatabaseService) {
    this.socket = io('/');
    this.db.getPackage().subscribe((data:any)=>{
      this.packages = data;
    })

    // Set up socket listener once
    this.socket.on('translate', (data: any) => {

      // Add the new translation
      this.translations.push({
        oriText: data.description,
        language: this.language,
        translated: data.translation,
      });
    });
  }

  translate(description:string, language:string) {
      // send a message to the server
      this.socket.emit('translate', { description: description, language: language });
      
      if(language == "ms"){
        this.language = "Malay(ms)"
      } else if(language == "zh-CN"){
        this.language = "Chinese(zh-CN)"
      } else if(language == "hi"){
        this.language = "Hindi(hi)"}

  }


}
