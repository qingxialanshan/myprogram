//configs

var path=require('path')
    Arborea=require('arboreal');

var config={
    'productFile':["rel/gpgpu/toolkit/r8.0/eris/batch/cudatools_r375_mobile.nightly", 
    "rel/gpgpu/toolkit/r8.0/eris/batch/cudatools_r375_mobile.weekly", "rel/gpgpu/toolkit/r8.0/eris/batch/cudatools_r375.weekly",
    "rel/gpgpu/toolkit/r8.0/eris/batch/cudatools_r375.nightly", "gpgpu/eris/batch/cudatools.nightly","gpgpu/eris/batch/cudatools.weekly"],
    'p4base':"/home/amyl/Perforce/amyl_amyl-Ubuntu-14_3227/sw",
    'vlcpFile':"gpgpu/eris/cuda.vlcp",
    'vlcpRef':{'$VULCAN_TOOLKIT_P4BASE':'/home/amyl/Perforce/amyl_amyl-Ubuntu-14_3227/sw/gpgpu','//sw':'/home/amyl/Perforce/amyl_amyl-Ubuntu-14_3227/sw','$VULCAN_DRIVER_P4BASE':'/home/amyl/Perforce/amyl_amyl-Ubuntu-14_3227/sw/dev/gpu_drv/cuda_a','$VULCAN_GIE_P4BASE':'/home/amyl/Perforce/amyl_amyl-Ubuntu-14_3227/sw/gpgpu/MachineLearning/DIT','$VULCAN_CAFFE_P4BASE':'/home/amyl/Perforce/amyl_amyl-Ubuntu-14_3227/sw/gpgpu/MachineLearning'},
    'depTrees':[]
    //'depTree':new Arborea('','','root')
}

module.exports=config;
