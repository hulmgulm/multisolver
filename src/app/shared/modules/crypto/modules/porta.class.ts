/** 
  * @desc Porta Code class
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

export class Porta {

    public decipher(inputString:string, password:string) {

		password = password.toUpperCase().replace(/[^A-Z]+/g, "");

		let returnString:string = "";
		let password_offset:number = 0;

		if (password) {

            returnString = inputString.split("").map(function(c:string):string {

                let charCode:number = c.charCodeAt(0);

				if ( (charCode >= 0x41 && charCode <= 0x5a)
                    || (charCode >= 0x61 && charCode <= 0x7a) ) {

                    let subValue:number = (charCode >= 0x41 && charCode <= 0x5a) ? 0x41 : 0x61;

                    charCode -= subValue;

					let p:number = password[password_offset].charCodeAt(0) - 65;
					password_offset = (password_offset + 1) % password.length;
					let group:number = Math.floor(p / 2);
                    let newValue:number = 0;

					if (charCode <= 12) {
						newValue = (charCode + 13 - group) < 13 ? (charCode + 13 - group + 13) : (charCode + 13 - group);
					} else {
						newValue = (charCode + group >= 26) ? ((charCode + group) % 26) : ((charCode + 13 + group) % 26);
					}

                    return String.fromCharCode(newValue + subValue);

				}

                return c;

            }).join("");

		}

		return returnString;
	}

}