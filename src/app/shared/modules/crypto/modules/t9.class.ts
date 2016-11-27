/** 
  * @desc T9 Code class
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

interface IPattern {
    [key: string] : string;
};

export class T9 {

    private lookUp:IPattern;

    constructor() {
        this.lookUp = {
            "2" : "ABC",
            "3" : "DEF",
            "4" : "GHI",
            "5" : "JKL",
            "6" : "MNO",
            "7" : "PQRS",
            "8" : "TUV",
            "9" : "WXYZ"
        };
    }

    public decode(inputString:string):string {

        inputString = inputString.replace(/[^2-9\s\r\n]/g, "").trim();

        return inputString.split(/[\s\r\n]+/).map(function(part:string):string {
            let pattern:RegExpMatchArray = part.match(/([2-68])\1{0,2}|([79])\2{0,3}/g);

            if (pattern) {
                return pattern.map(function(pattern:string):string {
                    return this.lookUp[pattern[0]][pattern.length - 1];
                }.bind(this)).join("");
            }

            return "";
        }.bind(this)).join(" ");
	}
}