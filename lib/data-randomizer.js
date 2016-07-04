/**
 * 
 * Created by pavelnovotny on 30.06.16.
 */
var data = require('./data.js');

function randomInt(maxLen) {
    var rand = Math.random();
    return Math.floor(rand * maxLen);
};

var addressId = 0;
var customerId = 0;
var customerAccountId = 0;
var subjectId = 0;
var subjectFullId = 0;

exports.randomizeAddress =  randomizeAddress;
exports.randomizeCustomer = randomizeCustomer;
exports.randomizeCustomerAccount =  randomizeCustomerAccount;
exports.randomizeSubject =  randomizeSubject;
exports.randomizeSubjectFull =  randomizeSubjectFull;

function randomizeAddress() {
    return {
        "id":addressId++,
        "addressType":data.addressType[randomInt(data.addressType.length)],
        "buildingNo":data.buildingNo[randomInt(data.buildingNo.length)],
        "city":data.city[randomInt(data.city.length)],
        "country":data.country[randomInt(data.country.length)],
        "street":data.street[randomInt(data.street.length)],
        "zip":data.zip[randomInt(data.zip.length)]
    };
};

function randomizeCustomer() {
    return {
        "id" : customerId++,
        "cuRefNo": data.cuRefNo[randomInt(data.cuRefNo.length)],
        "customerAccounts": randomizeCustomerAccountsArray(),
        "permanentAddress": randomInt(addressId),
        "sfaId": data.sfaId[randomInt(data.sfaId.length)]
    }
};

function randomizeCustomerAccount() {
    return {
        "id": customerAccountId++,
        "address": randomizeAddressArray(),
        "cacRefNo": data.cacRefNo[randomInt(data.cacRefNo.length)],
        "paymentResponsible": data.paymentResponsible[randomInt(data.paymentResponsible.length)]
    }
}

function randomizeSubject() {
    return {
        "id": subjectId++,
        "customer": randomInt(customerId),
        "firstName":data.first_names[randomInt(data.first_names.length)],
        "identNum":data.identNum[randomInt(data.identNum.length)],
        "lastName":data.last_names[randomInt(data.last_names.length)],
        "subjectType":data.subjectType[randomInt(data.subjectType.length)]
    }
}

function randomizeSubjectFull() {
    return {
        "id": subjectFullId++,
        "address": randomizeAddress(),
        "customer":randomizeCustomer(),
        "customerAccount":randomizeCustomerAccount(),
        "subject":randomizeSubject()
    }
}

function randomizeAddressArray() {
    var randomLen = randomInt(2);
    var addresses = [];
    for (var i = 0; i< randomLen; i++) {
        addresses.push(randomInt(addressId));
    }
    return addresses;
}

function randomizeCustomerAccountsArray() {
    var randomLen = randomInt(10);
    var customerAccounts = [];
    for (var i = 0; i< randomLen; i++) {
        customerAccounts.push(randomInt(customerAccountId));
    }
    return customerAccounts;
}


