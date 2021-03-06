/** 
  * @desc Base32 Helper class
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

import { Base32 } from './base32.class';
import { DataContainers } from '../data-containers/dataContainers.class';

export class _Base32 extends Base32 {

    private _Identifier:string = "BASE32";

    /*
     *  Main routine
     */
    public do() {

        let returnData = {
            "identifier" : this._Identifier,
            "data" : ""
        };

        if ( this.checkConstraints() ) {
            returnData.data = super.decode(
                    DataContainers.getInstance().getData("AlphaLatinNumWhiteSpace")
                );

        }

        return returnData;
    }

    private checkConstraints():boolean {
       return DataContainers.getInstance().getData("AlphaLatinNum").length > 0;
    }
}