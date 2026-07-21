import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  languages = [
    'English',
    'Español',
    'Deutsch',
    '日本語',
    'Português',
    'Français',
    'Русский',
    'Türkçe',
    'हिन्दी',
    'Bahasa Indonesia',
    'Tiếng Việt',
    '中文',
    '한국어'
  ];
  currentLanguage = 'English';
  isDropdownOpen = false;

  activeAccordions: { [key: string]: boolean } = {
    casino: false,
    sports: false,
    support: false,
    aboutUs: false,
    partnersInfo: false,
    faq: false,
  };

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectLanguage(lang: string) {
    this.currentLanguage = lang;
    this.isDropdownOpen = false;
  }

  toggleAccordion(category: string) {
    this.activeAccordions[category] = !this.activeAccordions[category];
  }

  closeDropdown() {
    this.isDropdownOpen = false;
  }
}
