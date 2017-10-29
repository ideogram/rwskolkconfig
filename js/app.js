/**
 * Created by maartenvandervelde on 08/09/2017.
 */

// Constants
const folderAssets = "./assets/";
const folderConfigs = "./config/";
const $toolbar = $("#toolbar");
const $diagram = $("#diagram");
const $result = $("#result").find("svg");
const $download = $("#download");
const draggableOptions = { connectToSortable: "#diagram", helper: "clone", revert: "invalid" };
const $options = $("#options");

// Variables
var elementPalette = [];
var countElementsRendered = 0;
var networkDirection = "-->";
var gateNumbering = "ABC";
var chamberOrientation = "WO";
var $diagramElements;
var element = [];
var arr$SVG = [];
var shifts = [];
var L = 0;

(function ($) {

    // Initialisation
    var observer = new MutationObserver( elementRendered );
    $.fx.off = true;

    // ... attach an event to our radio buttons and force an initial state
    $options.find("input").on("click",optionChanged );
    $("#dir-lr, #chamber-orient-wo, #gates-abc").prop("checked",true);

    // jQuery-UI interactions: allow for drag-and-drop and duplication of lock elements
    $diagram.sortable({ revert: true, receive: elementDropped, stop: diagramChanged });
    $toolbar.find("li").disableSelection();

    // Load the YAML-configuration file containig names and properties of the lock-elements
    $.get(folderConfigs + "elements.yaml", null, loadElements);

    // Loads all the separate elements into an array and add them to the toolbar
    function loadElements(data){
        elementPalette = jsyaml.load(data);
        addElementsToDOM();
    }

    // Iterate over the elements array and add the drawings to the #toolbar
    function addElementsToDOM(){
        $.each(elementPalette, function (key, val) {
            var id = val.name;
            var description = val.description;

            // Bridges may be draggable, but should not be allowed to end up in the #diagram
            var draggableOptionsElement = draggableOptions;
            if ( val.name == "brug-vast" || val.name == "brug-beweegbaar" ){
                delete draggableOptionsElement.connectToSortable;
            }

            var $li = $("<li class='element'></li>").appendTo($toolbar)
                .attr( { "title": description, "data-ref": key } )
                .addClass( val.name  )
                .disableSelection()
                .draggable(draggableOptions)
                .load(folderAssets + id + ".svg" );

            // After the SVG is rendered, rework the SVG
            observer.observe( $li[0], { childList: true } );
        });
    }

    $download.on('click',downloadSVG);

    // Make the SVG from the #diagram available as a download.
    function downloadSVG() {

        // Fill the '#result'-SVG  with the lock-elements
        $result.html("");
        var x = 0;

        for (var i = 0; i < $diagramElements.length; i++) {
            var $me = $diagramElements.eq(i);
            var $svg = $me.find("svg");
            var html = $svg.html();
            var w = 2 * parseFloat($svg.attr("width"));
            var viewbox = $svg.attr("viewBox");
            var h = 0;

            // Remove the viewbox and wrap the element in a <g>-tag instead
            if (viewbox !== undefined) {
                viewbox = viewbox.split(" ");
                h = viewbox[1];

                $g = $("<g>" + html + "</g>").appendTo($result);

                $g.attr("transform", "translate(" + (x - i) + "," + (-h) + ")");
                // ( We substract i from x to make the elements overlap by one pixel )
            }
             x += w;
        }

        $result.attr("width", x + "px");
        $result.attr("height", 2 * 324);

        // Offer the download
        offerDownload($result[0].outerHTML, uniqueStringFromTime());


    }

    // Scale the SVG-elements, so they take up less space
    function elementRendered(mutationRecords){
        var $li = $(mutationRecords["0"].target);
        var $svg = $li.find("svg");
        var id = $svg.attr("id");

        // Use half the width and remove the height
        var w = $svg.attr("width");
        $svg.attr('width',w/2);
        $svg.removeAttr("height");

        countElementsRendered++;
        if ( countElementsRendered == elementPalette.length ) {
            observer.disconnect();
        }
    }

    // Update the #diagram after adding, removing or re-arranging elements
    function diagramChanged(){

        // Store the element-information from the palette
        // into a an array connected to every element in the #diagram
        element = [];
        arr$SVG = [];
        shifts = [];
        $diagramElements = $diagram.find(".element");
        L = $diagramElements.length;

        $diagramElements.each(function(i){
            $me = $(this);
            element[i] = elementPalette[ $me.attr("data-ref") ];
            arr$SVG[i] = $me.find("svg");
        });

        // With this information, we can do a series of manipulations:
        shiftElements();
        moveDiagramUp();
        annotateGates();
        alignAnnotations();
    }

    function elementDropped(event, ui) {
        var $me = $(ui.helper);

        // Add a button to erase the element from the #diagram again
        $btnRemove = $("<a></a>").appendTo($me).addClass("btn-remove");

        $btnRemove.on("click", function () {
            $(this).closest("li").remove();
            diagramChanged();
        });

        // Allow a bridge to be dropped on the element.
        $me.droppable(
            {
                drop: drawBridge,
                accept: ".brug-vast, .brug-beweegbaar"
            }
        );

    }

    // Shift elements upward or downward if needed because of some special chamber-shapes
    // (Bajonet-kolk, komkolk, binnenfront-kolk)
    function shiftElements(){
        var shift = 0;

        for (var i=0; i<L; i++){
            var deltay = element[i]['deltay'];
            var $svg = arr$SVG[i];
            var viewbox = arr$SVG[i].attr("viewBox");

            if (viewbox !== undefined ) {
                viewbox = viewbox.split(" ");
                viewbox[1] = -24*shift - 6;
                viewbox[3] = 27*24;
                $svg.attr("viewBox", viewbox.join(" "));
                shifts[i] = shift ;

                shift +=  parseInt(deltay) ;
            }
        }



    }

    // Draw the elements in the diagram as close to the top of the #diagram as possible
    function moveDiagramUp(){
        var highest = 1000; // very few indeed

        // Put al the annotations on the same height

        // ... Loop over the annotations twice.

        // ... ... First, find the lowest position
        for (var i=0; i<L; i++){
            var deltay  = element[i]['deltay'];
            var top     = element[i]['top'];
            var name    = element[i]['name'];
            var shift   = shifts[i];

            highest = Math.min(highest, top+shift);
        }

        // ... ... Next, move all elements up to the top
        for (i=0; i<L; i++) {
            var gate    = element[i]['gate'];
            var $svg    = arr$SVG[i];
            var viewbox = $svg.attr("viewBox");

            if (viewbox !== undefined ) {
                viewbox = viewbox.split(" ");
                viewbox[1] = parseFloat( viewbox[1] ) + highest*24;
                $svg.attr("viewBox", viewbox.join(" "));
            }
        }
    }

    // Put a label under each gate (sluisdeur)
    function annotateGates(){
        var gateCount = 0;
        var totalGates = 0;
        var gate = false;

        // First, find the total amount of gates
        for (i = 0; i < L; i++) {
            gate = element[i]['gate'];

            if (gate != false) {
                totalGates++;
            }
        }

        // Fill the text element with the gate number (A, B, C, etc)
        for (i = 0; i < L; i++) {
            gate = element[i]['gate'];
            var $svg = arr$SVG[i];

            if (gate !== false) {

                if (gateNumbering == "ABC") {
                    $svg.find("text").not(".hw").html(String.fromCharCode(gateCount + 65));
                } else {
                    $svg.find("text").not(".hw").html(String.fromCharCode(totalGates - gateCount + 65 - 1));
                }
                gateCount++;
            }
        }
    }

    // Put all the labels of the gates on the same height
    function alignAnnotations(){
        var lowest = -1000; //  minus infinity
        var shift = 0;

        // Put al the annotations on the same height

        // ... Loop over the annotations twice.

        // ... ... First, find the lowest position
        for (i=0; i<L; i++){
            var bridge  = element[i]['bridge'] == "true" ? 17 : 0;
            var bottom  = element[i]['bottom'];
            shift   = shifts[i];
            lowest = Math.max( lowest, bottom + shift, bridge + shift );
        }

        // ... ... Next, put annotations on this lowest point
        for (i=0; i<L; i++) {
            var gate    = element[i]['gate'];

            if ( gate !== undefined ) {
                var $svg = arr$SVG[i];
                shift = shifts[i];
                $svg.find("text").attr("y", (lowest - shift + 2) * 24);
                $svg.find("text.hw").attr("y", (lowest - shift + 3.5) * 24);
            }
        }

    }

    // Draw a bridge over the target element
    function drawBridge(event, ui) {
        var $target = $(event.target);
        var $targetSVG = $target.find("svg");
        var pxTargetWidth = 2 * parseFloat($targetSVG.attr("width"));
        var pxBridgeWidth = 5 * 24; // 120;
        var pxCentre = (pxTargetWidth - pxBridgeWidth) / 2;

        var $bridge = $(ui.helper);
        var $bridgeGroup = $bridge.find("g");

        $targetSVG.append($bridgeGroup);

        if (pxCentre != 0) {
            $targetSVG.find(".bridge").attr("transform", "translate(" + pxCentre + ",0)");
        }

        $target.data("bridge","true");

        alignAnnotations();
    }

    // offer a string containing SVG as download
    function offerDownload(strDownload, fileName){
        var str_preface = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
        var svgData = str_preface + strDownload;
        var svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
        var svgUrl = URL.createObjectURL(svgBlob);
        var downloadLink = document.createElement("a");
        downloadLink.href = svgUrl;
        downloadLink.download = fileName + ".svg";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }

    // Helper function to provide a unique string based on the time stamp
    function uniqueStringFromTime(){
        var d = new Date();
        var n = d.getTime();
        return n.toString(36); // Number to 36-base string.
    }

    // Set the configuration strings options
    function optionChanged() {

        var $me = $(this);
        var varName = $me.attr("name");
        var value = $me.val();

        switch (varName) {
            case "gates-direction":
                gateNumbering = value;
                diagramChanged();
                break;

            case "network-direction":
                networkDirection = value;

                break;

            case "chamber-orient-direction":
                chamberOrientation = value;
                redrawCompassRose(value);
                break;
        }
    }

    // Swap representation of the compass rose alongside the #diagram
    function redrawCompassRose(value){
        if (value == "NZ"){
            $("#compass-rose-left").css("background-image","url(images/compass-left-north.svg)");
            $("#compass-rose-right").css("background-image","url(images/compass-right-south.svg)");
        }

        if (value == "WO"){
            $("#compass-rose-left").css("background-image","url(images/compass-left-west.svg)");
            $("#compass-rose-right").css("background-image","url(images/compass-right-east.svg)");
        }
    }


})(jQuery);

var f = console.log.bind(console);

