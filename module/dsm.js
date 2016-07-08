function $noon(selector, all){
	var nono = {};
	nono.selected = selector;
	if(!all){
		nono.element = document.querySelector(nono.selected);
	}else if(all === '.'){
		nono.element = document.querySelectorAll(nono.selected);
	}

	nono.attr = function(name, value){
		if(!value){
			return nono.element.getAttribute(name);
		}else{
			nono.element.setAttribute(name,value);
		}
		return nono;
	};

	nono.css = function(prop, value){
		if(!value){
			if(nono.element.length > 1){
				var tab = [];
				for(var i=0, len = nono.element.length; i<len; i++){
					tab.push(getComputedStyle(nono.element[i], null)[prop]);
				}
				return tab;
			}else{
				return getComputedStyle(nono.element, null)[prop];
			}
		}else{
			if(nono.element.length > 1){
				for(var i=0, len = nono.element.length; i<len; i++){
					nono.element[i].style[prop] = value;
				}
			}else{
				(!nono.created) ? nono.element.style[prop] = value : nono.created.style[prop] = value;
			}
		}
		return nono;
	};

	nono.create = function(tag){
		nono.created = document.createElement(tag);
		return nono;
	};

	nono.showText = function(msg){
		nono.created.innerText = msg;
		nono.created.textContent = msg;
		return nono;
	};

	nono.stick = function(){
		nono.element.appendChild(nono.created);
		return nono;
	};

	nono.text = function(msg){
		nono.element.innerText = msg;
		nono.element.textContent = msg;
		return nono;
	};

	return nono;
}