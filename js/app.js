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
            $li = $("<li class='element' id='" + id + "'>"+id+"</li>").appendTo($toolbar)
                .attr("title",id)
                .draggable(options)
                .attr("data-shift",val.shift )
                .load(folderAssets + id + ".svg" );

            // After the SVG is rendered, rework the SVG
            observer.observe( $li[0], { childList: true } );
        });
    }

    // jQuery-UI interactions: allow for drag-and-drop and duplication of lock elements
    $diagram.sortable({ revert: true,  stop: diagramChanged });
    $diagram.find("li").disableSelection();
    $toolbar.find("li").disableSelection();

    // Nadat elementen zijn toegevoegd of gewijzigd: verander de tekening

    function diagramChanged(event, ui){
        $diagramElements = $diagram.find(".element");
        var shift = 0;

        for (i=0; i<$diagramElements.length; i++){
            var $me = $diagramElements.eq(i);
            var $svg = $me.find("svg")
            var viewbox = $svg.attr("viewBox");

            if (viewbox !== undefined ) {
                viewbox = viewbox.split(" ");
                viewbox[1] = shift*-24;
                $svg.attr("viewBox", viewbox.join(" "));
                shift += ($me.attr("data-shift")*1.0);
            }

            $me.attr("data-order",i);
        }

    }

    // change size
    function elementRendered(mutationRecords){
        var $li = $(mutationRecords["0"].target);
        var $svg = $li.find("svg");

        // Use half the width and remove the height
        var w = $svg.attr("width");
        $svg.attr('width',w/2)
        $svg.removeAttr("height");

        // Add text element


        countElementsRendered++;
        if ( countElementsRendered == elements.length ) {
            observer.disconnect();
        }

    }
})(jQuery);

