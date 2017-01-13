/** 
  * @desc Echo Code class
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
    [char: string]: boolean;
}

interface CylinderDict {
    [char: string]: number;
}

export class Echo {

    private cylinder:string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ .,?!0123456789";

    public decipher(inputString:string, newCylinder:string):string {

        let returnString:string = "";
        let tmpCylinder:string = this.cylinder;

        inputString = inputString.toUpperCase();

        if (newCylinder) {

            newCylinder = newCylinder.toUpperCase();
			let uniqueChars:CharsDict = {};

            for (let c:number = 0; c < newCylinder.length; c++) {
				if (!uniqueChars.hasOwnProperty(newCylinder[c])) {
					uniqueChars[newCylinder[c]] = true;
				}
			}

			tmpCylinder = newCylinder;
		}

		if (tmpCylinder.length % 2 === 1) {

			// Build dictionary for cylinder
			let cylinderDict:CylinderDict = {};
			for (let c:number = 0; c < tmpCylinder.length; c++) {
				cylinderDict[tmpCylinder[c]] = c;
			}

			// Sanitize input
			inputString = inputString.replace(new RegExp("[^"
                + tmpCylinder.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&")
                + "]+", "gm"), "");

            let orgIndex:number = 0;

			for (let c:number = 1; c < inputString.length; c++) {

				let indexPrev:number = cylinderDict[inputString[c - 1]];
				let indexThis:number = cylinderDict[inputString[c]];

				// Calculate distance (angle/letters) from c-1 to c
				if (indexThis > indexPrev) {
					let stepsForward:number = indexThis - indexPrev;
					let stepsBackwards:number = indexPrev + tmpCylinder.length - indexThis;

					// take the distance with an even value and go the half of it in the respective direction
					if (stepsForward % 2 === 0) {
						orgIndex = (tmpCylinder.length + indexPrev + stepsForward / 2) % tmpCylinder.length;
					}else if (stepsBackwards % 2 === 0) {
						orgIndex = (tmpCylinder.length + indexPrev - stepsBackwards / 2) % tmpCylinder.length;
					}
				} else if (indexThis < indexPrev) {
					var stepsForward = tmpCylinder.length - indexPrev + indexThis;
					var stepsBackwards = indexPrev - indexThis;

					if (stepsForward % 2 === 0) {
						orgIndex = (tmpCylinder.length + indexPrev + stepsForward / 2) % tmpCylinder.length;
					} else if (stepsBackwards % 2 === 0) {
						orgIndex = (tmpCylinder.length + indexPrev - stepsBackwards / 2) % tmpCylinder.length;
					}
				} else {
					orgIndex = indexThis;
				}

				inputString = inputString.substring(0, c) + tmpCylinder[orgIndex] + inputString.substring(c + 1);
			}

			returnString = inputString;
		}

        return returnString;
    }
}