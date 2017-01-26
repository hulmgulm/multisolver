/** 
  * @desc Geohash Helper class
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

import { Geohash } from './geohash.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Geohash extends Geohash {

    private _Identifier:string = "GEOHASH";

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

        if ( this.checkConstraintsCodes2Coords() ) {

            let inputString = DataContainers.getInstance().getData("AlphaLatinNumWhiteSpace");

            let codes:Array<string> = inputString.split(/[\s\r\n]+/g);

            if (codes) {

                let coords:string = super.codes2Coords(codes).join("\n");

                returnData.folders.push({"identifier" : this._Identifier, "data" : coords});
            }
        }

        return returnData;
    }

    /*
     *  Checks if the constraints are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraintsCodes2Coords():boolean {
       return DataContainers.getInstance().getData("AlphaLatinNum").length > 0;
    }
}