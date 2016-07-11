var Client = require('node-rest-client').Client;
var randomizer = require('./data-randomizer.js');
var async = require('async');
var fs = require('fs');
var nconf = require('nconf');

var client = new Client();

var addressCount = 1000;
var customerAccountCount = 1000;
var customerCount = 1000;
var subjectCount = 1000;
var subjectFullCount = 1000;

nconf.argv()
    .env()
    .defaults({ env : 'production' })
    .file({ file: 'config-'+nconf.get('env')+'.json' });

// shutdown1();
// countDocuments();
// insertData();
// getData();
// searchData();
// searchDataDSL();
//insertRandomMultDocumentData();
//insertRandomOneDocumentData();

process.argv.forEach(function (val, index, array) {
    console.log(index + ': ' + val);
    if (val === "one-document") {
        insertRandomOneDocumentData();
    } else if (val === "mult-document") {
        insertRandomMultDocumentData();
    } else if (val === "bulk") {
        insertBulkData(function(){
            console.log("Bulk finished");
        });
    }
});


function insertBulkData(callback) {
    fs.readFile('bulk.txt', function (err, data) {
        if (err) return console.log(err);
        console.log(data.toString());
        var args = {
            data: data.toString()
        };
        client.post(nconf.get('listen-address')+":"+nconf.get('listen-port')+"/_bulk", args, function (data, response) {
            console.log(data);
            callback();
        });
    });
}


function insertRandomOneDocumentData() {
    var subjectFullFunc = [];
    for (var i = 0; i < subjectFullCount; i++) {
        subjectFullFunc.push(function (callback) {
            var subjectFull = randomizer.randomizeSubjectFull();
            console.log(subjectFull);
            insertData(subjectFull, "/ods/subjectComplete", callback);
        });
    }
    async.series(subjectFullFunc,
        function (err, results) {
            console.log("Finished subjectComplete");
        }
    );
}

function insertRandomMultDocumentData() {
    var addressFunc = [];
    for (var i=0; i<addressCount; i++) {
        addressFunc.push(function(callback) {
            var address = randomizer.randomizeAddress();
            console.log(address);
            insertData(address,"/ods/address", callback);
        });
    }
    async.series(addressFunc,
        function(err, results){
            console.log("Finished addresses");
        }
    );

    var customerAccountFunc = [];
    for (var i=0; i<customerAccountCount; i++) {
        customerAccountFunc.push(function(callback) {
            var customerAccount = randomizer.randomizeCustomerAccount();
            console.log(customerAccount);
            insertData(customerAccount,"/ods/customerAccount", callback);
        });
    }
    async.series(customerAccountFunc,
        function(err, results){
            console.log("Finished customerAccounts");
        }
    );


    var customer = [];
    for (var i=0; i<customerCount; i++) {
        customer.push(function(callback) {
            var customer = randomizer.randomizeCustomer();
            console.log(customer);
            insertData(customer,"/ods/customer", callback);
        });
    }
    async.series(customer,
        function(err, results){
            console.log("Finished customer");
        }
    );

    var subject = [];
    for (var i=0; i<subjectCount; i++) {
        subject.push(function(callback) {
            var subject = randomizer.randomizeSubject();
            console.log(subject);
            insertData(subject,"/ods/subject", callback);
        });
    }
    async.series(subject,
        function(err, results){
            console.log("Finished subject");
        }
    );
}

function insertData(data, path, callback) {
    var args = {
        data: data,
        headers: { "Content-Type": "application/json" }
    };
    client.put(nconf.get('listen-address')+":"+nconf.get('listen-port')+path+"/"+data.id, args, function (data, response) {
        console.log(data);
        callback();
    });
}

function getData(path, id) {
    client.get(nconf.get('listen-address')+":"+nconf.get('listen-port')+path+"/"+id, function (data, response) {
        console.log(data);
    });
}

function searchData() {
    client.get(nconf.get('listen-address')+":"+nconf.get('listen-port')+"/_search", function (data, response) {
        console.log(data);
    });
}

function searchDataDSL(query) {
    var args = {
        data: query,
        headers: { "Content-Type": "application/json" }
    };
    client.registerMethod("getMethod", nconf.get('listen-address')+":"+nconf.get('listen-port')+"/_search", "GET");
    client.methods.getMethod(args, function (data, response) {
        console.log(data);
    });
}

function shutdown() { //nějak nefunguje
    var args = {
        data: {},
        headers: { "Content-Type": "application/json" }
    };
    client.post(nconf.get('listen-address')+":"+nconf.get('listen-port')+"/_shutdown", args, function (data, response) {
        console.log(data);
    });
}


