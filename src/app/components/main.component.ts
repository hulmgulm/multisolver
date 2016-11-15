import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate';

@Component({
  selector: 'multisolver-main',
  template: `   <multisolver-header></multisolver-header>

		            <multisolver-crypto-body>Loading...</multisolver-crypto-body>

		            <multisolver-footer></multisolver-footer>`
})
export class MainComponent implements OnInit {

    public translatedText: string;
    public supportedLanguages: any[];

    constructor(private _translate: TranslateService) { }

    ngOnInit() {

        console.log("ngOnInit");

        // standing data
        this.supportedLanguages = [
          { display: 'English', value: 'en' },
          { display: 'Deutsch', value: 'de' }
        ];

        // set current langage
        this.selectLang('de');
    }

    isCurrentLang(lang: string) {
        // check if the selected lang is current lang
        return lang === this._translate.currentLang;
    }

    selectLang(lang: string) {
        // set current lang;
        this._translate.use(lang);
        this.refreshText();
    }

    refreshText() {
        // refresh translation when language change
        this.translatedText = this._translate.instant('hello world');
    }
}