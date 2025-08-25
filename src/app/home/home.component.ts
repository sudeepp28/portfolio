import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone:false,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  encapsulation: ViewEncapsulation.None 
})
export class HomeComponent implements OnInit {
  fullText: string = "Mean Stack Developer";
  displayText: string = "";
  private index: number = 0;
  private isDeleting: boolean = false;
  private speed: number = 150; // typing speed (ms)

  ngOnInit(): void {
    this.startTyping();
  }

  startTyping() {
    const current = this.fullText;

    if (!this.isDeleting) {
      // Typing forward
      this.displayText = current.substring(0, this.index + 1);
      this.index++;
    } else {
      // Deleting backward
      this.displayText = current.substring(0, this.index - 1);
      this.index--;
    }

    // Set typing speed
    let typingSpeed = this.isDeleting ? this.speed / 2 : this.speed;

    // If word is complete, pause before deleting
    if (!this.isDeleting && this.index === current.length) {
      typingSpeed = 1500; // wait before deleting
      this.isDeleting = true;
    } 
    // If word is deleted, reset
    else if (this.isDeleting && this.index === 0) {
      this.isDeleting = false;
      typingSpeed = 500; // wait before typing again
    }

    setTimeout(() => this.startTyping(), typingSpeed);
  }
}
