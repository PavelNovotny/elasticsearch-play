/**
 *
 * Created by pavelnovotny on 29.06.16.
 */

var index = require("../lib/index.js");

console.log(index.expandPath("$SCRIPT_DIR/data/bulk.txt"));
console.log(index.expandPath("/rrr/bbb/$SCRIPT_DIR/dathhhhha/bulk.txt"));
console.log(index.expandPath("/rrr/bbb/dathhhxxxxxhha/bulk.txt"));
console.log(index.expandPath("/afsdfds_afdfsd"));
console.log(index.expandPath(undefined));
console.log(index.expandPath(null));
console.log(index.expandPath("$SCRIPT_DIR"));

