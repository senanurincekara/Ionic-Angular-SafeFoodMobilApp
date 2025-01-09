import { Component, inject, OnInit } from '@angular/core';
import { GeminiService } from '../../service/gemini/gemini.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  userMessage: string = '';
  chatHistory: { from: string; message: string }[] = [];
  loading: boolean = false;

  geminiService: GeminiService = inject(GeminiService);

  constructor() {
    // Mesaj geçmişini dinle
    this.geminiService.getMessageHistory().subscribe((history) => {
      if (history) {
        this.chatHistory = history; // Geçmişi güncelle
      }
    });
  }

  ngOnInit() {
    // Sayfa yüklendiğinde geçmişi al
    this.geminiService.getMessageHistory().subscribe((history) => {
      this.chatHistory = history;
    });
  }

  async sendMessage() {
    if (this.userMessage && !this.loading) {
      this.loading = true;
      const data = this.userMessage;
      this.userMessage = '';
      await this.geminiService.generateText(data);
      this.loading = false;
    }
  }

  formatText(text: string) {
    const result = text.replaceAll('*', '');
    return result;
  }
}
