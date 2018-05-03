/**
 * Created by maartenvandervelde on 28/10/2017.
 */
/* Run using node.js from the CLI from the 'documentation' folder.  */

yaml = require("../vendor/js-yaml.min");
fs   = require('fs');


polyfill();

// Get document, or throw exception on error
try {
    var doc = yaml.safeLoad(fs.readFileSync('../catalogue/elements.yaml', 'utf8'));
    makeDoc(doc);
} catch (e) {
    console.log(e);
}

function makeDoc(doc){
    var html;
    html = [];
    html.push("<html>");
    html.push("<head>");
    html.push('<link rel="stylesheet" type="text/css" href="elements-reference.css">');
    html.push("</head>");
    html.push("<body>");

    doc.forEach( element => {

        var symbol;
        var tile;

        tile = [];

        if (element.symbol !== false) {

            symbol = "`" + element.symbol + "`";

            tile.push("<div>");

            tile.push("<img src='" + '../documentation/png/' + element.name + ".png' />");
            tile.push("<pre><span>"+element.symbol+"</span></pre>");
            tile.push("<label>"+element.name + "</label>");

            tile.push("</div>");
        }

        html.push(tile.join(""));


    });

    html.push("</body></html>");
    fs.writeFile("../documentation/elements-reference.html", html.join("\n"));

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

