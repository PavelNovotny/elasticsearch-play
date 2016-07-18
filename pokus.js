/**
 *
 * Created by pavelnovotny on 14.07.16.
 */

var addressString = '{"address":[{"aaa": "aaaa", "bbb":"bbb"},{"ccc": "cccc", "ddd":"ddd"}]}';
var customerString = '{"neco": "neco"}';

var address = JSON.parse(addressString);

console.log(address);
var customer = JSON.parse(customerString);
customer.address = address.address;
console.log(customer);


