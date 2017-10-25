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

// Variables
var elements = [];
var countElementsRendered = 0;

(function ($) {

    // Initialisation
    var observer = new MutationObserver( elementRendered );
    $.fx.off = true;

    // jQuery-UI interactions: allow for drag-and-drop and duplication of lock elements
    $diagram.sortable({ revert: true, receive: elementDropped, stop: diagramChanged });
    $toolbar.find("li").disableSelection();

    // Load the YAML-configuration file containig names and properties of the lock-elements
    $.get(folderConfigs + "elements.yaml", null, loadElements);

    // Loads all the separate elements into an array an
    function loadElements(data){
        elements = jsyaml.load(data);
        addElementsToDOM();
    }

    // Iterate over the elemets array and add the drawings to the #toolbar
    function addElementsToDOM(){
        $.each(elements, function (key, val) {
            var id = val.name
            var description = val.description;

            // Bridges may be draggable, but should not be allowed to end up in the #diagram
            draggableOptionsElement = draggableOptions;
            if ( val.name == "brug-vast" || val.name == "brug-beweegbaar" ){
                delete draggableOptionsElement.connectToSortable;
            }

            var $li = $("<li class='element'></li>").appendTo($toolbar)
                .attr( { "title": description, "data-ref": key,} )
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
        var $diagramElements = $diagram.find(".element");

        for (var i = 0; i < $diagramElements.length; i++) {
            var $me = $diagramElements.eq(i);
            var data = elements[$me.attr("data-ref")];
            var $svg = $me.find("svg");
            var html = $svg.html();
            var w = 2 * parseFloat($svg.attr("width"));
            var viewbox = $svg.attr("viewBox");

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


    };

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
        if ( countElementsRendered == elements.length ) {
            observer.disconnect();
        }
    }

    // Update the #diagram after adding, removing or re-arranging elements
    function diagramChanged(event, ui){
        shiftElements();
        moveDiagramUp();
        annotateGates();
        alignAnnotations();
    }

    function elementDropped(event, ui) {
        $me = $(ui.helper);

        // Add a button to erase the element from the #diagram again
        $btnRemove = $("<a></a>").appendTo($me).addClass("btn-remove");
        $btnRemove.on("click", function () {
            $(this).closest("li").remove();
        });

        // Allow a bridge to be dropped on the element.
        $me.droppable(
            {
                drop: drawBridge,
                accept: ".brug-vast, .brug-beweegbaar"
            }
        );

    }

    // Shift elements upward or downward if needed because of some special chamer-shapes
    // (Bajonet-kolk, komkolk, binnenfront-kolk)
    function shiftElements(){
        var $diagramElements = $diagram.find(".element");
        var shift = 0;

        for (i=0; i<$diagramElements.length; i++){
            var $me = $diagramElements.eq(i);
            var data = elements[ $me.attr("data-ref") ];
            var deltay = data['deltay'];
            var gate = data['gate'];
            var $svg = $me.find("svg");
            var type = $svg.attr("data-type");
            var viewbox = $svg.attr("viewBox");
            $me.css("height","auto");

            if (viewbox !== undefined ) {
                viewbox = viewbox.split(" ");
                viewbox[1] = shift*-24-4*24;
                viewbox[3] = 27*24;
                $svg.attr("viewBox", viewbox.join(" "));
                $me.data("shift",shift);
                shift += ( deltay*1.0 );
            }
        }
    }

    // Draw the elements in the diagram as close to the top of the #diagram as possible
    function moveDiagramUp(){
        var $diagramElements = $diagram.find(".element");
        var gateCount = 0;
        var highest = 1000; // very few indeed


        // Put al the annotations on the same height

        // Loop over the annotations twice.

        // First, find the lowest position
        for (i=0; i<$diagramElements.length; i++){
            var $me = $diagramElements.eq(i);
            var data = elements[ $me.attr("data-ref") ];
            var deltay  = data['deltay'];
            var top  = data['top'];
            var name    = data['name'];
            var shift   = $me.data('shift');

            highest = Math.min(highest, top+shift);
        }

        // Next, move all elemets up to the top
        for (i=0; i<$diagramElements.length; i++) {
            $me = $diagramElements.eq(i);
            var gate    = data['gate'];
            var $svg = $me.find("svg");
            var viewbox = $svg.attr("viewBox");

            if (viewbox !== undefined ) {
                viewbox = viewbox.split(" ");
                viewbox[1] = viewbox[1]*1.0 + highest*24;
                $svg.attr("viewBox", viewbox.join(" "));
            }
        }
    }

    // Put a label under each gate (sluisdeur)
    function annotateGates(){
        var $diagramElements = $diagram.find(".element");
        var gateCount = 0;

        for (i=0; i<$diagramElements.length; i++){
            var $me = $diagramElements.eq(i);
            var data = elements[ $me.attr("data-ref") ];
            var gate = data['gate'];
            var $svg = $me.find("svg");

            if ( gate !== false ){
                $svg.find("text").not(".hw").html( String.fromCharCode(gateCount+65) );
                gateCount++;
            }
        }

    }

    // Put all the labels of the gates on the same height
    function alignAnnotations(){
        var $diagramElements = $diagram.find(".element");
        var gateCount = 0;
        var lowest = -1000; // very few indeed


        // Put al the annotations on the same height

        // Loop over the annotations twice.

        // First, find the lowest position
        for (i=0; i<$diagramElements.length; i++){
            var $me = $diagramElements.eq(i);
            var data = elements[ $me.attr("data-ref") ];

            var bridge = $me.data('bridge') == "true" ? 17 : 0;

            var bottom  = data['bottom'];

            var shift   = $me.data('shift');

            lowest = Math.max( lowest, bottom + shift, bridge + shift );
        }

        // Next, put annotations on this lowest point
        for (i=0; i<$diagramElements.length; i++) {
            var $me = $diagramElements.eq(i);
            var gate    = data['gate'];
            var $svg = $me.find("svg");
            shift   = $me.data('shift');
            $svg.find("text").attr("y",(lowest-shift+2)*24);
            $svg.find("text.hw").attr("y",(lowest-shift+3.5)*24);
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

})(jQuery);

var f = console.log.bind(console);

