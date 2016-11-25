/** 
  * @desc Groundspeak Code class
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

export class Groundspeak {

    private lookUp:string;

    constructor() {
        this.lookUp = "0123456789ABCDEFGHJKMNPQRTVWXYZ";
    }

    public codes2Numbers(codes:string[]):number[] {

        let numbers:number[] = [];

        for (let code of codes) {

            code = code.trim().toUpperCase().replace(/[^0-9A-HJKMNP-TV-Z\s\t\n\r]+/g, "");

            if ( /(GC|PR)[1-9A-F][0-9A-F]{1,3}$/.test(code) ) {
                // First generation
                numbers.push( parseInt(code.substring(2), 16) );
            } else if (/(GC|PR)[GHJKMNP-TV-Z][0-9A-HJKMNP-TV-Z]{3,3}|(GC|PR)[1-9A-HJKMNP-TV-Z][0-9A-HJKMNP-TV-Z]{4,4}$/.test(code)) {
                // Second generation
                let sum:number = 0;
                // Reverse code
                var codeChars = code.substring(2).split("").reverse().join("");

                for (var c = 0; c < codeChars.length; c++) {
                    sum += this.lookUp.indexOf(codeChars[c]) * Math.pow(31, c);
                }

                // GCG000 is the first code of the second generation -> G000 is 476656 in Base31
                numbers.push(0xffff - 476656 + 1 + sum);
            }
        }

		return numbers;
    }

    public numbers2Codes(numbers:number[]):string[] {

        let codes:string[] = [];

        for (let number of numbers) {

            if (number <= 0xffff) {
                codes.push( number.toString(16).toUpperCase() );
            } else {
                let codeString:string = "";

                number += 0x645f0;

                do {
                    codeString = this.lookUp[number % 31] + codeString;
                    number = Math.floor(number / 31);
                } while (number > 0);

            }
        }

        return codes;
    }
}