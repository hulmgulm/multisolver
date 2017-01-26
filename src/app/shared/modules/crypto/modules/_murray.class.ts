/** 
  * @desc Murray Helper class
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

import { Murray } from './murray.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Murray extends Murray {

    private _Identifier:string = "MURRAY";
    private _IdentifierPostfixNormal:string = "NORMAL";
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

        /* Normal */
        if ( this.checkConstraintsNormal() ) {

            let data:string = super.decode(DataContainers.getInstance().getData("Digits"));
            let identifierNormal:string = this._Identifier + "_" + this._IdentifierPostfixNormal;

            if (data) {
                returnData.folders.push({"identifier" : identifierNormal, "data" : data});
            }
        }

         /* Guess-Mode */
         if ( this.checkConstraintsGuess() ) {

             // Try to find best-matching combination
            let bestMatching:string = "";
            let DIFFERENT_CHARS:number = 2;
            if (DataContainers.getInstance().uniqueChars("Unchanged") === DIFFERENT_CHARS) {
                bestMatching = DataContainers.getInstance().getData("Unchanged");
            } else if (DataContainers.getInstance().uniqueChars("Trimmed") === DIFFERENT_CHARS) {
                bestMatching = DataContainers.getInstance().getData("Trimmed");
            } else if (DataContainers.getInstance().uniqueChars("NoNewline") === DIFFERENT_CHARS) {
                bestMatching = DataContainers.getInstance().getData("NoNewline");
            } else if (DataContainers.getInstance().uniqueChars("NonWhitespace") === DIFFERENT_CHARS) {
                bestMatching = DataContainers.getInstance().getData("NonWhitespace");
            }

             let identifierGuess:string = this._Identifier + "_" + this._IdentifierPostfixGuess;
             let data:string[] = super.guess(bestMatching);
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
       return DataContainers.getInstance().getData("Digits").length > 0;
    }

    private checkConstraintsGuess():boolean {
       return DataContainers.getInstance().uniqueChars("Unchanged") >= 2;
    }
}