/**
 * Created by maartenvandervelde on 08/09/2017.
 */

var folderAssets = "./assets/";
var folderConfigs = "./config/";
var $toolbar = $("#toolbar");
var $diagram = $("#diagram");

(function ($) {

    // Laad een lijst met de namen en eigenschappen van de sluis-elementen
    $.getJSON(folderConfigs + "elements.json", function(data){
        var items = [];

        $.each(data, function (key, val) {
            id = val.name;
            $element = $("<li id='" + id + "'>"+id+"</li>").appendTo($toolbar);
            $element.load(folderAssets + id + ".svg" );
            makeDuplicatable(id);
        });

    });

    // jQuery-UI interactions: allow for drag-and-drop and duplication of lock elements

    function makeDuplicatable (id) {
        $("#" + id).draggable({
            helper: 'clone',
            revert: "invalid"
        }).css("outline","1px solid #eee");
    }

    $diagram.droppable({
        drop: function(event, ui) {
            if (ui.draggable[0].id) {
                $(this).append($(ui.helper).clone().draggable());
                $(this).css("outline","1px solid green");
            }
        }
    });

    $diagram.sortable();

})(jQuery);
