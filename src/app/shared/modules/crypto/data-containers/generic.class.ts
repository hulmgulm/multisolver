import { StringHelper } from '../../../helper/stringHelper';

export class DataContainerGeneric {

    private _filterString:RegExp = /./;
    private _dataString:string = "";
    private _uniqueChars:number = 0;

    constructor(filter:RegExp) {
        this._filterString = filter;
    }

    public setData(inputString:string) {
        this._dataString = inputString.replace(this._filterString, "");
        this._uniqueChars = StringHelper.getNumberOfUniqueChars(this._dataString);
    }

    public getData():string {
        return this._dataString;
    }
}