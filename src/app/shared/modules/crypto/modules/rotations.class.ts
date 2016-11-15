/** 
  * @desc Rotations Code class
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

export class Rotations {

    public rotateStringAlpha(inputString:string, offset:number):string {
        if (offset > 0) {

            let returnString = inputString.split("").map(function(c:string):string {

                let charCode:number = c.charCodeAt(0);

                if (charCode >= 0x41 && charCode <= 0x5a) {
                    // Uppercase
                    return String.fromCharCode((( 26 + (charCode - 0x41) - offset) % 26) + 0x41);
                } else if (charCode >= 0x61 && charCode <= 0x7a) {
                    return String.fromCharCode((( 26 + (charCode - 0x61) - offset) % 26) + 0x61);
                } else {
                    return c;
                }

            }).join("");

            return returnString;

        } else {
            return inputString;
        }
    }

    public rotateStringDigits(inputString:string, offset:number):string {

        let returnString = inputString.split("").map(function(c:string):string {

            let charCode:number = c.charCodeAt(0);

            if (charCode >= 0x30 && charCode <= 0x39) {
                return String.fromCharCode( ((charCode - 0x30 + offset) % 10) + 0x30 );
            } else {
                return c;
            }

        }).join("");

        return returnString;
    }
}