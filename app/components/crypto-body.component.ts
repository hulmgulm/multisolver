import { Component, Input, Output, EventEmitter } from '@angular/core';
import { BodyPaddingDirective } from '../directives/bodyPadding.directive';
import { MSCrypto } from '../shared/modules/crypto.class';

@Component({
	selector: 'multisolver-crypto-body',
	template: ` <section body_padding id="inputSection">
					<h2 class="text-center headline-big">Input</h2>
					<hr>
					<div class="container">
						<div class="row row-centered">
							<div class="col-xs-12 col-sm-10 col-md-10 col-lg-10 col-xl-10 col-centered">
								<textarea
									class="form-control"
									rows="6"
									[(ngModel)]="inputCryptoStr"
								></textarea>
							</div>
						</div>

						<div class="row row-centered">
							<div class="col-xs-8 col-sm-6 col-md-6 col-lg-6 col-xl-6 col-centered">
								<p class="text-center">
									<label class="passwordInput" for="inputCryptoPassword1">Password 1 : </label>
									<input [(ngModel)]="inputCryptoPassword1" id="inputCryptoPassword1" type="text" class="form-control">
								</p>
								<p class="text-center">
									<label class="passwordInput" for="inputCryptoPassword2">Password 2 : </label>
									<input [(ngModel)]="inputCryptoPassword2" id="inputCryptoPassword2" type="text" class="form-control">
								</p>
								<p class="text-center">
									<a
										(click)="onButtonSolveClick()"
										[ngClass]="{'btn': true, 'btn-green': true, 'text-center': true, 'btn-deactivated': (inputCryptoStr.length === 0), 'disabled': (inputCryptoStr.length === 0)}">Solve</a>
								</p>
							</div>
						</div>

						<hr>

						<div class="row row-centered">
							<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-centered">
								<p class="text-center">
									Magst du mir einen Kaffee ausgeben?
								</p>
								<div class="text-center">
									<form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
										<input type="hidden" name="cmd" value="_s-xclick">
										<input type="hidden" name="hosted_button_id" value="2JBKM5MH83LXG">
										<input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif" name="submit" alt="Jetzt einfach, schnell und sicher online bezahlen – mit PayPal.">
									</form>
								</div>
							</div>
						</div>

						<hr>

						<div class="row" *ngFor="let module of modulesData.modules">
							{{module.identifier | translate}}
						</div>

					</div>
				</section>`
})
export class CryptoBodyComponent {
	private inputCryptoStr:string = "";
	private inputCryptoPassword1:string = "";
	private inputCryptoPassword2:string = "";
	private _Crypto = new MSCrypto();

	private modulesData = {
		"modules" : 
			[
				{"identifier" : "Module 1"},
				{"identifier" : "Module 2"}
			]
	};

	onButtonSolveClick(){
		this.modulesData = this._Crypto.do(this.inputCryptoStr, this.inputCryptoPassword1, this.inputCryptoPassword2);
	}
}
