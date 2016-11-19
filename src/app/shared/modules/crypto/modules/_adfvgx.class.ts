/** 
  * @desc ADFVGX Helper class
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

import { ADFVGX } from './adfvgx.class';
import { DataContainers } from '../data-containers/dataContainers.class';
import { PasswordContainers } from '../data-containers/passwordContainers.class';

export class _ADFVGX extends ADFVGX {

    private _Identifier:string = "ADF(V)GX";
    private _IdentifierADFVGX:string = "ADFVGX";
    private _IdentifierADFGX:string = "ADFGX";

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

            let inputString:string = DataContainers.getInstance().getData("AlphaLatin");
            let password:string = PasswordContainers.getInstance().getData("AlphaLatin");
            let matrix:string = PasswordContainers.getInstance().getData("AlphaLatinNum", 1);
            returnData.folders.push({"identifier" : this._IdentifierADFVGX, "data" : super.decipherADFVGX(inputString, password, matrix)});

            matrix = PasswordContainers.getInstance().getData("AlphaLatin", 1);
            returnData.folders.push({"identifier" : this._IdentifierADFGX, "data" : super.decipherADFGX(inputString, password, matrix)});
        }

        return returnData;
    }

    /*
     *  Checks if the constraints are met
     * 
     *  \returns TRUE, if constraints are met
     */
    private checkConstraints():boolean {
       return DataContainers.getInstance().getData("AlphaLatin").length > 0
                && PasswordContainers.getInstance().getData("AlphaLatin").length > 0;
    }
}