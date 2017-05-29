(function(win){

    var global  = win;
    var doc     = this.document;

    var $noon   = function(params, context){
        return new GetorMakeDom(params, context);
    }; // creating the $noon object

    var regXContainsTag = /^\s*<(\w+|!)[^>]*>/;

    var GetorMakeDom = function(params, context){

        var currentContext = doc;
            if(context){
                if(context.nodeType){ // it's either a document node or element node
                    currentContext = context;
                }else{ // it's a string selector, use it to select a node
                    currentContext = doc.querySelectorAll(context);
                }
            }

            // if no params, return empty $noon() object
            if(!params || params === '' || typeof params === 'string' && params.trim() === ''){
                this.length = 0;
                return this;
            }

            //if params is HTML string, construct domFragment, fill object, tehn return object
            if(typeof params === 'string' && regXContainsTag.test(params)){
                //yup it's for sure html string
                /* create div and docfrag, append div to docfrag, then set its div's innerHTML
                 to the string, then get first child */
                 var divElm = currentContext.createElement('div');
                 divElm.className = "hippo-doc-frag-wrapper";
                 var docFrag = currentContext.createDocumentFragment();
                 docFrag.appendChild(divElm);
                 var queryDiv = docFrag.querySelector('div');
                 queryDiv.innerHTML = params;
                 var numberOfChildren = queryDiv.children.length;
                 /** loop over nodelist and fill object, needs to be done because a string of html
                  * can be passed with siblings
                  */
                for (var i=0; i<numberOfChildren; i++){
                    this[i] = queryDiv.children[i];
                }
                // Give the object a length value
                this.length = numberOfChildren;
                // return object
                return this; // return e.g. {0:ELEMENT_NODE, 1:ELEMENT_NODE, length:2}
            }

            // if a single node reference is passed, fill object, return object
            if(typeof params === 'object' && params.nodeName){
                this.length = 1;
                this[0] = params;
                return this;
            }

            /**
             * if it's an object but not a node assume nodelist or array, 
             * else it's a string selector, so create nodelist
             */
            var nodes;
            if(typeof params !== 'string'){ // nodelist or array
                nodes = params;
            }else{
                nodes = currentContext.querySelectorAll(params.trim());
            }

            // loop over array or nodelist created above and fill object
            var nodeLength = nodes.length;
            for (var z = 0; z < nodeLength; z++){
                this[z] = nodes[z];
            }
            // give the object a length value
            this.length = nodeLength;
            // return object
            return this;

    }; // Creating the GetorMakeDom constructor

    //Exposes $noon to global scope
    global.$noon = $noon;

    // short cut to prototype
    $noon.fn = GetorMakeDom.prototype;

    $noon.fn.each = function (callback) {
        var len = this.length;
        for(var i = 0; i < len; i++){
            callback.call(this[i], i, this[i]);
        }
        return this; /* make it chainable by returning e.g.,
        {0:ELEMENT_NODE,1:ELEMENT_NODE,length:2} */
    };

    $noon.fn.html = function(htmlString){
        if(htmlString){
            return this.each(function(){ /* notice I return this so it's chainable if
                called with param */
                this.innerHTML = htmlString;
            });
        }else{
            return this[0].innerHTML;
        }
    };

    $noon.fn.text = function(textString){
        if(textString){
            return this.each(function(){ /* notice I return this so it's chainable if
                called with param */
                this.textContent = textString;
            });
        }else{
            return this[0].textContent.trim();
        }
    };

    $noon.fn.append = function(stringOrObject){
        return this.each(function(){
            if(typeof stringOrObject === 'string'){
                this.insertAdjacentHTML('beforeend',stringOrObject);
            }else{
                var that = this;
                $noon(stringOrObject).each(function(name,value){
                    that.insertAdjacentHTML('beforeend',value.outerHTML);
                });
            }
        });
    };

})(window); // Creating a unique scope