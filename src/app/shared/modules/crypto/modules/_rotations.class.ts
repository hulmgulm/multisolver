/** 
  * @desc Rotations Helper class
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

import { Rotations } from './rotations.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Rotations extends Rotations {

    private _Identifier:string = "ROTATIONS";
    private _IdentifierPostfixAlpha:string = "ALPHA";
    private _IdentifierPostfixDigits:string = "DIGITS";
    private _IdentifierPostfix47:string = "47";
    private _IdentifierPostfix123:string = "123";

    /*
     *  Main routine
     */
    public do() {

        interface IReturnData {
            identifier: string;
            folders: Array<Object>;
        };

        let returnData:IReturnData = {
            "identifier" : this._Identifier,
            "folders" : []
        };

        /* Alpha */
        if ( this.checkConstraintsAlpha() ) {

            let inputString = DataContainers.getInstance().getData("Trimmed");
            let identifierAlpha:string = this._Identifier + "_" + this._IdentifierPostfixAlpha;

            let tmpFolder:{identifier:string, data:string}[] = [];

            for (let rotation:number = 1; rotation < 26; rotation++) {

                let rotatedString = super.rotateStringAlpha(inputString, rotation);

                tmpFolder.push({"identifier" : identifierAlpha + "_" + rotation.toString(), "data" : rotatedString});
            }

            returnData.folders.push({"identifier" : identifierAlpha, "folders" : tmpFolder});
        }

        /* Digits */
        if ( this.checkConstraintsDigits() ) {

            let inputString:string = DataContainers.getInstance().getData("Trimmed");
            let identifierDigits:string = this._Identifier + "_" + this._IdentifierPostfixDigits;

            let tmpFolder:{identifier:string, data:string}[] = [];

            for (let rotation:number = 1; rotation < 10; rotation++) {

                let rotatedString = super.rotateStringDigits(inputString, rotation);

                tmpFolder.push({"identifier" : identifierDigits + "_" + rotation.toString(), "data" : rotatedString});
            }

            returnData.folders.push({"identifier" : identifierDigits, "folders" : tmpFolder});
        }

        /* ASCII */
        if ( this.checkConstraints47() ) {

            let inputString:string = DataContainers.getInstance().getData("Trimmed");
            let identifier47:string = this._Identifier + "_" + this._IdentifierPostfix47;

            let rotatedString = super.rotateString47(inputString);

            returnData.folders.push({"identifier" : identifier47, "data" : rotatedString});
        }

        /* 123 */
        if ( this.checkConstraintsAlpha() ) {

            let inputString:string = DataContainers.getInstance().getData("Trimmed");
            let identifier123:string = this._Identifier + "_" + this._IdentifierPostfix123;

            let tmpFolder:{identifier:string, data:string}[] = [];

            tmpFolder.push({"identifier" : identifier123 + "_LEFT", "data" : super.rotateString123(inputString)});
            tmpFolder.push({"identifier" : identifier123 + "_RIGHT", "data" : super.rotateString123(inputString, true)});

            returnData.folders.push({"identifier" : identifier123, "folders" : tmpFolder});
        }

        return returnData;
    }

    /*
     *  Checks if the constraints for 'alpha' are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraintsAlpha():boolean {
       // We need at least a char to rotate
       return DataContainers.getInstance().getData("AlphaLatin").length > 0;
    }

    /*
     *  Checks if the constraints for 'Rot5' are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraintsDigits():boolean {
       // We need at least a char to rotate
       return DataContainers.getInstance().getData("Digits").length > 0;
    }

    /*
     *  Checks if the constraints for 'Rot47' are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraints47():boolean {
       // We need at least a char to rotate
       return DataContainers.getInstance().getData("Trimmed").length > 0;
    }
}