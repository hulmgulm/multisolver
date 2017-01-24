/** 
  * @desc Polybios Helper class
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

import { Polybios } from './polybios.class';
import { DataContainers } from '../data-containers/dataContainers.class';
import { PasswordContainers } from '../data-containers/passwordContainers.class';

export class _Polybios extends Polybios {

    private _Identifier:string = "POLYBIOS";

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

        /* 5x5 */
        if ( this.checkConstraints5x5() ) {

            let inputString = DataContainers.getInstance().getData("Digits");
            let password:string = PasswordContainers.getInstance().getData("AlphaLatin");
            let identifier5x5:string = this._Identifier + "_5x5";

            returnData.folders.push({"identifier" : identifier5x5, "data" : super.decipher(inputString, password)});
        }

        /* 6x6 */
        if ( this.checkConstraints5x5() ) {

            let inputString = DataContainers.getInstance().getData("Digits");
            let password:string = PasswordContainers.getInstance().getData("AlphaLatinNum");
            let identifier6x6:string = this._Identifier + "_6x6";

            returnData.folders.push({"identifier" : identifier6x6, "data" : super.decipher(inputString, password, true)});
        }

        return returnData;
    }

    private checkConstraints5x5():boolean {
       return DataContainers.getInstance().getData("Digits").length > 0;
    }

}