var test = require("./checkRules.js");

function check_val(chr, tab){
    for (i in tab){
        for (j in tab[i]){
            if (tab[i][j] === chr){
                return (false);
            }
        }
    }
    return (true);
}

module.exports = {
    add_event: function (rules){
        var new_event = {};
        var tmp = {};

        for (var key in rules){
            tmp[key] = rules[key].split(/[\+\|\^!\(\)]/g).sort().filter(function(item, pos, ary) {
                return !pos || item != ary[pos - 1];
            });
            for (var key2 in tmp[key]){
                if (tmp[key][key2]) {
                    if (!new_event[tmp[key][key2]]) {
                        new_event[tmp[key][key2]] = [];
                    }
                    new_event[tmp[key][key2]].push(key);
                }
            }
        }

        return (new_event);
    },

    add_rules: function (rules){
        var new_rules = {};
        var str;
        var tmp;

        for (key in rules) {
            tmp = rules[key].replace(/\s/g, '').split('#');
            tmp = tmp[0];
            if (tmp.substr(0,1) && tmp.substr(0,1) !== '=' && tmp.substr(0,1) !== '?') {
                tmp = tmp.split('=>');
                if (!test.checkRule(tmp[0] || !test.checkResult(tmp[1]))){
                    return (rules[key]);
                }
                tmp[1] = tmp[1].split('+');
                for (key2 in tmp[1]) {
                    if (!tmp[1][key2]){
                        return (rules[key]);
                    }
                    str = '(' + tmp[0] + ')';
                    if (tmp[1][key2].substr(0, 1) === '!'){
                        str = '!' + str;
                        tmp[1][key2] = tmp[1][key2].substr(1);
                    }
                    if (new_rules.hasOwnProperty(tmp[1][key2])){
                        new_rules[tmp[1][key2]] += '|' + str;
                    }
                    else {
                        new_rules[tmp[1][key2]] = str;
                    }
                }
            }
        }
        return (new_rules);
    },

    add_query: function(rule, reference){
        var new_query = false;

        for (var key in rule){
            rule[key] = rule[key].replace(/\s/g, '').split('#');
            rule[key] = rule[key][0];
            if (rule[key].substr(0, 1) === '?' && !new_query){
                new_query = rule[key].substr(1);
            }
            else if (rule[key].substr(0, 1) === '?' && new_query){
                return (-1);
            }
        }
        if (new_query) {
            var tmp = new_query.split('');
            for (key in tmp) {
                if (check_val(tmp[key], reference)) {
                    return (-1);
                }
            }
        }
        return (new_query);
    },

    add_init: function(rules, reference){
        var new_init = false;

        for (var key in rules){
            rules[key] = rules[key].replace(/\s/g, '').split('#');
            rules[key] = rules[key][0];
            if (rules[key].substr(0, 1) === '=' && !new_init){
                new_init = rules[key].substr(1);
            }
            else if (rules[key].substr(0, 1) === '=' && new_init){
                return (-1);
            }
        }
        if (new_init) {
            var tmp = new_init.split('');
            for (key in tmp) {
                if (tmp[key] != '!' && !reference.hasOwnProperty(tmp[key]) && check_val(tmp[key], reference)) {
                    return (-1);
                }
            }
        }
        return (new_init);
    },

    count_elem: function(events){
        var elem = '';

        for (var key in events){
            if (elem.indexOf(key) === -1){
                elem += key;
            }
            for (var key2 in events[key]){
                if (events[key][key2] && elem.indexOf(events[key][key2]) === -1){
                    elem += events[key][key2];
                }
            }
        }
        return (elem);
    }
};