/** 
  * @desc Autokey Code class
  * @author dennistreysa multisolver@dennistreysa.de
  * 
  * Copyright (C) 2015-2017  dennistreysa
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

export class Autokey {

    public decipher(inputString:string, password:string):string {

        password = password.toUpperCase().replace(/[^A-Z]+/g, "");

        let returnString:string = "";

		if (password) {

			let keyOffset:number = 0;

            returnString = inputString.split("").map(function(c:string):string {

                let charCode:number = c.charCodeAt(0);
                let returnChar:string = "";

                if ( charCode >= 65 && charCode <= 90 ) {
					returnChar = String.fromCharCode(65 + (26 + (charCode - 65) - (password.charCodeAt(keyOffset++) - 65)) % 26);
                    password += returnChar.toUpperCase();
                    return returnChar;
				} else if (charCode >= 97 && charCode <= 122) {
					returnChar = String.fromCharCode(97 + (26 + (charCode - 97) - (password.charCodeAt(keyOffset++) - 65) ) % 26);
                    password += returnChar.toUpperCase();
                    return returnChar;
				}

				return c;

            }).join("");

		}

        return returnString;
    }
}