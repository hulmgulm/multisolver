/** 
  * @desc Chaocipher Code class
  * @author dennistreysa multisolver@dennistreysa.de
  * 
  * Copyright (C) 2015-2016  dennistreysa
  * 
  * This program is free software: you can redistribute it and/or modify
  * it under the terms of the GNU General Public License as published by
  * the Free Software Foundation, either version 3 of the License, or
  * (at your option) any later version.

  * This program is distributed in the hope that it will be useful,
  * but WITHOUT ANY WARRANTY; without even the implied warranty of
  * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  * GNU General Public License for more details.

  * You should have received a copy of the GNU General Public License
  * along with this program.  If not, see <http://www.gnu.org/licenses/>.
  */

export class Chaocipher {

    public decipher(inputString:string, secretAlphabet:string, plainAlphabet:string):string {
        secretAlphabet = secretAlphabet.toUpperCase().replace(/[^A-Z]+/g, "");
        plainAlphabet = plainAlphabet.toUpperCase().replace(/[^A-Z]+/g, "");
        if (this.checkAlphabet(secretAlphabet) && this.checkAlphabet(plainAlphabet)) {

            return inputString.split("").map(function(c:string):string {

                let cValue:number = c.toUpperCase().charCodeAt(0);

                if (cValue >= 65 && cValue <= 90) {
                    // Find corresponding letter in secret to get letter in plain
					for (let s:number = 0; s < secretAlphabet.length; s++) {
						if (c.toUpperCase() === secretAlphabet[s]) {
							var p = plainAlphabet[s];
							// Shift secret to the left
							secretAlphabet = secretAlphabet.substr(s) + secretAlphabet.substr(0, s);
							// Put 2nd char at nadir position
							secretAlphabet = secretAlphabet[0] + secretAlphabet.substr(2, 12) + secretAlphabet[1] + secretAlphabet.substr(14);
							// Shift plain to the left
							plainAlphabet = plainAlphabet.substr(s) + plainAlphabet.substr(0, s);
							// Shift one more
							plainAlphabet = plainAlphabet.substr(1) + plainAlphabet[0];
							// Put 3rd char at nadir position
							plainAlphabet = plainAlphabet.substr(0, 2) + plainAlphabet.substr(3, 11) + plainAlphabet[2] + plainAlphabet.substr(14);

							cValue = c.charCodeAt(0);

                            // Restore original case
                            return (cValue >= 65 && cValue <= 90) ? p : p.toLowerCase();
						}
					}
                }

                return c;
            }).join("");
        }

        return "";
    }

    private checkAlphabet(alphabet:string):boolean {

        let counter:string[] = [];

        alphabet = alphabet.toUpperCase().replace(/[^A-Z]/g, "");

        if (26 === alphabet.length) {
            for (let c of alphabet) {
                if (counter.indexOf(c) >= 0) {
                    return false;
                }
                counter.push(c);
            }
            return true;
        }
        return false;
    }
}