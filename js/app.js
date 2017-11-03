/**
 * Created by maartenvandervelde on 08/09/2017.
 */


(function (window) {


// ... other
    libConfig = {
        networkDirection : "N",
        gateNumbering : "ABC",
        draggableOptions : {connectToSortable: null, helper: "clone", revert: "invalid"},
        diagramTool: {},
        $toolbar: null,
        $diagram: null,
        folderAssets: null,
        observer: null,
        $compassRoseLeft: null,
        $compassRoseRight: null,
        elementCatalogue : [],
        countElementsRendered : 0,
        $diagramElement: null,
        element : [],
        arr$SVG : [],
        shifts : [],
        L : 0,
        strConfig: "",

        // Assign a DOM-element as container for the catalogue of DOM-elements
        setToolbar: function (strSelector, folderAssets, fileCatalogue) {

            libConfig.$toolbar = $(strSelector);
            libConfig.folderAssets = folderAssets;

            // Prepare a special welcome for our SVG-elements by calling the elementRendered function.
            libConfig.observer = new MutationObserver(this.elementRendered);
            $.fx.off = true;

            // Load the YAML-configuration file containig names and properties of the lock-elements
            // and add them to our UI
            $.get(fileCatalogue, null, libConfig.loadElements);

            libConfig.$toolbar.find("li").disableSelection();
        },

        // Assign a DOM-element as container for the diagram.
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

            // Create some extra HTML
            // ... #result: invisible div containing the SVG before it gets downloaded

            var $resultWrapper =
                $('<div id="result"></div>')
                    .insertAfter(l.$diagram);

            l.$result = $('<svg></svg>')
                .appendTo($resultWrapper)
                .attr({
                    "xmlns": "http://www.w3.org/2000/svg",
                    "xmlns:xlink": "http://www.w3.org/1999/xlink"
                });

            // ... #diagram-wrapper: contains the diagram, compass rose and options
            l.$diagram.wrap('<div id="diagram-wrapper" />');
            l.$diagramWrapper = l.$diagram.find("#diagram-wrapper");

            // ... #options: contains a series of options that can be set on the diagram
            l.$options =
                $("<ul id='options' />")
                    .prependTo("#diagram-wrapper");

            var strOptions = [
                 'network-direction', 'gates-names-direction',
            ];

            for (var i = 0; i < strOptions.length; i++) {

                $.get("partials/option-" + strOptions[i] + ".partial.html", function (data) {
                    $(data).appendTo(l.$options)
                        .find("input").on("click", libConfig.optionChanged);
                });
            }

            // ... compass roses
            l.$compassRoseLeft = $('<div id="compass-rose-left"></div>').insertBefore(l.$diagram);
            l.$compassRoseRight = $('<div id="compass-rose-right"></div>').insertAfter(l.$diagram);
        },

        // Re-build and return the configuration string
        getConfigString: function () {
            var l = libConfig;

            l.strConfig = "";

            l.strConfig = [
                "(",
                "12345",
                l.networkDirection,
                l.gateNumbering,
                ")"
            ].join(" ");


            for (var i = 0; i < l.L; i++) {
                l.strConfig += l.element[i]['symbol'];
            }
            return l.strConfig;

        },

        // Make the SVG from the #diagram available as a download.
        downloadSVG: function(strFileName) {
            var l = libConfig;

            // Fill the '#result'-SVG  with the lock-elements
            l.$result.html("");

            var x = 0;
            for (var i = 0; i < l.L; i++) {
                var $svg = l.arr$SVG[i];
                var html = $svg.html();
                var w = 2 * parseFloat($svg.attr("width"));
                var viewBox = $svg.attr("viewBox");
                var h = 0;

                // Remove the viewbox and wrap the element in a <g>-tag instead
                if (viewBox !== undefined) {
                    viewBox = viewBox.split(" ");
                    h = viewBox[1];

                    $g = $("<g>" + html + "</g>").appendTo(libConfig.$result);

                    $g.attr("transform", "translate(" + (x - i) + "," + (-h) + ")");
                    // ( We substract i from x to make the elements overlap by one pixel )
                }
                x += w;
            }

            l.$result.attr("width", x + "px");
            l.$result.attr("height", 2 * 324);

            // Offer the download
            libConfig.offerDownload(l.$result[0].outerHTML, strFileName );
        },

        // Iterate over the elements array and add the drawings to the toolbar
        addElementsToDOM: function() {
            var l = libConfig;
            $.each(l.elementCatalogue, function (key, val) {
                var id = val.name;
                var description = val.description;

                // Bridges may be draggable, but should not be allowed to end up in the #diagram
                var draggableOptionsElement = l.draggableOptions;
                if (val.name == "brug-vast" || val.name == "brug-beweegbaar") {
                    delete draggableOptionsElement.connectToSortable;
                }

                var $li = $('<li class="element"></li>' ).
                appendTo(libConfig.$toolbar)
                    .attr({"title": description, "data-ref": key})
                    .addClass(val.name)
                    .disableSelection()
                    .draggable(l.draggableOptions)
                    .load(libConfig.folderAssets + id + ".svg");

                // After the SVG is rendered, rework the SVG
                libConfig.observer.observe($li[0], {childList: true});
            });
        },

        // Loads all the separate elements into an array and add them to the toolbar
        loadElements: function(data) {
            libConfig.elementCatalogue = jsyaml.load(data);
            libConfig.addElementsToDOM();
        },

        // Scale the SVG-elements, so they take up less space
        elementRendered: function(mutationRecords) {
            var $li = $(mutationRecords["0"].target);
            var $svg = $li.find("svg");
            var id = $svg.attr("id");
            var l = libConfig;

            // Use half the width and remove the height
            var w = $svg.attr("width");
            $svg.attr('width', w / 2);
            $svg.removeAttr("height");

            l.countElementsRendered++;
            if (l.countElementsRendered == l.elementCatalogue.length) {
                l.observer.disconnect();
            }
        },

        // Update the #diagram after adding, removing or re-arranging elements
        diagramChanged: function() {
            var l = libConfig;

            // Store the element-information from the palette
            // into a an array connected to every element in the #diagram

            // Erase anything previously stored:
            l.element = [];
            l.arr$SVG = [];
            l.shifts = [];

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

        // Preparing an element for it's life inside the #diagram
        elementDropped: function(event, ui) {
            var l = libConfig;
            var $me = $(ui.helper);
            console.log(Math.random());

            // Add a button to erase the element from the #diagram again
            var $btnRemove = $("<a></a>").appendTo($me).addClass("btn-remove");

            $btnRemove.on("click", function () {
                $(this).closest("li").remove();
                l.diagramChanged();
            });

            // Allow a bridge to be dropped on the element.
            $me.droppable(
                {
                    drop: libConfig.drawBridge,
                    accept: ".brug-vast, .brug-beweegbaar"
                }
            );

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

        // Draw the elements in the diagram as close to the top of the #diagram as possible
        moveDiagramUp: function() {
            var highest = 1000; // infinity
            var l = libConfig;

            // Put al the annotations on the same height

            // ... Loop over the annotations twice.

            // ... ... First, find the lowest position
            for (var i = 0; i < l.L; i++) {
                var top = 0
                var name = l.element[i]['name'];
                var shift = l.shifts[i];

                if (l.element[i]['bridge']) {
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


            // Put al the annotations on the same height

            // ... Loop over the annotations twice.

            // ... ... First, find the lowest position
            for (i = 0; i < l.L; i++) {
                var bridge = l.element[i]['bridge'] ? 17 : 0;
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
                }
            }

        },

        // Draw a bridge over the target element
        drawBridge: function(event, ui) {
            var l = libConfig;
            var viewBox;

            // Determine the right DOM-elements
            var $target = $(event.target);
            var $svg = $target.find("svg");
            var $bridge = $(ui.helper);
            var $bridgeGroup = $bridge.find("g");
            var i = $target.index();

            // Calculate the position
            var pxTargetWidth = 2 * parseFloat($svg.attr("width"));
            var pxBridgeWidth = 5 * 24; // 120;
            var pxCentre = (pxTargetWidth - pxBridgeWidth) / 2;

            // Change the DOM of the receiving element
            $svg.append($bridgeGroup);

            // ... positioning the bridge nicely in the centre
            if (pxCentre != 0 && l.element[i].name != 'stopstreep') {
                $svg.find(".bridge").attr("transform", "translate(" + pxCentre + ",0)");
            }

            // ... make the 'stopstreep' wider if a bridge is dropped on it

            if (l.element[i].name == 'stopstreep') {
                viewBox = $svg.attr('viewBox');
                viewBox = viewBox.split(" ");
                viewBox[0] = 0;
                viewBox[2] = 120;
                $svg.attr("viewBox", viewBox.join(" ")).attr("width", 60);
                $target.css("width", 60);
            }

            // Change the element-data
            l.element[i]['bridge'] = true;

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
            }
        },

        // Draw representation of the compass rose alongside the diagram
        drawCompassRose: function(value) {
            var l = libConfig;

            switch (value){
                case "N":
                case "Z":

                    l.$compassRoseLeft.css("background-image", "url(images/compass-left-north.svg)");
                    l.$compassRoseRight.css("background-image", "url(images/compass-right-south.svg)");

                    break;
                case "O":
                case "W":
                    l.$compassRoseLeft.css("background-image", "url(images/compass-left-west.svg)");
                    l.$compassRoseRight.css("background-image", "url(images/compass-right-east.svg)");

                break;
            }
        },

        // Draw network-arrow on top of the diagram
        drawNetworkArrow: function(value) {
            var l = libConfig;

            switch (value){
                case "N":
                case "W":

                    l.$diagram.css("background-image", "url(images/network-arrow-right.svg)");
                    l.$diagram.css("background-image", "url(images/network-arrow-right.svg)");

                    break;
                case "O":
                case "Z":
                    l.$diagram.css("background-image", "url(images/network-arrow-left.svg)");
                    l.$diagram.css("background-image", "url(images/network-arrow-left.svg)");

                    break;
            }
        },


    }
})(window);


libConfig.setToolbar('#toolbar', "./assets/", "./catalogue/elements.yaml");
libConfig.setDiagram('#diagram');

$("#download").on("click",function(){
  libConfig.downloadSVG(uniqueStringFromTime());
});

$("#get-config-string").on("click",function(){
    str = libConfig.getConfigString();

    $("#config-string")
        .val(str)
        .attr('style', "width: " + (str.length)*0.6 + "em" );

});


// Helper function to provide a unique string based on the time stamp
function uniqueStringFromTime() {
    var d = new Date();
    var n = d.getTime();
    return n.toString(36); // Number to 36-base string.
}
