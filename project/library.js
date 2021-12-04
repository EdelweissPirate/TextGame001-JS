function init_library(){
    var lib = AdobeAn.getComposition(AdobeAn.bootcompsLoaded[0]).getLibrary();
    props.library = lib;
};