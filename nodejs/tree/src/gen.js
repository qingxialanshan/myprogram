'use strict';
var fs=require('fs');
var promise=require('bluebird');

var gen=function(fname,comps){
    var data=fs.readFileSync(fname);
    data=data.toString().replace(/\s*\n*/g,'').match(/\"plan\".*/);
    var regExp=/\[\".*?\"\]/g;
    var res=data.toString().match(regExp);
    var dic=[];
    if(fname.indexOf("nightly")!=-1){
        dic=res[2].replace(/[\[\]\"]/g,'').split(',');
    }else{
        for(var i=0;i<res.length;i++){
            var r=res[i].replace(/[\[\"\]]/g,'');
            dic.push(r);
        }
        //dic=res.replace(/[\[\]\"]/g,'').split(',');
    }
    
    for (var i=0;i<dic.length;i++){
            if(comps.indexOf(dic[i])==-1){
                comps.push(dic[i]);    
            }
    }
    return comps;
};

module.exports=gen;