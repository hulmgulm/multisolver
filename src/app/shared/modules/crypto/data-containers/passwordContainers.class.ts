import { DataContainerGeneric } from './generic.class';

interface IContainer {
    [identifier: string]: DataContainerGeneric;
};

export class PasswordContainers {

    private static _instance:PasswordContainers = new PasswordContainers();

    // Password containers
    private _containers:IContainer[] = [
        {
            "Unchanged" : new DataContainerGeneric(/[]+/),
            "AlphaLatin" : new DataContainerGeneric(/[^A-Z]+/ig),
            "AlphaLatinNum" : new DataContainerGeneric(/[^A-Z0-9]+/ig),
            "Digits" : new DataContainerGeneric(/[^0-9]+/ig),
            "Trimmed" : new DataContainerGeneric(/^[\s\r\n]+|[\s\r\n]+$/g)
        },
        {
            "AlphaLatin" : new DataContainerGeneric(/[^A-Z]+/ig),
            "AlphaLatinNum" : new DataContainerGeneric(/[^A-Z0-9]+/ig)
        }
    ];

    constructor() {

        if (PasswordContainers._instance) {
            throw new Error("Error: Instantiation failed: Use PasswordContainers.getInstance() instead of new.");
        }

        PasswordContainers._instance = this;
    }

    public static getInstance():PasswordContainers {
        return PasswordContainers._instance;
    }

    public setPasswords(passwords:string[]) {
        if (passwords.length !== this._containers.length) {
            throw new Error("Error: Passwords length missmatch! Given: "
                                + passwords.length.toString()
                                + ", needed: "
                                + this._containers.length.toString()
                            );
        }

        for (let container:number = 0; container < this._containers.length; container++) {
            for (let c in this._containers[container]) {
                if (this._containers[container].hasOwnProperty(c)) {
                    this._containers[container][c].setData(passwords[container]);
                }
            }
        }
    }

    public getData(name:string, password:number = 0):string {

        if ( name in this._containers[password] ) {
            return this._containers[password][name].getData();
        }

        throw new Error("Error: Could not find password container '" + name + "', password: " + password.toString() + "!");
    }
}