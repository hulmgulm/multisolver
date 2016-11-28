/** 
  * @desc EnclosedAreas Code class
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

interface CharsDict {
    [identifier:string] : number;
};

export class EnclosedAreas {

    private chars:CharsDict = {
                        "A" : 1,
                        "a" : 1,
                        "B" : 2,
                        "b" : 1,
                        "D" : 1,
                        "d" : 1,
                        "O" : 1,
                        "o" : 1,
                        "P" : 1,
                        "p" : 1,
                        "Q" : 1,
                        "q" : 1,
                        "R" : 1,
                        "0" : 1,
                        "4" : 1,
                        "6" : 1,
                        "8" : 2,
                        "9" : 1,
                        "%" : 2,
                        "&" : 2,
                        "Ä" : 1,
                        "ä" : 1,
                        "Ö" : 1,
                        "ö" : 1
                    };

    public count(inputString:string, countFour:boolean = true):string {

        this.chars["4"] = countFour ? 1 : 0;

        return inputString.split(/[\s\r\n]+/).map(function(part:string):string {
            let sum:number = 0;
            for (let c of part) {
                if (this.chars.hasOwnProperty(c)) {
                    sum += this.chars[c];
                }
            }
            return sum.toString();
        }, this).join(" ");
	}

}