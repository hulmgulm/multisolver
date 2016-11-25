/** 
  * @desc Lemon Code class
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

export class Lemon {

    public decipher(inputString:string, counterClockwise:boolean = false):string {

		inputString = inputString.replace(/[^\s\r\n\t]+/gm, "");

		let odd:string = inputString.split("").map(function(c:string, index:number){ return (index % 2 ? c : ""); }).join("");
		let even:string = inputString.split("").map(function(c:string, index:number){ return (index % 2 ? "" : c); }).join("");
		let returnString:string = (counterClockwise ? even + odd.split("").reverse().join("") : odd + even.split("").reverse().join("") );

		return returnString;
	}

}