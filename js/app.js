/**
 * Created by M. H. van der Velde (ideogram.nl) on 08/09/2017.
 */


(function (window) {
    /**
     * Module libConfig
     * @exports libConfig
     * @namespace libConfig
     */

    libConfig = {
        // Settings
        path: {
            folderAssets: "assets/",
            fileCatalogue: "catalogue/elements.yaml",
            folderPartials: "partials/",
            folderImages: 'images/',
        },

        // Defaults
        networkDirection : "N",
        gateNumbering : "ABC",
        draggableOptions : {connectToSortable: null, helper: "clone", revert: "invalid"},
        scale: 3,

        // Variables
        diagramTool: {},
        $toolbar: null,
        $diagram: null,
        observer: null,
        $compassRoseLeft: null,
        $compassRoseRight: null,
        elementCatalogue : [],
        countElementsRendered : 0,
        countElementsLoaded: null,
        $diagramElement: null,
        element : [],
        arr$SVG : [],
        shifts : [],
        bridges: [],
        L : 0,
        strConfig: "",
        height: null,
        svgArrowLeft: null,
        svgArrowRight: null,

        /**
         * Set the paths used within the app.
         *
         * Argument is an object that can contain zero or more of the following
         * properties (with their default value)
         * - folderAssets: "assets/"
         * - fileCatalogue: "catalogue/elements.yaml"
         * - folderPartials: "partials/"
         * - folderImages: 'images/'
         *
         * @param {object} objPathOptions Object containing the various paths
         * @memberof libConfig
         */
        setPaths: function (objPathOptions) {
            var l = libConfig;
            // use the jQuery extend option to override the default path settings:
            jQuery.extend(l.path, objPathOptions);
            libConfig.loadImagesUI();
        },

        /**
         * Force loading of the images of the GUI. This is only needed if 'setPaths' is never called
         */
        loadImagesUI: function(){
            var l = libConfig;
            var sheet = libConfig.addStyleSheet();

            var strSelector, strRule = "";

            var images = [
                ["#compass-rose-left", "compass-left-north.svg"],
                ["#compass-rose-right","compass-right-south.svg"],
                ["#diagram","network-arrow-right.svg"],
                [".btn-remove","delete-forever.svg"],
                [".btn-remove:hover","delete-forever-hover.svg"],
                ["#label-dir-n","network-dir-n.svg"],
                ["#label-dir-o","network-dir-o.svg"],
                ["#label-dir-z","network-dir-z.svg"],
                ["#label-dir-w","network-dir-w.svg"],
                ["#label-gates-abc","ABC.svg"],
                ["#label-gates-cba","CBA.svg"],
            ];

            for(var i=0; i<images.length; i++){
                strSelector = images[i][0];
                strRule = "background-image: " + libConfig.getCssUrl( images[i][1] );
                libConfig.addCSSRule(sheet, strSelector, strRule );
            }
        },

        /**
         * Assign a DOM-element as container for the catalogue of DOM-elements
         * @param {string} strSelector jQuery/CSS style selector
         * @memberof libConfig
         */
        setToolbar: function (strSelector ) {

            libConfig.$toolbar = $(strSelector);

            // Prepare a special welcome for our SVG-elements by calling the elementRendered function.
            libConfig.observer = new MutationObserver(this.elementRendered);
            $.fx.off = true;

            libConfig.$toolbar.find("li").disableSelection();
        },

        /**
         * Initiate the drawing GUI by loading the catalogue and all the assets.
         * @memberof libConfig
         */
        loadAssetsAndCatalogue: function(){
            l = libConfig;

            // Load the YAML-configuration file containig names and properties of the lock-elements
            // and add them to our UI

            $.get(l.path.fileCatalogue, null, libConfig.loadElements);

        },

        /**
         * Assign a DOM-element as container for the diagram.
         * @param {string} strSelector jQuery/CSS style selector
         * @memberof libConfig
         */
        setDiagram: function(strSelector) {
            var l = libConfig;
            l.$diagram = $(strSelector);

            l.draggableOptions.connectToSortable = strSelector;

            // jQuery-UI interactions: allow for drag-and-drop and duplication of lock elements
            l.$diagram.sortable({
                revert: true,
                receive: libConfig.elementDropped,
                stop: this.diagramChanged,
                forcePlaceholderSize: true
            });

            // Create some extra HTML elements:

            // .. #diagram-wrapper: contains the diagram, compass rose and options
            l.$diagram.wrap('<div id="diagram-wrapper" />');
            l.$diagramWrapper = l.$diagram.find("#diagram-wrapper");

            // ... #options: contains a series of options that can be set on the diagram
            l.$options =
                $("<ul id='options' />")
                    .prependTo("#diagram-wrapper");

            var strOptions = [
                 'network-direction', 'gates-names-direction'
            ];

            for (var i = 0; i < strOptions.length; i++) {

                $.get(l.path.folderPartials + "option-" + strOptions[i] + ".partial.html", function (data) {
                    $(data).appendTo(l.$options)
                        .find("input").on("change", libConfig.optionChanged);
                });
            }

            // ... compass roses
            l.$compassRoseLeft = $('<div id="compass-rose-left"></div>').insertBefore(l.$diagram);
            l.$compassRoseRight = $('<div id="compass-rose-right"></div>').insertAfter(l.$diagram);

            // ... #result: invisible div containing the SVG before it gets downloaded

            var $resultWrapper =
                $('<div id="result"></div>')
                    .insertAfter("#diagram-wrapper");

            l.$result = $('<svg></svg>')
                .appendTo($resultWrapper)
                .attr({
                    "xmlns": "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink"
                });

            // ... store two network-direction symbols into variables

            $.get(l.path.folderPartials + "network-arrow-left.partial.svg", null, function( data ) {
                l.svgArrowLeft = data;
            }, 'html' );

            $.get(l.path.folderPartials + "network-arrow-right.partial.svg", null, function( data ) {
                l.svgArrowRight = data;
            }, 'html');

        },

        /**
         * Re-build and return the configuration string
         * @returns {string} String containig kolk-id, network direction, gate numbering, chamber configuration and comment
         * @memberof libConfig
         */
        getConfigString: function () {
            var l = libConfig;

            l.strConfig = "";

            l.strConfig = [
                "(",
                l.networkDirection,
                l.gateNumbering,
                ")"
            ].join(" ");

            for (var i = 0; i < l.L; i++) {
                l.strConfig += l.element[i]['symbol'];

                if ( typeof l.bridges[i] !== "undefined" ){
                    l.strConfig += l.bridges[i];
                }
            }

            return l.strConfig;

        },

        /**
         * Make the SVG from the diagram available as a download.
         * @param {string} strFileName Filename for the SVG to be offered as download
         * @memberof libConfig
         */
        composeSVG: function(strFileName) {
            var l = libConfig;
            var margin = 32;
            var h = l.height + 2*margin;
            var strLeft, strRight;
            var textStyle = {
                "font-family": "sans-serif",
                "font-size": 24,
                "text-anchor": "middle",
                "fill": "#9ACAE8"
            };
            var $arrow;

            // Fill the '#result'-SVG  with the lock-elements
            l.$result.html("");

            var x = 0;
            for (var i = 0; i < l.L; i++) {
                var $svg = l.arr$SVG[i];
                var html = $svg.html();
                var w = l.scale * parseFloat($svg.attr("width"));
                var viewBox = $svg.attr("viewBox");
                var y = 0;
                // Remove the viewbox and wrap the element in a <g>-tag instead
                if (viewBox !== undefined) {
                    viewBox = viewBox.split(" ");
                    y = viewBox[1];

                    $g = $("<g>" + html + "</g>").appendTo(l.$result);

                    $g.attr("transform", "translate(" + (x - i + margin ) + "," + (-y+margin) + ")");
                    // ( We substract i from x to make the elements overlap by one pixel )

                    // The background of the stopstreep extends beyond the viewbox.

                }
                x += (w-1);
            }

            w = (x+2*margin);

            // Show the N, W, O or Z alongside

            switch (l.networkDirection){
                case "N":
                case "Z":
                    strLeft = "N"; strRight = "Z";
                    break;
                case "O":
                case "W":
                    strLeft = "W"; strRight = "O";
                    break;
            }

            $("<text />").appendTo(l.$result).attr({
                x: margin/2,
                y: h/2})
                .attr(textStyle)
                .html( strLeft );

            $("<text />").appendTo(l.$result).attr({
                x: x+margin+margin/2,
                y: h/2})
                .attr(textStyle)
                .html( strRight );

            // Show the network direction
            switch (l.networkDirection){
                case "N":
                case "W":
                    $arrow = $( l.svgArrowRight ).appendTo(l.$result);
                    break;
                case "O":
                case "Z":
                    $arrow = $( l.svgArrowLeft ).appendTo(l.$result);
                    strLeft = "W"; strRight = "O";
                    break;
            }

            $arrow.attr("transform","translate("+(w/2 - 32)+",16)");

            // Ajust width and ehigth


            l.$result.attr("width", w + "px");
            l.$result.attr("height", h + "px");

            // Offer the download
            libConfig.offerDownload(l.$result[0].outerHTML, strFileName );
        },

        /**
         * Set the configuration string. The network direction and gate numbering are also set
         * @param {string} strConfig A complete configuration string
         * @memberof libConfig
         */
        setConfigString: function(strConfig){
            var l = libConfig;
            var matches = strConfig.match(/\((.*?)\)/g);
            var strPre, strComment;

            // Split the string into three parts and keep the middle part
            if (matches.length > 0) {
                strPre = matches[0];

                strConfig = strConfig.replace(strPre, "");
                strConfig = strConfig.replace(strComment, "");

                // From the first part,
                // ... remove all the spaces and brackets
                strPre = strPre.replace(/\s/gi,"");
                strPre = strPre.replace("(","");
                strPre = strPre.replace(")","");

                // ... extract network direction
                l.setNetworkDirection( strPre.match(/[NOZW]/)[0] );

                // ... extract gate-numbering direction
                d = strPre.match(/ABC|CBA/g);
                if (d === null || d[0] === "ABC"){
                    l.setGateNumbering("ABC");
                } else {
                    l.setGateNumbering("CBA");
                }
            }

            // What remains is the 'actual' config string, the part
            // that contains all the symbols.

            l.strConfig = strConfig;


        },

        /**
         * set the Network direction. This represents the direction of the entrance of the chamber according to RWS network direction
         * @param {string} value Either "N","Z","O" or "W"
         * @memberof libConfig
         */
        setNetworkDirection : function( value ){
            var l = libConfig;
            l.networkDirection = value;
        },

        /**
         * Returns the networkwork direction.
         * @returns {string} Either "N","Z","O" or "W"
         * @memberof libConfig
         */
        getNetworkDirection : function(  ){
            var l = libConfig;
            return l.networkDirection;
        },

        /**
         * Set gate numbering direction. "CBA" should practically never be needed.
         * @param {string} value Either "ABC" or "CBA"
         * @memberof libConfig
         */
        setGateNumbering: function( value ){
            var l = libConfig;
            l.gateNumbering = value;
        },

        /**
         * Returns  gate numbering
         * @returns {string} Either "ABC" or "CBA"
         * @memberof libConfig
         */
        getGateNumbering: function(){
            var l = libConfig;
            return l.gateNumbering;
        },

        /**
         * Draws the diagram. Call if the diagram is not updated automatically
         * @memberof libConfig
         */
        drawDiagram: function () {
            var l = libConfig;
            var s = l.strConfig;
            var elements = [];
            var fill = "";
            var pos = "";
            var symbol = "";
            var name = "";
            var htmlDiagram = "";
            var i;

            // Pre-flight check
            if ( !(l.$diagram instanceof jQuery) ) console.error("No DOM-object assigned to contain the diagram.");
            if ( l.elementCatalogue.length == 0 ) console.error("No element catalogue found.");

            // Clear the diagram
            l.$diagram.html("");
            l.element = [];
            l.shifts = [];
            l.bridges = [];

            // Make a local copy of the catalogue
            var c = l.elementCatalogue.slice();

            // Sort the local catalogue by string length of the symbol, from long to small
            c.sort(compare);

            function compare(a,b) {
                if (a.symbol.length > b.symbol.length)
                    return -1;
                if (a.symbol.length < b.symbol.length)
                    return 1;
                return 0;
            }

            // Find occurrences of every symbol in the config-string and store them in an array
            for (i=0; i<c.length; i++ ){

                symbol = c[i].symbol;
                name = c[i].name;

                pos = s.indexOf( symbol );

                while (pos !== -1) {
                    elements[pos] = c[i];
                    elements[pos]['ref'] = i;
                    fill = "".padStart(symbol.length,"@");
                    s = s.replace( symbol, fill );
                    pos = s.indexOf(symbol, pos + 1 );
                }
            }

            var index = 0;

            // Copy the array to the global elements array, removing empty slots on the fly
            $.each(elements, function (i, value) {
                if (value !== undefined) {
                    if ( value.symbol == "I05" || value.symbol == "I06" || value.symbol == "I07" ) {
                        l.bridges[index-1] = value.symbol;
                    } else {
                        l.element.push(value);
                        index++;
                    }
                }
            });

            // Fill the diagram with copies of the elements in the toolbar
            for(i=0; i<l.element.length; i++){
                name = l.element[i].name;
                $e = l.$toolbar.find("."+name);
                htmlDiagram +=  $e[0].outerHTML;
            }

            l.$diagram.html(htmlDiagram);

            l.$diagramElements = l.$diagram.find(".element");

            l.$diagramElements.each(function (i) {
                var $me = $(this);
                l.arr$SVG[i] = $me.find("svg");
                libConfig.prepareForDiagramLife($me);

                if (l.bridges[i] == "I05"){
                    $bridge = l.$toolbar.find(".brug-vast").clone();
                    libConfig.drawBridge($me, $bridge);
                }

                if (l.bridges[i] == "I06"){
                    $bridge = l.$toolbar.find(".brug-beweegbaar").clone();
                    libConfig.drawBridge($me, $bridge);
                }

                if (l.bridges[i] == "I07"){
                    $bridge = l.$toolbar.find(".weg-over-hoofd").clone();
                    libConfig.drawBridge($me, $bridge);
                }
            });

            l.L = l.$diagramElements.length;

            // With this information, we can do a series of manipulations:
            l.shiftElements();
            l.moveDiagramUp();
            l.annotateGates();
            l.alignAnnotations();
        },

        // Iterate over the elements array and add the drawings to the toolbar
        addElementsToToolbar: function() {
            var l = libConfig;
            l.countElementsLoaded = 0;

            $.each( l.elementCatalogue, function (key, val) {
                var id = val.name;
                var tooltip = val.tooltip;

                // Bridges may be draggable, but should not be allowed to end up in the diagram as separate entities
                var draggableOptionsElement = l.draggableOptions;
                if (val.name == "brug-vast" || val.name == "brug-beweegbaar" || val.name == "weg-over-hoofd" ) {
                    delete draggableOptionsElement.connectToSortable;
                }

                var $li = $('<li class="element"></li>' ).
                    appendTo(libConfig.$toolbar)
                        .attr({"title": tooltip, "data-ref": key})
                        .addClass(val.name)
                        .disableSelection()
                        .draggable(l.draggableOptions)
                        .load(l.path.folderAssets + id + ".svg", libConfig.elementLoaded);

                // After the SVG is rendered, rework the SVG
                libConfig.observer.observe($li[0], {childList: true});
            });
        },

        // Keeps track of the number of elements loaded
        elementLoaded: function(){
            var l = libConfig;
            l.countElementsLoaded++;

            if (l.countElementsLoaded == l.elementCatalogue.length){

                if ( l.strConfig != null ){
                    libConfig.drawDiagram();
                }
            }
        },

        // Loads all the separate elements into an array and add them to the toolbar
        loadElements: function(data) {
            l = libConfig;
            l.elementCatalogue = jsyaml.load(data);
            libConfig.addElementsToToolbar();
        },

        // Scale the SVG-elements, so they take up less space
        elementRendered: function(mutationRecords) {
            var $li = $(mutationRecords["0"].target);
            var $svg = $li.find("svg");
            var l = libConfig;

            // Scale the element down and remove height-attribute
            var w = $svg.attr("width");
            $svg.attr('width', w / l.scale );
            $svg.removeAttr("height");

            l.countElementsRendered++;
            if (l.countElementsRendered == l.elementCatalogue.length) {
                l.observer.disconnect();
            }
        },

        // Update the diagram after adding, removing or re-arranging elements
        diagramChanged: function() {
            var l = libConfig;

            // Store the element-information from the palette
            // into a an array connected to every element in the diagram

            // Erase anything previously stored:
            l.element = [];
            l.arr$SVG = [];
            l.shifts = [];
            // ( We must keep the l.bridges[], because these can't be discovered automatically )

            l.$diagramElements = l.$diagram.find(".element");

            l.L = l.$diagramElements.length;

            l.$diagramElements.each(function (i) {
                var $me = $(this);
                l.element[i] = l.elementCatalogue[$me.attr("data-ref")];
                l.arr$SVG[i] = $me.find("svg");
            });

            // With this information, we can do a series of manipulations:
            l.shiftElements();
            l.moveDiagramUp();
            l.annotateGates();
            l.alignAnnotations();
        },

        // Event-handler for when an element from the toolbar is dropped on the diagram
        elementDropped: function(event, ui) {
            libConfig.prepareForDiagramLife( $(ui.helper) );
        },

        // Preparing an element for it's life inside the diagram
        prepareForDiagramLife: function( $target ){
            var l = libConfig;

            // Add a button to erase the element from the diagram again
            var $btnRemove = $("<a></a>").appendTo($target).addClass("btn-remove");

            $btnRemove.on("click", libConfig.removeElement );

            // Allow a bridge to be dropped on the element.
            $target.droppable(
                {
                    drop: libConfig.receiveDropOnElement,
                    accept: ".brug-vast, .brug-beweegbaar, .weg-over-hoofd"
                }
            );
        },

        // Remove an element from the diagram
        removeElement: function(){
            var $me = $(this);
            var $li = $me.closest("li");
            var i = $li.index();


            if (i in l.bridges ){
                // remove bridge, but not the underlaying element
                $li.find("g.bridge").remove();
                delete l.bridges[i];
            } else {
                // remove the element
                l.bridges.splice(i,1);
                $li.remove();
                l.diagramChanged();
            }
        },

        // Shift elements upward or downward if needed because of some special chamber-shapes
        shiftElements: function() {
            var shift = 0;
            var l = libConfig;

            for (var i = 0; i < l.L; i++) {
                var deltaY = l.element[i]['deltay'];
                var viewBox = l.arr$SVG[i].attr("viewBox");

                if (viewBox !== undefined) {
                    viewBox = viewBox.split(" ");
                    viewBox[1] = -24 * shift - 2;
                    viewBox[3] = 27 * 24;
                    l.arr$SVG[i].attr("viewBox", viewBox.join(" "));
                    l.shifts[i] = shift;
                    shift += parseInt(deltaY);
                }
            }
        },

        // Draw the elements in the diagram as close to the top of the diagram as possible
        moveDiagramUp: function() {
            var highest = 1000; // infinity
            var l = libConfig;

            // Move all elements uo

            // ... Loop over the elements twice.

            // ... ... First, find the highest position
            for (var i = 0; i < l.L; i++) {
                var top = 0;
                var name = l.element[i]['name'];
                var shift = l.shifts[i];

                if ( typeof l.bridges[i] !== 'undefined' ) {
                    top = Math.min(3, l.element[i]['top'])
                } else {
                    top = l.element[i]['top'];
                }

                highest = Math.min(highest, top + shift);
            }

            // ... ... Next, move all elements up to the top
            for (i = 0; i < l.L; i++) {
                var gate = l.element[i]['gate'];
                var $svg = l.arr$SVG[i];
                var viewBox = $svg.attr("viewBox");

                if (viewBox !== undefined) {
                    viewBox = viewBox.split(" ");
                    viewBox[1] = parseFloat(viewBox[1]) + highest * 24;
                    $svg.attr("viewBox", viewBox.join(" "));
                }
            }

            l.highest = highest;

        },

        // Put a label under each gate (sluisdeur)
        annotateGates: function() {
            var gateCount = 0;
            var totalGates = 0;
            var gate = false;
            var l = libConfig;
            var $svg = null;

            // First, find the total amount of gates
            for (i = 0; i < l.L; i++) {

                gate = l.element[i]['gate'];

                if (gate != false) {
                    totalGates++;
                }
            }

            // Fill the text element with the gate number (A, B, C, etc)
            for (i = 0; i < l.L; i++) {
                gate = l.element[i]['gate'];
                $svg = l.arr$SVG[i];

                if (gate !== false) {

                    if (l.gateNumbering == "ABC") {
                        $svg.find("text").not(".hw").html(String.fromCharCode(gateCount + 65));
                    } else {
                        $svg.find("text").not(".hw").html(String.fromCharCode(totalGates - gateCount + 65 - 1));
                    }
                    gateCount++;
                }
            }
        },

        // Put all the labels of the gates on the same height
        alignAnnotations: function() {
            var lowest = -1000; //  minus infinity
            var shift = 0;
            var l = libConfig;
            var hasHWK = 0;


            // Put al the annotations on the same height

            // ... Loop over the annotations twice.

            // ... ... First, find the lowest position
            for (i = 0; i < l.L; i++) {
                // var bridge = l.element[i]['bridge'] ? 17 : 0;
                var bridge = i in l.bridges ? 17: 0;
                var bottom = l.element[i]['bottom'];
                shift = l.shifts[i];
                lowest = Math.max(lowest, bottom + shift, bridge + shift);
            }

            // ... ... Next, put annotations on this lowest point
            for (i = 0; i < l.L; i++) {
                var gate = l.element[i]['gate'];

                if (gate !== undefined) {
                    var $svg = l.arr$SVG[i];
                    shift = l.shifts[i];
                    $svg.find("text").attr("y", (lowest - shift + 2) * 24);
                    $svg.find("text.hw").attr("y", (lowest - shift + 3.5) * 24);

                    if ( l.element[i].symbol.indexOf("h") !== -1  ) hasHWK = 1;
                }
            }

            // Remember the lowest position for setting the height later on
            l.height = (lowest + 2 + hasHWK*3.5 - l.highest) * 24;

        },

        // event-handler for receiving a bridge dropped on a ui-element
        receiveDropOnElement: function(event, ui){
            libConfig.drawBridge($(event.target),$(ui.helper));
        },

        // Draw a bridge over the target element
        drawBridge: function($target, $bridge) {
            var l = libConfig;
            var viewBox;

            // Determine the right DOM-elements
            var $svg = $target.find("svg");
            var $bridgeGroup = $bridge.find("g");
            var i = $target.index();
            var isStopStreep = ( l.element[i].name == 'stopstreep');

            // Calculate the position
            var pxTargetWidth = l.scale * parseFloat($svg.attr("width"));
            var pxBridgeWidth = 5 * 24; // 120;
            var pxCentre = (pxTargetWidth - pxBridgeWidth) / 2;

            // Change the DOM of the receiving element
            $svg.append($bridgeGroup);

            // ... positioning the bridge nicely in the centre
            if (pxCentre != 0 && l.element[i].name != 'stopstreep') {
                $svg.find(".bridge").attr("transform", "translate(" + pxCentre + ",0)");
            }

            // ... make the 'stopstreep' wider if a bridge is dropped on it
            if ( isStopStreep ) {
                viewBox = $svg.attr('viewBox');
                viewBox = viewBox.split(" ");
                viewBox[0] = -0;
                viewBox[2] = 120;
                $svg.attr("viewBox", viewBox.join(" ")).attr("width", 120 / l.scale );
                $target.css("width", 120 / l.scale);
            }

            // Change the 'bridge' value of the element
            l.bridges[i] =  l.elementCatalogue[$bridge.attr('data-ref')]['symbol'];

            // Update drawing
            libConfig.diagramChanged();
        },

        // offer a string containing SVG as download
        offerDownload: function(strDownload, fileName) {
            var str_preface = '<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n';
            var svgData = str_preface + strDownload;
            var svgBlob = new Blob([svgData], {type: "image/svg+xml;charset=utf-8"});
            var svgUrl = URL.createObjectURL(svgBlob);
            var downloadLink = document.createElement("a");
            downloadLink.href = svgUrl;
            downloadLink.download = fileName + ".svg";
            document.body.appendChild(downloadLink);
            downloadLink.click();
            // document.body.removeChild(downloadLink);
        },

        // Set the configuration strings options
        optionChanged: function() {
            var l = libConfig;
            var $me = $(this);
            var varName = $me.attr("name");
            var value = $me.val();

            switch (varName) {
                case "gates-direction":
                    l.gateNumbering = value;
                    libConfig.diagramChanged();
                    break;

                case "network-direction":
                    l.networkDirection = value;
                    libConfig.drawCompassRose(value);
                    libConfig.drawNetworkArrow(value);
                    break;

                case "comment":
                    l.strComment = value;
            }
        },

        // Draw representation of the compass rose alongside the diagram
        drawCompassRose: function(value) {
            var l = libConfig;


            switch (value){
                case "N":
                case "Z":

                    l.$compassRoseLeft.css("background-image", libConfig.getCssUrl("compass-left-north.svg"));
                    l.$compassRoseRight.css("background-image", libConfig.getCssUrl("compass-right-south.svg"));

                    break;
                case "O":
                case "W":
                    l.$compassRoseLeft.css("background-image", libConfig.getCssUrl("compass-left-west.svg"));
                    l.$compassRoseRight.css("background-image", libConfig.getCssUrl("compass-right-east.svg"));
                break;
            }
        },

        // Draw network-arrow on top of the diagram
        drawNetworkArrow: function(value) {
            var l = libConfig;

            switch (value){
                case "N":
                case "W":

                    l.$diagram.css("background-image", libConfig.getCssUrl("network-arrow-right.svg)"));
                    l.$diagram.css("background-image", libConfig.getCssUrl("network-arrow-right.svg)"));

                    break;
                case "O":
                case "Z":
                    l.$diagram.css("background-image", libConfig.getCssUrl("network-arrow-left.svg"));
                    l.$diagram.css("background-image", libConfig.getCssUrl("network-arrow-left.svg"));

                    break;
            }
        },

        // --- CSS Helper functions ---
        // Helper function to construct a css-style url for an image.
        getCssUrl: function (filename){
            var l = libConfig;

            // Returns for example: url("to/images/folder/filename.jpg")
            return "url("+l.path.folderImages + filename + ")";
        },

        // Create a stylesheet. Returns a reference to the stylesheet
        addStyleSheet: function () {
            var style = document.createElement("style");

            // WebKit hack :(
            style.appendChild(document.createTextNode(""));

            // Add the <style> element to the page
            document.head.appendChild(style);

            return style.sheet;
        },

        // Add a CSS rule
        addCSSRule: function (sheet, selector, rules, index) {
            if ("insertRule" in sheet) {
                sheet.insertRule(selector + "{" + rules + "}", index);
            }
            else if ("addRule" in sheet) {
                sheet.addRule(selector, rules, index);
            }
        }
    }
})(window);
