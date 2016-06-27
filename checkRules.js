
module.exports = {
    checkRule: function(rule){
        rule = rule.split('');
        var brace = 0;
        var status = 0;

        for (var val in rule) {
            if (status & 1) {
                if (rule[val] === ')') {
                    brace--;
                }
                else if (rule[val].match(/[+|^]/) && rule[1 + parseInt(val)]) {
                    status++;
                }
                else {
                    return (false);
                }
            }
            else {
                if (rule[val].match(/[\+\|\^]/)) {
                    return (false);
                }
                else if (rule[val] === '!') {
                    if (!rule[1 + parseInt(val)] || rule[1 + parseInt(val)] === '!') {
                        return (false);
                    }
                    continue;
                }
                else if (rule[val] === '(') {
                    brace++;
                    status++;
                }
                status++;
            }
            if (brace < 0) {
                return (false);
            }
        }
        return (!brace);
    },

    checkResult: function(rule) {
        if (rule.match(/^!?\w(\+!?\w)*$/)) {
            return (true);
        }
        return (false);
    }
};