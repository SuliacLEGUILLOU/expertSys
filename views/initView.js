$(document).ready(function(){
    var elem;

    while (elem = init.substr(0, 1)) {
        if (elem === '!'){
            $('#' + init.substr(1, 1)).attr("class", "false");
            init = init.substr(2);
        }
        else {
            $('#' + elem).attr("class", "true");
            init = init.substr(1);
        }
    }

    for (var key in table){
        update(table[key]);
    }

    for (key in query){
        $('#' + query[key]).css('border', 'solid 3px blue');
    }

    // Setting each element so they change state on click
    $("div[id]").click(function(){
        if ($(this).attr("class") === "true") {
            $(this).attr("class", "false");
        }
        else if ($(this).attr("class") === "false"){
            $(this).attr("class", "no");
        }
        else {
            $(this).attr("class", "true");
        }
    });
    $("div[id]").mouseleave(function(){
        update(($(this)).attr("id"));
    });
});