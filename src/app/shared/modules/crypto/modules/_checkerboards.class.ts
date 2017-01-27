/** 
  * @desc Checkerboards Helper class
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

import { Checkerboards } from './checkerboards.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Checkerboards extends Checkerboards {

    private _Identifier:string = "CHECKERBOARDS";

    /*
     *  Main routine
     */
    public do() {

        interface IReturnData {
            identifier: string;
            folders: Array<Object>;
        };

        let returnData: IReturnData = {
            "identifier" : this._Identifier,
            "folders" : []
        };

        if ( this.checkConstraints() ) {

            let inputString:string = DataContainers.getInstance().getData("Digits");
            let modes:Array<string> = [
                "DEIN_STAR", "EI_STRAND", "STEIN_RAD", "STRADDING_STANDARD", "STRADDING_COMPLEX",
                "STRADDING_DIGITS", "KARTEN_KOSAK", "CODE_535", "JUNO", "JUPITER", "CHE_GUEVARA",
                "KORALLE", "ZOBEL"];

            let tmpFolder:{identifier:string, data:string}[] = [];

            for (let mode of modes) {

                tmpFolder.push({"identifier" : this._Identifier + "_" + mode, "data" : super.decode(inputString, mode)});
            }

            returnData.folders.push({"identifier" : this._Identifier, "folders" : tmpFolder});
        }

        return returnData;
    }

    /*
     *  Checks if the constraints are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraints():boolean {
       return DataContainers.getInstance().getData("Digits").length > 0;
    }
}