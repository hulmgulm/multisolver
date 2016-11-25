/** 
  * @desc Vigenère Code class
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

export class Vigenere {

    public decipher(inputString:string, password:string):string {

        password = password.toUpperCase().replace(/[^A-Z]+/g, "");

        let returnString:string = "";

		if (password) {
			// Pad password to match text length
			let passwordPadLength:number = inputString.replace(/[^A-Z]+/ig, "").length;
			while (password.length < passwordPadLength) {
				password += password;
			}

			let keyOffset:number = 0;

            returnString = inputString.split("").map(function(c:string):string {

                let charCode:number = c.charCodeAt(0);

                if ( charCode >= 65 && charCode <= 90 ) {
					return String.fromCharCode(65 + (26 + (charCode - 65) - (password.charCodeAt(keyOffset++) - 65)) % 26);
				} else if (charCode >= 97 && charCode <= 122) {
					return String.fromCharCode(97 + (26 + (charCode - 97) - (password.charCodeAt(keyOffset++) - 65) ) % 26);
				}

				return c;

            }.bind(keyOffset)
            ).join("");

		}

        return returnString;
    }
}