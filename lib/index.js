var Client = require('node-rest-client').Client;

var client = new Client();

// shutdown1();
// countDocuments();
// insertData();
getData();
// searchData();
searchDataDSL();

function shutdown() {
    var args = {
        data: {},
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://localhost:9200/_shutdown", args, function (data, response) {
        console.log(data);
    });
}

function shutdown1() {
    client.get("http://localhost:9200/_shutdown", function (data, response) {
        console.log(data);
    });
}

function countDocuments() {
    var args = {
        data: {
        "query": {
            "match_all": {}
        } },
        headers: { "Content-Type": "application/json" }
    };
    client.post("http://localhost:9200/_count", args, function (data, response) {
        console.log(data);
    });

}

function insertData() {
    var args = {
        data:
        {
            "first_name" : "John",
            "last_name" :  "Smith",
            "age" :        25,
            "about" :      "I love to go rock climbing",
            "interests": [ "sports", "music" ]
        }

        ,headers: { "Content-Type": "application/json" }
    };
    client.put("http://localhost:9200/megacorp/employee/1", args, function (data, response) {
        console.log(data);
    });
}

function getData() {
    client.get("http://localhost:9200/megacorp/employee/1", function (data, response) {
        console.log(data);
    });
}

function searchData() {
    client.get("http://localhost:9200/megacorp/employee/_search", function (data, response) {
        console.log(data);
    });
}

function searchDataDSL() {
    var args = {
        data:
        {
            "query" : {
                "match" : {
                    "last_name" : "Smith"
                }
            }
        }
        ,headers: { "Content-Type": "application/json" }
    };
    client.registerMethod("getMethod", "http://localhost:9200/megacorp/employee/_search", "GET");
    client.methods.getMethod(args, function (data, response) {
        console.log(data);
    });
}

function fulltextSearchDSL() {
    var args = {
        data:
        {
            "query" : {
                "match" : {
                    "last_name" : "Smith"
                }
            }
        }
        ,headers: { "Content-Type": "application/json" }
    };
    client.registerMethod("getMethod", "http://localhost:9200/megacorp/employee/_search", "GET");
    client.methods.getMethod(args, function (data, response) {
        console.log(data);
    });
}
