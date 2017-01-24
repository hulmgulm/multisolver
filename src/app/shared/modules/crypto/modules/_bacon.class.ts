/** 
  * @desc Bacon Helper class
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

import { Bacon } from './bacon.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Bacon extends Bacon {

    private _Identifier:string = "BACON";
    private _IdentifierPostfixNormal:string = "NORMAL";
    private _IdentifierPostfixNormalInversed:string = "NORMAL_INVERSED";
    private _IdentifierPostfixFirstCharUpperLower:string = "FIRSTCHAR_UPPERLOWER";
    private _IdentifierPostfixFirstCharUpperLowerInversed:string = "FIRSTCHAR_UPPERLOWER_INVERSED";
    private _IdentifierPostfixFirstCharAZ:string = "FIRSTCHAR_AZ";
    private _IdentifierPostfixFirstCharAZInversed:string = "FIRSTCHAR_AZ_INVERSED";
    private _IdentifierPostfixAllCharsUpperLower:string = "ALLCHARS_UPPERLOWER";
    private _IdentifierPostfixAllCharsUpperLowerInversed:string = "ALLCHARS_UPPERLOWER_INVERSED";
    private _IdentifierPostfixAllCharsAZ:string = "ALLCHARS_AZ";
    private _IdentifierPostfixAllCharsAZInversed:string = "ALLCHARS_AZ_INVERSED";
    private _IdentifierPostfixGuess:string = "GUESS";

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

        if ( this.checkConstraintsNormal() ) {

            let inputString = DataContainers.getInstance().getData("AlphaLatin");

            let identifierNormal:string = this._Identifier + "_" + this._IdentifierPostfixNormal;
            let dataNormal = super.decode(inputString);
            if (dataNormal) {
                returnData.folders.push({"identifier" : identifierNormal, "data" : dataNormal});
            }

            let identifierNormalInversed:string = this._Identifier + "_" + this._IdentifierPostfixNormalInversed;
            let dataNormalInversed = super.decode(inputString, true);
            if (dataNormalInversed) {
                returnData.folders.push({"identifier" : identifierNormalInversed, "data" : dataNormalInversed});
            }

            inputString = DataContainers.getInstance().getData("Trimmed");

            let identifierFirstCharUpperLower:string = this._Identifier + "_" + this._IdentifierPostfixFirstCharUpperLower;
            let dataFirstCharUpperLower = super.firstCharUpperLower(inputString);
            if (dataFirstCharUpperLower) {
                returnData.folders.push({"identifier" : identifierFirstCharUpperLower, "data" : dataFirstCharUpperLower});
            }

            let identifierFirstCharUpperLowerInversed:string = this._Identifier + "_" + this._IdentifierPostfixFirstCharUpperLowerInversed;
            let dataFirstCharUpperLowerInversed = super.firstCharUpperLower(inputString, true);
            if (dataFirstCharUpperLowerInversed) {
                returnData.folders.push({   "identifier" : identifierFirstCharUpperLowerInversed,
                                            "data" : dataFirstCharUpperLowerInversed});
            }

            let identifierFirstCharAZ:string = this._Identifier + "_" + this._IdentifierPostfixFirstCharAZ;
            let dataFirstCharAZ = super.firstCharAZ(inputString);
            if (dataFirstCharAZ) {
                returnData.folders.push({"identifier" : identifierFirstCharAZ, "data" : dataFirstCharAZ});
            }

            let identifierFirstCharAZInversed:string = this._Identifier + "_" + this._IdentifierPostfixFirstCharAZInversed;
            let dataFirstCharAZInversed = super.firstCharAZ(inputString, true);
            if (dataFirstCharAZInversed) {
                returnData.folders.push({   "identifier" : identifierFirstCharAZInversed,
                                            "data" : dataFirstCharAZInversed});
            }

            inputString = DataContainers.getInstance().getData("NonWhitespace");

            let identifierAllCharsUpperLower:string = this._Identifier + "_" + this._IdentifierPostfixAllCharsUpperLower;
            let dataAllCharsUpperLower = super.allCharsUpperLower(inputString);
            if (dataAllCharsUpperLower) {
                returnData.folders.push({"identifier" : identifierAllCharsUpperLower, "data" : dataAllCharsUpperLower});
            }

            let identifierAllCharsUpperLowerInversed:string = this._Identifier + "_" + this._IdentifierPostfixAllCharsUpperLowerInversed;
            let dataAllCharsUpperLowerInversed = super.allCharsUpperLower(inputString, true);
            if (dataAllCharsUpperLowerInversed) {
                returnData.folders.push({   "identifier" : identifierAllCharsUpperLowerInversed,
                                            "data" : dataAllCharsUpperLowerInversed});
            }

            let identifierAllCharsAZ:string = this._Identifier + "_" + this._IdentifierPostfixAllCharsAZ;
            let dataAllCharsAZ = super.allCharsAZ(inputString);
            if (dataAllCharsAZ) {
                returnData.folders.push({"identifier" : identifierAllCharsAZ, "data" : dataAllCharsAZ});
            }

            let identifierAllCharsAZInversed:string = this._Identifier + "_" + this._IdentifierPostfixAllCharsAZInversed;
            let dataAllCharsAZInversed = super.allCharsAZ(inputString, true);
            if (dataAllCharsAZInversed) {
                returnData.folders.push({   "identifier" : identifierAllCharsAZInversed,
                                            "data" : dataAllCharsAZInversed});
            }
        }

        if (this.checkConstraintsGuess()) {
            let identifierGuess:string = this._Identifier + "_" + this._IdentifierPostfixGuess;
             let data:string[] = super.guess(DataContainers.getInstance().getData("NonWhitespace"));
             let tmpFolders:{identifier:string, data:string}[] = [];

            for (let d:number = 0; d < data.length; d++) {
                let identifier:string = identifierGuess + "_" + (d + 1).toString();
                tmpFolders.push({"identifier" : identifier, "data" : data[d]});
            }

            returnData.folders.push({"identifier" : identifierGuess, "folders" : tmpFolders});
        }

        return returnData;
    }

    private checkConstraintsNormal():boolean {
       return DataContainers.getInstance().getData("AlphaLatin").length > 0;
    }

    private checkConstraintsGuess():boolean {
       return DataContainers.getInstance().getData("NonWhitespace").length > 0;
    }

}