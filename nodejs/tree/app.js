'use strict';
var promise=require('bluebird'),
    config=require('./config/config'),
    genDepComps=require('./src/gen_deptree'),
    Arborea=require('arboreal'),
    gen=require('./src/gen');

var infiles=[];
config.productFile.forEach(function (p) {
    infiles.push(config.p4base+'/'+p);
});

var deptrees=config.depTrees;

var comps=[];

promise.each(infiles, function(fname, idx,len){
    //perpare the testsuite list
    comps=comps || gen(fname,comps);
    gen(fname,comps);
    return comps
}).then(function(){
    return promise.resolve(genDepComps(comps));
}).then(function(trees){
    //console.log("the return is",trees.length);
    trees.forEach(function(tree){
         console.log("####");
         console.log(tree.root().id);
         console.log(tree.toArray());
    })
    console.log('The tree is:',deptrees);
    
    //log for debugger
    
    //console.log(config.depTree.find('cupti_tests_L0'));
    //console.log("cupti_test_L0 children is\n",config.depTree.find('cupti_tests_L0').toString());
}).catch(function(e){
    console.log('exception:'+e);
}).finally(function(){
    
});


