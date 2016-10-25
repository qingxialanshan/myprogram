var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function getPost(){
            return fs.readFileAsync('a.txt', 'utf8').then(function(content){
                    return content.replace('test','me');
                                }).then(function(new_content){
                                console.log(new_content);
                                });
};
getPost()
