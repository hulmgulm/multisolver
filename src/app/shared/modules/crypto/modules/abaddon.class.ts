/** 
  * @desc Abaddon Code class
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

export class Abaddon {

    private AbaddonPattern = {
            "¥¥µ" : "A",
            "¥þ¥" : "B",
            "þµµ" : "C",
            "µµþ" : "D",
            "µ¥µ" : "E",
            "µµ¥" : "F",
            "µþþ" : "G",
            "þµ¥" : "H",
            "¥¥¥" : "I",
            "µþµ" : "J",
            "¥þµ" : "K",
            "µ¥¥" : "L",
            "þ¥¥" : "M",
            "¥¥þ" : "N",
            "þþþ" : "O",
            "þþ¥" : "P",
            "¥þþ" : "Q",
            "þþµ" : "R",
            "þµþ" : "S",
            "þ¥µ" : "T",
            "µµµ" : "U",
            "¥µ¥" : "V",
            "µþ¥" : "W",
            "µ¥þ" : "X",
            "¥µþ" : "Y",
            "þ¥þ" : "Z",
            "¥µµ" : " "
        };

    public decode(inputString:string):string {

        inputString = inputString.toLowerCase()
                        .replace(/Þ/g, "þ")
                        .replace(/Μ/g, "μ")
                        .replace(/[^¥µþ]+/ig, "");

        let parts = inputString.match(/.{1,3}/g);

        let returnString:string = "";

        if ( parts ) {

            let callback = (part:string) : string => {
                return (
                    part.length === 3 ? (
                        this.AbaddonPattern.hasOwnProperty(part) ? this.AbaddonPattern[part] : " {?} "
                    ) : part
                );
            };

            callback.bind(this);

            returnString = parts.map( callback ).join("");
        }

        return returnString;
    }
}