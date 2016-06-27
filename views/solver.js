function get_stat(symbole) {
    var stat = $('#' + symbole).attr('class');

    if (stat === 'true') {
        return (1);
    }
    else if (stat === 'false') {
        return (-1);
    }
    return (0);
}

function get_brace(rule){
    var c = 1;
    var p = 1;

    do {
        switch (rule.substr(c, 1)){
            case (')'):
                p++;
                break;
            case ('('):
                p--;
                break;
        }
        c++;
    }while (p > 0);
    return (c);
}

function solver(rule) {
    var char = rule.substr(0, 1);
    var next;
    var test;

    if (char === ')'){
        test = solver(rule.substr(1));
        rule = rule.substr(get_brace(rule));
    }
    else {
        test = get_stat(char);
        rule = rule.substr(1);
    }

    if (rule.substr(0, 1) === '!') {
        test *= -1;
        rule = rule.substr(1);
    }

    next = rule.substr(0, 1);
    if (next) {
        if (next === '(') {
            return (test);
        }
        if (next === '+') {
            return (op_and(test, solver(rule.substr(1))));
        }
        if (next === '|') {
            return (op_or(test, solver(rule.substr(1))));
        }
        if (next === '^') {
            return (op_xor(test, solver(rule.substr(1))));
        }
    }
    return (test);
}