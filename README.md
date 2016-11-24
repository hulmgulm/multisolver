# **MultiSolver**

MultiSolver is a website that aims to support decryption for various ciphers and other riddles Geocachers are faced with.

A hosted version can be found here: [MultiSolver](http://geocaching.dennistreysa.de/multisolver/)

## Installation & Building ##

If you want to install and build MultiSolver yourself just follow these steps:

* Make sure you have `npm` and `gulp` installed globally for your system
* Run `npm install` in the repository folder to download all needed modules
* Run `gulp` in the repository folder to compile the code, minify everything into one single file and start a local web server

### Build-Config ###
In the file *gulpfile.config.js* you can configure the following flags:

* ???

## How can I help ? ##

Found anything missing? Anything not working as expected? You want to donate?
Just write a mail to dennistreysa (at) gmail.com, or create an issue.

## Can I get the code for *xyz* ? ##

You want to use a part of MultiSolver in your own (non-commercial) project? Sure thing! Single modules of MultiSolver were designed to be as reusable as possible. That's why every module got it's own class in it's own file. If you're looking for, let's say, the Morse code class, you'll find it under `src/app/shared/modules/crypto/modules/morse.class.ts`. No external imports needed!


## Third party code/libraries ##

* [Angular 2](https://angularjs.org/) by Google
* [Bootstrap](http://getbootstrap.com/) by Twitter
* [jQuery](https://jquery.com/) by jQuery Team


## Resources ##

* [Devicon](http://devicon.fr/) by Konpa
* [Krispicons- Modern Flat Icons](https://www.behance.net/nitishkmrk) Freebie by Nitish Kumar


## Developers ##

* dennistreysa

## License ##
MultiSolver is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

MultiSolver is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see [http://www.gnu.org/licenses/](http://www.gnu.org/licenses/).