import { DataContainerGeneric } from './generic.class';

export class DataContainers {

    private static _instance:DataContainers = new DataContainers();

    // Data containers
    private _containers = {
        "Trimmed" : new DataContainerGeneric(/^[\s\r\n]+|[\s\r\n]+$/g),
        "AlphaLatin" : new DataContainerGeneric(/[^A-Z]+/ig),
        "AlphaLatinNum" : new DataContainerGeneric(/[^A-Z0-9]+/ig),
        "AlphaLatinWhiteSpace" : new DataContainerGeneric(/[^A-Z\s\r\n]+/ig),
        "Digits" : new DataContainerGeneric(/[^0-9]+/g),
        "Whitespace" : new DataContainerGeneric(/[^\s\r\n]+/g),
        "NonAlphaNum" : new DataContainerGeneric(/[A-Z0-9]+/ig)
    };

    constructor() {

        if (DataContainers._instance) {
            throw new Error("Error: Instantiation failed: Use DataContainers.getInstance() instead of new.");
        }

        DataContainers._instance = this;
    }

    public static getInstance():DataContainers {
        return DataContainers._instance;
    }

    public setData(inputString:string) {
        for (let c in this._containers) {
            if (this._containers.hasOwnProperty(c)) {
                this._containers[c].setData(inputString);
            }
        }
    }

    public getData(name:string):string {

        if ( name in this._containers ) {
            return this._containers[name].getData();
        }

        throw new Error("Error: Could not find data container '" + name + "'.");
    }
}