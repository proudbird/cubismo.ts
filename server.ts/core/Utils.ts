import _ from "lodash";
import ShortId from "shortid";

global["Utils"] = _;

function guid() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = Math.random() * 16 | 0,
      v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
} _.mixin({ 'guid': guid }, { 'chain': false });

function shortId () {
  return ShortId.generate();
} _.mixin({ 'shortId': shortId }, { 'chain': false });
  _.mixin({ 'sid': shortId }, { 'chain': false }); // alias