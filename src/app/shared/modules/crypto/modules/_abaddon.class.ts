/** 
  * @desc Abaddon Helper class
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

import { Abaddon } from './abaddon.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Abaddon extends Abaddon {

    private _Identifier:string = "ABADDON";
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

            let data:string = super.decode(DataContainers.getInstance().getData("NonAlphaNum"));
            let identifierNormal:string = this._Identifier + "_" + this._IdentifierPostfixNormal;

            if (data) {
                returnData.folders.push({"identifier" : identifierNormal, "data" : data});
            }
        }

         /* Guess-Mode */
         if ( this.checkConstraintsGuess() ) {
             let identifierGuess:string = this._Identifier + "_" + this._IdentifierPostfixGuess;
             let data:string[] = super.guess(DataContainers.getInstance().getData("Trimmed"));
             let tmpFolders:{identifier:string, data:string}[] = [];

            for (let d:number = 0; d < data.length; d++) {
                let identifier:string = identifierGuess + "_" + (d + 1).toString();
                tmpFolders.push({"identifier" : identifier, "data" : data[d]});
            }

            returnData.folders.push({"identifier" : identifierGuess, "folders" : tmpFolders});
        }

        return returnData;
    }

    /*
     *  Checks if the constraints for 'normal' are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraintsNormal():boolean {
       return DataContainers.getInstance().getData("NonAlphaNum").length > 0;
    }

    /*
     *  Checks if the constraints for 'guess' are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraintsGuess():boolean {
       return DataContainers.getInstance().uniqueChars("NonWhitespace") === 3;
    }
}