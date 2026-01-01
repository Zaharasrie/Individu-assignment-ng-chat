
import { Component, effect, inject, signal } from '@angular/core';
import { AuthService } from '../../services/auth.service'; 
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ChatService } from '../../supabase/chat.service';
import { Ichat } from '../../interface/chat-response';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css'
})
export class ChatComponent {
  
  private auth = inject(AuthService);
   private chat_service = inject(ChatService);
  private rourter = inject(Router);
 
  private fb = inject(FormBuilder);
  chats = signal<Ichat[]>([])

  chatForm!: FormGroup

  constructor() {
    this.chatForm = this.fb.group({
      chat_message: ['', Validators.required]
    });
    
    effect(() => {
      this.onListChat()
    });
  }
  
  async logout() {
    this.auth.signOut()
    .then (() => {
      this.rourter.navigateByUrl('/login'); 
    })
  }
  onsubmit() {
    const formValue = this.chatForm.value.chat_message
    console.log(formValue);

    this.chat_service.chatMessages(formValue).then((res) => {
      console.log( res);
      this.chatForm.reset();
    }).catch((err) => {
      alert(err.message);
    });
  }

  onListChat() {

    this.chat_service.listChat().then((res: Ichat[] | null) => {
      console.log( res);
      if(res !== null){
        this.chats.set(res)
      } else {
        console.log("No messages found");
      }
      
    })
    .catch((err) => {
      alert(err.message);
    });
  }
}
