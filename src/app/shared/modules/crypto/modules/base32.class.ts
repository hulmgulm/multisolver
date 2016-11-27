/** 
  * @desc Base32 Code class
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

export class Base32 {

    private lookUp:string;

    constructor() {
        this.lookUp = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";
    }

    public decode(inputString:string):string {

        inputString = inputString.replace(/[^A-Z2-7\s\r\n]/g, "");

        return inputString.split(/[\s\r\n]+/).map(function(part:string):string {
            return part.split("").map(function(c:string):string {
                let bits:string = this.lookUp.indexOf(c).toString(2);
                return "00000".substr(bits.length) + bits;
            }.bind(this)).join("").match(/.{8,8}/g).map(function(c:string):string {
                return String.fromCharCode( parseInt(c, 2) );
            }).join("");
        }.bind(this)).join(" ");
	}
}