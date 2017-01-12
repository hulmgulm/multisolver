/** 
  * @desc Gade Code class
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

export class Gade {

    private lookUp:string;

    constructor() {
        this.lookUp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    }

    public decode(inputString:string):Array<string> {
        let digits:Array<string> = inputString.replace(/[^0-9]+/g, "").split("").sort();

        for (let i:number = 0; i < 10; i++) {
            let c:string = i.toString();

            if (digits.indexOf(c) < 0) {
                digits.push(c);
            }
        }

        if (digits.length > 26) {
            digits = digits.slice(0, 26);
        }

        return digits;
    }
}