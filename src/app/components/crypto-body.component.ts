import { Component } from '@angular/core';
import { MSCrypto } from '../shared/modules/crypto.class';

@Component({
	selector: 'multisolver-crypto-body',
	templateUrl: 'app/components/crypto-body.html'
})
export class CryptoBodyComponent {
	private inputCryptoStr:string = "";
	private inputCryptoPassword1:string = "";
	private inputCryptoPassword2:string = "";
	private _Crypto = new MSCrypto();

	private modulesData = {
		"modules" :
			[
				{ "identifier" : "", "data" : "" },
			]
	};

	public onButtonSolveClick() {
		this.modulesData = this._Crypto.do(this.inputCryptoStr, this.inputCryptoPassword1, this.inputCryptoPassword2);
	}

	public getObjectLength(obj):number {
		return Object.keys(obj).length;
	}

	public isObject(obj):boolean {
		return typeof(obj) === 'object';
	}
}