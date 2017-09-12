/**
 * Created by maartenvandervelde on 08/09/2017.
 */

// Configuration
var folderAssets = "./assets/";
var folderConfigs = "./config/";
var $toolbar = $("#toolbar");
var $diagram = $("#diagram");


(function ($) {
    var observer = new MutationObserver( removeSize );

    // Laad een lijst met de namen en eigenschappen van de sluis-elementen
    $.getJSON(folderConfigs + "elements.json", loadElements );

    // Laad de SVG-file's met tekeningen van de sluis-componenten
    function loadElements(data){

        countElements = data.length;

        $.each(data, function (key, val) {
            id = val.name;
            var $element = $("<li id='" + id + "'>"+id+"</li>").appendTo($toolbar);
            $element.load(folderAssets + id + ".svg" );

            // When the SVG is rendered, rework the SVG
            observer.observe( $element[0], { childList: true } );

            $element.draggable({
                connectToSortable: "#diagram",
                helper: "clone",
                revert: "invalid"
            });


        });
    }

    observer.disconnect();

    // jQuery-UI interactions: allow for drag-and-drop and duplication of lock elements
    $diagram.sortable({
        revert: true
    });


    $( "ul, li" ).disableSelection();

    // remove size
    function removeSize(mutationRecords){
        var $li = $(mutationRecords["0"].target);
        var $svg = $li.find("svg");
        var w = $svg.attr("width");
        $svg.attr('width',w/2);
    }



})(jQuery);