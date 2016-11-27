/** 
  * @desc Löffelsprache Code class
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
    [regex: string] : string;
};

export class Loeffelsprache {

    private lookUp:IPattern;

    constructor() {
        this.lookUp = {
            "ele[wf]e" : "e",
            "ale[wf]a" : "a",
            "ile[wf]i" : "i",
            "ole[wf]o" : "o",
            "ule[wf]u" : "u",
            "üle[wf]ü" : "ü",
            "öle[wf]ö" : "ö",
            "äle[wf]ä" : "ä",
            "ile[wf]ie" : "ie",
            "iele[wf]ie" : "ie",
            "ale[wf]au" : "au",
            "aule[wf]au" : "au",
            "ele[wf]ei" : "ei",
            "eile[wf]ei" : "ei",
            "oule[wf]ou" : "ou",
            "eule[wf]eu" : "eu",
            "eale[wf]a" : "ea"
        };
    }

    public translate(inputString:string):string {

        for (let p in this.lookUp) {
			if (this.lookUp.hasOwnProperty(p)) {
				inputString = inputString.replace(new RegExp(p, "ig"), this.lookUp[p]);
			}
		}

        return inputString;
	}
}