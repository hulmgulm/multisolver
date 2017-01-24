/** 
  * @desc Base64 Code class
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

export class Base64 {

    public decode(inputString:string):string {

        inputString = inputString.replace(/[^A-Za-z0-9+\/\s\r\n]/g, "").trim();

        return inputString.split(/[\s\r\n]+/).map(function(part:string):string {
            try {
                return window.atob(part);
            } catch (e) {
                return " ";
            }
        }.bind(this)).join(" ");
	}
}