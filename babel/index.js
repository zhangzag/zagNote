var babel = require("babel-core");

let options = {}

babel.transformFile("test.js", options, function(err, result) {
    console.log(result.code); // => { code, map, ast }
});