var Arboreal=require('arboreal');

var depTree=new Arboreal('','','root');  //create a tree
depTree.appendChild('','c1');
depTree.appendChild('','c2');
depTree.appendChild('','c3');
depTree.find('c1').appendChild('','sc1');

depTree.traverseDown(function(node){
    var indentation="";
    if (node.depth==0){
        console.log(node.id);
        return;
    }
    for (var i=0;i<node.depth;i++){
        indentation+='   ';
        console.log(indentation+node.id);
    }
});

console.log(depTree)
