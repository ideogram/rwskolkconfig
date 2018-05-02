yaml = require("../vendor/js-yaml.min");
const fs = require('fs');

var origDoc = yaml.safeLoad(fs.readFileSync('catalogue/elements.yaml', 'utf8'));
var altDoc = yaml.safeLoad(fs.readFileSync('tools/alternatief.yaml', 'utf8'));
var newDoc = [];
var b = {};


altDoc.forEach( function(element){

    a = {};

    fileName = element.NewName;
    fileName = fileName.toLowerCase();
    fileName = fileName.replace(/ /g,"-");

    oldLocation = "assets/" + element.OrigName.toLowerCase() + ".svg";
    newLocation = "assets2/" + element.Code + "__" + fileName + ".svg";

    a.name = fileName;
    a.symbol = element.Code;
    a.tooltip = element.Tooltip;
    a.type = element.Type;

    origDoc.forEach( function(origElement){
        if (origElement.symbol == element.OldSymb){
            b = origElement;
        }
    });

    a.deltay =  b.deltay;
    a.top = b.top;
    a.bottom = b.bottom;
    a.gate = b.gate;
    if (b.gate ) a.direction=  b.role;

    newDoc.push(a);


});

console.log(yaml.dump(newDoc));


