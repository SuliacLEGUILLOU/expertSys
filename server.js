var fs      = require('fs');
var express = require('express');
var ftadd   = require('./ft_add.js');

var server  = express();

server.use("/views", express.static(__dirname + '/views'));
server.get('/open-:file', function(req, res) {
    var rules;
    var events;
    var query;
    var init;
    var elem;

    if (req.query.def_stat && (req.query.def_stat != 'true' && req.query.def_stat != 'false')){
        res.send('Default status error');
    }
    else {
        fs.readFile(req.params.file, 'utf8', function (err, data) {
            if (err) {
                console.log("Error: no file");
                res.send("File doesn't exist");
            }
            else {
                console.log("File found");
                rules = ftadd.add_rules(data.split("\n"));
                if (typeof rules === "string") {
                    res.send("Syntax error on: '" + rules + "'");
                    return (1);
                }
                events = ftadd.add_event(rules);
                if (typeof events === "string") {
                    res.send('Infinite loop detected on: ' + events + 'element');
                    return (1);
                }
                query = ftadd.add_query(data.split("\n"), events);
                if (query === -1) {
                    res.send('Incorrect query');
                    return (1);
                }
                init = ftadd.add_init(data.split("\n"), events);
                if (init === -1) {
                    res.send('Incorrect initialisation');
                    return (1);
                }
                elem = ftadd.count_elem(events);

                console.log("rules:");
                for (var key in rules) {
                    console.log(key + ": " + rules[key]);
                }
                console.log("\nevents:");
                for (key in events) {
                    console.log(key + ": " + events[key]);
                }
                console.log("init: " + init);
                console.log("query: " + query);
                console.log("elem: " + elem);

                elem = elem.split('').sort();
                res.render('base.ejs', {
                    rules: rules,
                    events: events,
                    init: init,
                    query: query,
                    elem: elem,
                    def_stat: req.query.def_stat
                });
            }
        });
    }
});

server.listen(8080);