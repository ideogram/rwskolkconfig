/**
 * Created by maartenvandervelde on 28/10/2017.
 */
/* Run using node.js from the CLI from the 'tools' folder.  */

yaml = require("../vendor/js-yaml.min");
fs   = require('fs');

polyfill();

// Get document, or throw exception on error
try {
    var doc = yaml.safeLoad(fs.readFileSync('catalogue/elements.yaml', 'utf8'));
    makeDoc(doc);
} catch (e) {
    console.log(e);
}

function makeDoc(doc){
    console.log("| Symbool | (Bestands)naam            | Rol | Tooltip | Beschrijving | Afbeelding ");
    console.log("| ---     | ---                       | --- | ---     | ---          | ---   ");

    doc.forEach( element => {

        // A pipe would break the layout of our MD table
        if (element.symbol == "|") {
            element.symbol = "[PIPE]"
        }

        // A space would be invisible
        if (element.symbol == " ") {
            element.symbol = "[SPACE]"
        }

        if (element.role == ">") element.role = "&gt;";
        if (element.role == "<") element.role = "&lt;";

        // Make sure the description is not undefined
        if ( typeof element.description == "undefined") {  element.description = " " }

        // Make sure the tooltip is not undefined
        if ( typeof element.tooltip == "undefined") {  element.tooltip = " " }

        var symbol = "`"+element.symbol + "`"

        console.log(
            "| " +
            [
                symbol.padEnd(10),
                element.name.padEnd(30),
                element.role,
                element.tooltip.padEnd(60),
                element.description.padEnd(135),
                '!['+element.name+'](../documentation/png/'+element.name+".svg.png)"
            ].join(" | ")
            + " |"
        );


    });

}

function polyfill() {
// https://github.com/uxitten/polyfill/blob/master/string.polyfill.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd
    if (!String.prototype.padEnd) {
        String.prototype.padEnd = function padEnd(targetLength, padString) {
            targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
            padString = String(padString || ' ');
            if (this.length > targetLength) {
                return String(this);
            }
            else {
                targetLength = targetLength - this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
                }
                return String(this) + padString.slice(0, targetLength);
            }
        };
    }
}

