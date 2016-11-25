/** 
  * @desc Groundspeak Helper class
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

import { Groundspeak } from './groundspeak.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Groundspeak extends Groundspeak {

    private _Identifier:string = "GROUNDSPEAK";

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

        /* Codes2Numbers */
        if ( this.checkConstraintsCodes2Numbers() ) {

            let inputString = DataContainers.getInstance().getData("AlphaLatinNumWhiteSpace");
            let identifierCodes2Numbers:string = this._Identifier + "_CODES2NUMBERS";

            let codes:string[] = [];
            let regEx:RegExp = /(GC|PR).+/ig;
            let result:RegExpExecArray = null;

            while ( result = regEx.exec(inputString) ) {
                codes.push( result[0] );
            }

            if (codes.length) {

                let numbers:string = super.codes2Numbers(codes).map(function(n:number){ return n.toString(); } ).join(" ");

                returnData.folders.push({"identifier" : identifierCodes2Numbers, "data" : numbers});
            }
        }

        /* Numbers2Codes */
        if ( this.checkConstraintsNumbers2Codes() ) {

            let inputString = DataContainers.getInstance().getData("DigitsWhiteSpace");
            let identifierNumbers2Codes:string = this._Identifier + "_NUMBERS2CODES";

            let numbers:number[] = [];
            let regEx:RegExp = /\d+/g;
            let result:RegExpExecArray = null;

            while ( result = regEx.exec(inputString) ) {
                numbers.push( parseInt(result[0], 10) );
            }

            if (numbers.length) {

                let codes:string = super.numbers2Codes(numbers).join(" ");

                returnData.folders.push({"identifier" : identifierNumbers2Codes, "data" : codes});
            }
        }

        return returnData;
    }

    /*
     *  Checks if the constraints are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraintsCodes2Numbers():boolean {
       return DataContainers.getInstance().getData("AlphaLatin").length > 0;
    }

    private checkConstraintsNumbers2Codes():boolean {
       return DataContainers.getInstance().getData("Digits").length > 0;
    }
}