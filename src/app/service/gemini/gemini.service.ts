// import { Injectable } from '@angular/core';
// import { GoogleGenerativeAI } from '@google/generative-ai';
// import { BehaviorSubject, Observable } from 'rxjs';

// /*
//   Levenshtein mesafesi ile en yakın 
//   kelimeyi bulmak için bir yardımcı fonksiyon
// */


// /*
//   Levenshtein Mesafesi: Kullanıcı bir kelimeyi yanlış yazdığında, 
//   kelimenin doğru olup olmadığını kontrol eder. Eğer yanlışsa,
//   gıdaAnaliziSoruları içerisindeki en yakın kelimeyi bulur
//   ve bunu düzeltir.
//   Kelime Düzeltme: Kullanıcı tarafından yanlış yazılmış kelimeler düzeltilerek AI modeline gönderilir.
// */


// function getLevenshteinDistance(a: string, b: string) {
//   const matrix = Array(a.length + 1)
//     .fill(null)
//     .map(() => Array(b.length + 1).fill(null));

//   for (let i = 0; i <= a.length; i += 1) {
//     matrix[i][0] = i;
//   }

//   for (let j = 0; j <= b.length; j += 1) {
//     matrix[0][j] = j;
//   }

//   for (let i = 1; i <= a.length; i += 1) {
//     for (let j = 1; j <= b.length; j += 1) {
//       const indicator = a[i - 1] === b[j - 1] ? 0 : 1;
//       matrix[i][j] = Math.min(
//         matrix[i][j - 1] + 1, 
//         matrix[i - 1][j] + 1, 
//         matrix[i - 1][j - 1] + indicator
//       );
//     }
//   }

//   return matrix[a.length][b.length];
// }

// function findClosestMatch(input: string, possibleWords: string[]) {
//   let closestWord = '';
//   let minDistance = Infinity;

//   for (const word of possibleWords) {
//     const distance = getLevenshteinDistance(input, word);
//     if (distance < minDistance) {
//       minDistance = distance;
//       closestWord = word;
//     }
//   }

//   return closestWord;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class GeminiService {
//   private generativeAI: GoogleGenerativeAI;
//   private messageHistory: BehaviorSubject<any> = new BehaviorSubject(null);

//   constructor() {
//     this.generativeAI = new GoogleGenerativeAI('AIzaSyD8xvUlZ7WQ4ZxcTZmh-IHmnVBqIwk3o3s');
//   }

//   async generateText(prompt: string) {
//     const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });
//     this.messageHistory.next({
//       from: 'user',
//       message: prompt,
//     });

//     const gıdaAnaliziSoruları = [
//       'tağşiş',
//       'tarım',
//       'orman bakanlığı',
//       'bakanlık',
//       'gıda analizi',
//       'merhaba',
//       'nasılsın',
//       'gıda içerik analizi',
//       'gıda soruları',
//       'beslenme',
//       'yiyecek',
//       'içerik',
//       'gıda',
//       'yemek',
//       'protein',
//       'karbonhidrat',
//       'yağ',
//       'vitamin',
//       'doğmuş yağ',
//       'kalsiyum karbonat',
//       'riboflavin',
//       'saklama koşulları',
//       'koruyucu ve katkı maddeleri',
//       'besin',
//       'porsiyon',
//       'kalori',
//       'ürün',
//       'Glüten',
//       'Kolesterol',
//       'Lif',
//       'sembol',
//       'analiz',
//       'bilgi',

//     ];

//     /* Kullanıcının yazdığı metindeki 
//     kelimeleri düzeltme işlemi*/
//     const words = prompt.split(' ');
//     const correctedWords = words.map((word) => {
//       return findClosestMatch(word.toLowerCase(), gıdaAnaliziSoruları) || word;
//     });

//     const correctedPrompt = correctedWords.join(' ');

//     const isGidaAnaliziSoru = gıdaAnaliziSoruları.some((soru) =>
//       correctedPrompt.toLowerCase().includes(soru)
//     );

//     let text: string;

//     if (isGidaAnaliziSoru) {
//       const result = await model.generateContent(correctedPrompt);
//       const response = await result.response;
//       text = response.text();
//     } else {
//       text = 'Lütfen bana sadece gıda ile ilgili soru sorunuz. Örnek: Gıdalarda hangi vitaminler bulunur?';
//     }

//     console.log(text);
//     this.messageHistory.next({
//       from: 'bot',
//       message: text,
//     });
//   }

//   public getMessageHistory(): Observable<any> {
//     return this.messageHistory.asObservable();
//   }
// }

import { Injectable } from '@angular/core';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeminiService {
  private generativeAI: GoogleGenerativeAI;
  private messageHistory: BehaviorSubject<{ from: string; message: string }[]> = new BehaviorSubject<{ from: string; message: string }[]>([]);

  constructor(private http: HttpClient) {
    this.generativeAI = new GoogleGenerativeAI(environment.googleGenerativeAIKey);
    this.showWelcomeMessage(); 
  }

  // Ekran açıldığında otomatik mesaj gösterme
  private showWelcomeMessage() {
    const welcomeMessage = 'Merhaba ben senin gıda rehberinim. Bana beslenme ile alakalı tüm sorularını sorabilirsin.';
    this.messageHistory.next([...this.messageHistory.getValue(), { from: 'bot', message: welcomeMessage }]);
  }

  async generateText(prompt: string) {
    const model = this.generativeAI.getGenerativeModel({ model: 'gemini-pro' });

    // Kullanıcının mesajını ekle
    this.messageHistory.next([...this.messageHistory.getValue(), { from: 'user', message: prompt }]);

    let text: string;

    if (prompt.toLowerCase().includes('kimsin')) {
      text = 'ben senin gıda rehberinim. Bana beslenme ile alakalı tüm sorularını sorabilirsin.';
    } else {
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        text = response.text();
      } catch (error) {
        text = 'Üzgünüm, şu an sorunuza cevap veremiyorum. Lütfen daha sonra tekrar deneyin.';
      }
    }

    this.messageHistory.next([...this.messageHistory.getValue(), { from: 'bot', message: text }]);
  }

  public getMessageHistory(): Observable<{ from: string; message: string }[]> {
    return this.messageHistory.asObservable();
  }
}
