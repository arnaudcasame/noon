(function(win){

    let global  = win;
    let doc     = this.document;

    let $noon   = function(params, context){
        return new GetorMakeDom(params, context);
    }; // creating the $noon object

    let GetorMakeDom = function(params, context){

    }; // Creating the GetorMakeDom constructor

    //Exposes $noon to global scope
    global.$noon = $noon;

    // short cut to prototype
    $noon.fn = GetorMakeDom.prototype;

})(window); // Creating a unique scope