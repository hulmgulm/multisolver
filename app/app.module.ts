import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MainComponent }   from './components/main.component';
import { HeaderComponent }   from './components/header.component';
import { CryptoBodyComponent }   from './components/crypto-body.component';
import { FooterComponent }   from './components/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BodyPaddingDirective } from './directives/bodyPadding.directive';
import { TRANSLATION_PROVIDERS, TranslatePipe, TranslateService }   from './translate';
//import { SchemaFormModule } from "angular2-schema-form";
//import { Ng2SFTinyMCEModule } from "ng2sf-tinymce";

@NgModule({
	imports:      [ BrowserModule, FormsModule, ReactiveFormsModule ],
	declarations: [ MainComponent, TranslatePipe, HeaderComponent, CryptoBodyComponent, FooterComponent, BodyPaddingDirective ],
	bootstrap:    [ MainComponent ],
	providers:    [ TRANSLATION_PROVIDERS, TranslateService ]
})
export class AppModule { }