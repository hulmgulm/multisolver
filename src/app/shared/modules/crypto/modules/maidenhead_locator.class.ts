/** 
  * @desc Maidenhead Locator Code class
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

export class MaidenheadLocator {

    public code2Coord(code:string):Array<number> {
        let locator = code.toUpperCase().match(/[A-R]{2,2}([0-9]{2,2}[A-X]{2,2})+([0-9]{2,2})?/);
        let coord:Array<number> = [];

        if (locator) {
            let pairs:RegExpMatchArray = locator[0].match(/.{2,2}/g);
            let pairIndex:number = 0;

            let longitude:number = -180.0;
            let latitude:number = -90.0;

            // A - R --> 18 slices --> 360/18 = 20°
            let lonScliceInit:number = 360.0 / 18.0;
            // A - R --> 18 slices --> 180/18 = 10°
            let latScliceInit:number = 180.0 / 18.0;

            // 0 - 9 --> 10 slices
            let lonSlice09 = lonScliceInit / 10.0;
            let latSlice09 = latScliceInit / 10.0;

            // A - X --> 24 slices
            let lonSliceAX = lonSlice09 / 24.0;
            let latSliceAX = latSlice09 / 24.0;

            if (pairs) {
                for (let pair of pairs) {
                    if (0 === pairIndex) {
                        longitude += (pair.charCodeAt(0) - 65) * lonScliceInit;
                        latitude += (pair.charCodeAt(1) - 65) * latScliceInit;
                    } else if (pairIndex % 2 === 1) {
                        longitude += (pair.charCodeAt(0) - 48) * lonSlice09;
                        latitude += (pair.charCodeAt(1) - 48) * latSlice09;
                        // Next iteration
                        lonSlice09 = lonSliceAX / 10.0;
                        latSlice09 = latSliceAX / 10.0;
                    } else {
                        longitude += (pair.charCodeAt(0) - 65) * lonSliceAX;
                        latitude += (pair.charCodeAt(1) - 65) * latSliceAX;
                        // Next iteration
                        lonSliceAX = lonSlice09 / 24.0;
                        latSliceAX = latSlice09 / 24.0;
                    }

                    pairIndex++;
                }

                coord.push(latitude);
                coord.push(longitude);
            }
        }

        return coord;
    }


    public codes2Coords(inputString:string):string {
        let locators = inputString.split(/[\s\r\n]/g);

        let returnData:Array<string> = [];

        if (locators) {
            for (let locator of locators) {
                let coord:Array<number> = this.code2Coord(locator);

                if (coord) {
                    returnData.push(this.beautifyCoord(coord));
                }
            }
        }

        return returnData.join("\n");
    }

    private beautifyCoord(coord:Array<number>):string {
        let lat:number = coord[0];
        let lon:number = coord[1];
        let signLat:string = lat >= 0 ? "N" : "S";
        let signLon:string = lon >= 0 ? "E" : "W";

        lat = Math.abs(lat);
        lon = Math.abs(lon);

        return signLat + lat.toString() + " " + signLon + lon.toString();
    }
}