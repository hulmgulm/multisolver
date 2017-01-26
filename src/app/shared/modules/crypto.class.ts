import { DataContainers } from './crypto/data-containers/dataContainers.class';
import { PasswordContainers } from './crypto/data-containers/passwordContainers.class';
import { _Abaddon } from './crypto/modules/_abaddon.class';
import { _ADFVGX } from './crypto/modules/_adfvgx.class';
import { _AMSCO } from './crypto/modules/_amsco.class';
import { _ASCII } from './crypto/modules/_ascii.class';
import { _Atbash } from './crypto/modules/_atbash.class';
import { _Autokey } from './crypto/modules/_autokey.class';
import { _Bacon } from './crypto/modules/_bacon.class';
import { _Base32 } from './crypto/modules/_base32.class';
import { _Base64 } from './crypto/modules/_base64.class';
import { _Baudot } from './crypto/modules/_baudot.class';
import { _Beaufort } from './crypto/modules/_beaufort.class';
import { _Bifid } from './crypto/modules/_bifid.class';
import { _Braille } from './crypto/modules/_braille.class';
import { _Brainfuck } from './crypto/modules/_brainfuck.class';
import { _Chaocipher } from './crypto/modules/_chaocipher.class';
import { _Copiale } from './crypto/modules/_copiale.class';
import { _Cow } from './crypto/modules/_cow.class';
import { _Decabit } from './crypto/modules/_decabit.class';
import { _Echo } from './crypto/modules/_echo.class';
import { _EnclosedAreas } from './crypto/modules/_enclosed_areas.class';
import { _Gade } from './crypto/modules/_gade.class';
import { _Gronsfeld } from './crypto/modules/_gronsfeld.class';
import { _Groundspeak } from './crypto/modules/_groundspeak.class';
import { _Kennycode } from './crypto/modules/_kennycode.class';
import { _Lemon } from './crypto/modules/_lemon.class';
import { _Loeffelsprache } from './crypto/modules/_loeffelsprache.class';
import { _Murray } from './crypto/modules/_murray.class';
import { _Polybios } from './crypto/modules/_polybios.class';
import { _Porta } from './crypto/modules/_porta.class';
import { _Rotations } from './crypto/modules/_rotations.class';
import { _T9 } from './crypto/modules/_t9.class';
import { _Trithemius } from './crypto/modules/_trithemius.class';
import { _Vigenere } from './crypto/modules/_vigenere.class';

export class MSCrypto {

    private _modules = [
        new _Abaddon(),
        new _ADFVGX(),
        new _AMSCO(),
        new _ASCII(),
        new _Atbash(),
        new _Autokey(),
        new _Bacon(),
        new _Base32(),
        new _Base64(),
        new _Baudot(),
        new _Beaufort(),
        new _Bifid(),
        new _Braille(),
        new _Brainfuck(),
        new _Chaocipher(),
        new _Copiale(),
        new _Cow(),
        new _Decabit(),
        new _Echo(),
        new _EnclosedAreas(),
        new _Gade(),
        new _Gronsfeld(),
        new _Groundspeak(),
        new _Kennycode(),
        new _Lemon(),
        new _Loeffelsprache(),
        new _Murray(),
        new _Polybios(),
        new _Porta(),
        new _Rotations(),
        new _T9(),
        new _Trithemius(),
        new _Vigenere()
    ];

    public do(inputString:string, password1:string, password2:string) {

        interface IData {
            [modules:string]: Array<Object>;
        };

        let data:IData = {
            "modules" : []
        };

        // Initialize data containers
        let Data:DataContainers = DataContainers.getInstance();
        Data.setData(inputString);

        // Initialize password containers
        let Passwords:PasswordContainers = PasswordContainers.getInstance();
        Passwords.setPasswords([password1, password2]);

        for (let module of this._modules) {
            data["modules"].push(module.do());
        }

        return data;
    }
}