'use strict';

var promise=require('bluebird'),
    fs=promise.promisifyAll(require('fs')),
    fse=require('fs-extra'),
    Path=require('path'),
    Logger=require('mini-logger'),
    config=require('../config/config');
                
var dic={};
var depTree=config.depTree;

var gen_deptree=function(comp){
    if(depTree.find(comp)==null){
        depTree.appendChild('',comp);
    }

    var content = fs.readFileSync(Path.join(config.p4base,config.vlcpFile),'utf-8').toString();
        content.split('\n').forEach(function(line){
            
        if(line.indexOf(comp+'.vlcc')!=-1){
            line.split(' ').forEach(function(sline){
                if(sline.indexOf(comp+'.vlcc')!=-1){
                    var path1=sline.replace(/\"/g,"");
                        for (var val in config.vlcpRef){
                            if (path1.indexOf(val)!=-1){
                                var path2=path1.replace(val,config.vlcpRef[val]);
                                if(path2.indexOf('gpgpu_drv')==-1){
                                    if (fse.existsSync(path2)){
                                        console.log("not exist: ",path2)
                                    }else{
                                    var data=fs.readFileSync(path2).toString();
                                    var deps=data.replace(/\s*\n*/g,'').match(/\"depends\"\:\[.*?\]/);
                                    if(deps==null){
                                        return promise.resolve('null');
                                    }
                                    var deps1='{'+deps[0].replace(/\{.*?\},+/g,'')+'}';
                                        //.match(/\[\".*?\"\]/g);
                                    dic=JSON.parse(deps1);
                                    dic['name']=comp;
                                    var dep_list=dic['depends'];
                                    if(dep_list.length==0){
                                        //console.log('the depTree is: ',depTree)
                                        return promise.resolve(depTree);
                                    }else{
                                        dep_list.forEach(function(dep){
                                            depTree.find(comp).appendChild(dep)
                                            gen_deptree(dep);
                                        });
                                        //console.log(depTree.toArray());
                                    }
                                }}
                            }
                        }
                }
            })
        }
        })
};
module.exports=gen_deptree;
//gen_deptree('nvprof_tests_L0');
//console.log(depTree);
