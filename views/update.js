var count = 0;
var paradox = false;
var infinite = false;
var table = init.replace('!', '').split('');

function check(idElem) {
    var type = solver(rules[idElem].split("").reverse().join(''));
    var status;

    if (type == 1) {
        $('#' + idElem).attr("class", 'true');
        status = 'true';
    }
    else if (type == -1) {
        $('#' + idElem).attr("class", 'false');
        status = 'false';
    }
    else {
        $('#' + idElem).attr("class", '');
        status = '';
    }
    update(idElem);
    if ($('#' + idElem).attr("class") != status && !paradox){
        paradox = true;
        alert("Paradox detected !");
    }
}

function update(idElem) {
    count++;
    if (count > (limit) && !paradox && !infinite) {
        infinite = true;
        alert("Infinite loop detected: propagation interrupted\n!!! Result may not be relevant anymore !!!");
    }
    else if (!paradox && !infinite) {
        for (var x in events[idElem]) {
            check(events[idElem][x]);
        }
    }
    count--;
}