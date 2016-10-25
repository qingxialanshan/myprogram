'use strict';

var promise=require('bluebird'),
    fs=promise.promisifyAll(require('fs')),
    fse=require('fs-extra'),
    Path=require('path'),
    Logger=require('mini-logger'),
    spawn=require('cross-spawn-promise'),
    Arborea=require('arboreal'),
    config=require('../config/config');
                
var dic={};
var depTrees=config.depTrees;

var depTree=new Arborea('','','root');
var gen_deptree=function(comp){
    //console.log("teh deptree is:",depTree);
    //depTree=new Arborea('','',comp);
    if(depTree.find(comp)==null){
        depTree.appendChild('',comp);
    
    }
    //depTree=depTree || new Arborea('','',comp);
    
    var content = fs.readFileSync(Path.join(config.p4base,config.vlcpFile),'utf-8').toString();
    var content_list=content.split('\n');
    for(var k=0;k<content_list.length;k++){
        var line=content_list[k];
        if(line.indexOf(comp+'.vlcc')!=-1){
            //line.split(' ').forEach(function(sline){
            var line_list=line.split(' ');
            for (var i=0;i<line_list.length;i++){
                var sline=line_list[i];    
                if(sline.indexOf(comp+'.vlcc')!=-1){
                    var path1=sline.replace(/\"/g,"");
                        for (var val in config.vlcpRef){
                            if (path1.indexOf(val)!=-1){
                                var path2=path1.replace(val,config.vlcpRef[val]);

                                //p4 sync the files
                                var p4_path=path2.replace(config.p4base,"//sw");
                                
                                // spawn('p4', ['sync',p4_path+"#head"]).then(function(v){
                                //     console.log("p4 path is",p4_path);
                                //     //console.log("p4 result:",v);
                                // }).catch(function(e){
                                //     console.log("p4 sync error:",e)
                                // }).then(function(){

                                //if(path2.indexOf('gpgpu_drv')==-1){
                                    if (!fse.existsSync(path2)){
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
                                        for(var j=0;j<dep_list.length;j++){
                                            var dep=dep_list[j];
                                            //console.log(depTree.find(comp));
                                            if(depTree.find(comp)==null ||depTree.find(comp).find(dep)==null){
                                                depTree.find(comp).appendChild('',dep);
                                            }
                                            if (comp=="cupti_tests_L0"){
                                                //console.log(depTree.find(comp))
                                            }
                                            //depTree.find(comp).appendChild(dep);
                                            gen_deptree(dep);
                                        };
                                    }
                                }
                                };
                            }
                        }
                }
            }
        }
        
};



var genDepComps=function(comps){
    for (var i=0;i<comps.length;i++){
        var comp=comps[i];
        depTree=new Arborea("","",comp);
        if (comps[i]=="nvprof_32on64_tests_L0"){
            console.log("now in nvprof_32on64_tests_L0");
        }
        gen_deptree(comp);
        depTrees.push(depTree);
    }
        return depTrees;
}


module.exports=genDepComps
//genDepComps(["cupti_tests_L0","cupti_tests_L1"])