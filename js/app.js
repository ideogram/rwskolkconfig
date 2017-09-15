/**
 * Created by maartenvandervelde on 08/09/2017.
 */

// Configuration
const folderAssets = "./assets/";
const folderConfigs = "./config/";
const $toolbar = $("#toolbar");
const $diagram = $("#diagram");

// Variables
var elements = [];
var countElementsRendered = 0;


const options = { connectToSortable: "#diagram", helper: "clone", revert: "invalid" };



(function ($) {
    var observer = new MutationObserver( elementRendered );

    // Laad een lijst met de namen en eigenschappen van de sluis-elementen
    $.getJSON(folderConfigs + "elements.json", loadElements );

    // Laad de SVG-file's met tekeningen van de sluis-componenten
    function loadElements(data){

        elements = data;

        countElements = elements.length;

        $.each(elements, function (key, val) {
            id = val.name;
            $li = $("<li class='element'></li>").appendTo($toolbar)
                .attr("title",id)
                .draggable(options)
                .attr( "data-ref", key )
                .load(folderAssets + id + ".svg" );

            // After the SVG is rendered, rework the SVG
            observer.observe( $li[0], { childList: true } );
        });
    }

    // jQuery-UI interactions: allow for drag-and-drop and duplication of lock elements
    $diagram.sortable({ revert: true,  stop: diagramChanged });
    $diagram.find("li").disableSelection();
    $toolbar.find("li").disableSelection();

    // change size of the svg-elements
    function elementRendered(mutationRecords){
        var $li = $(mutationRecords["0"].target);
        var $svg = $li.find("svg");
        var id = $svg.attr("id");

        // Use half the width and remove the height
        var w = $svg.attr("width");
        $svg.attr('width',w/2)
        $svg.removeAttr("height");

        countElementsRendered++;
        if ( countElementsRendered == elements.length ) {
            observer.disconnect();
        }
    }

    // Nadat elementen zijn toegevoegd of gewijzigd: verander de tekening
    function diagramChanged(event, ui){
        shiftElements();
        moveDiagramUp();
        annotateGates();
        alignAnnotations();

    }

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

    function annotateGates(){
        var $diagramElements = $diagram.find(".element");
        var gateCount = 0;

        for (i=0; i<$diagramElements.length; i++){
            var $me = $diagramElements.eq(i);
            var data = elements[ $me.attr("data-ref") ];
            var gate = data['gate'];
            var $svg = $me.find("svg");

            if ( gate == "1"){
                $svg.find("text").html( String.fromCharCode(gateCount+65) );
                gateCount++;
            } else if (gate == "S") {
                $svg.find("text").html("S");
            }
        }

    }

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
            var deltay  = data['deltay'];
            var bottom  = data['bottom'];
            var name    = data['name'];
            var shift   = $me.data('shift');
            lowest = Math.max(lowest, bottom+shift);
        }

        // Next, put annotations on this lowest point
        for (i=0; i<$diagramElements.length; i++) {
            $me = $diagramElements.eq(i);
            var gate    = data['gate'];
            var $svg = $me.find("svg");

            shift   = $me.data('shift');

            $svg.find("text").attr("y",(lowest-shift+2)*24);




        }


    }



})(jQuery);

