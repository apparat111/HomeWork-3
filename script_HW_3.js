"use strict";

class Lamp {        
   constructor(name) {
      this._type = 'ЛАМПА';
	  this._state = false;
      this._name = name;
    }
   on() {
      this._state = true;
   }
   off() {
      this._state = false;
   }
   get state() {
      return this._state;
   }
   get name() {
      return this._name;
   }
	get type() {
      return this._type;
   }
   
}


class TvSet {        
   constructor(name) {
      this._type = 'ТЕЛЕВИЗОР';
	  this._state = false;
      this._name = name;
      
   }
   on() {
      this._state = true;
   }
   off() {
      this._state = false;
   }
   get state() {
      return this._state;
   }
   get name() {
      return this._name;
   }
	get type() {
      return this._type;
	}
}


class Heater {       
   constructor(name) {
      this._type = 'ОБОГРЕВАТЕЛЬ';
	  this._state = false;
      this._name = name;
      
   }
   on() {
      this._state = true;
   }
   off() {
      this._state = false;
   }
   get state() {
      return this._state;
   }
   get name() {
      return this._name;
   }
   get type() {
      return this._type;
	}
}


class DevStore {              
	constructor () {
	this._i = 1; // they Id num
	this._smartHouse = new Map () ;	
	}
add (device){
	this._smartHouse.set (this._i, device);
	this._i++;
}
check (dev_id) {
	return this._smartHouse.has (Number(dev_id));
	}
getDevice (dev_id) {
	return this._smartHouse.get(Number(dev_id));
	}
get devSize () {
	return this._smartHouse.size ;
	}
clear () {
	this._smartHouse.clear();
	this._i = 1;
	}
state (dev_id) {
	return this._smartHouse.get(Number(dev_id)).state;
	}
stateOn (dev_id) {
	this._smartHouse.get(Number(dev_id)).on ();
	}

stateOff (dev_id) {
	this._smartHouse.get(Number(dev_id)).off ();
	}
name (dev_id) {
	return this._smartHouse.get(Number(dev_id)).name;
}		
type (dev_id) {
	return this._smartHouse.get(Number(dev_id)).type;
}
delById (devIdDel) { // by id
	this._smartHouse.delete(Number(devIdDel));
	}  
}


let ds = new DevStore ();



class DevCreate {   
	constructor (ds) {
		this._ds = ds ;	
	}
		
render () {		
		
	document.getElementById("dev_add").onclick = (() => {

    let sel = document.getElementById("select_");
	let selValue = sel.value;
			
	let nameDev = document.getElementById("dev_name");
	let nameValue = nameDev.value;    

	if (selValue === 'lamp') {
			this._ds.add (new Lamp (nameValue));
	};
	
	if (selValue === 'tvSet') {
			this._ds.add (new TvSet (nameValue));
	};
	
	if (selValue === 'heater') {
			this._ds.add (new Heater (nameValue));
	};
		
	shv.render ();// view	  
    	  
	  });

}
	};

	
let dc = new DevCreate (ds);
dc.render ();




class DevDelete {   
	constructor (ds) {
	this._ds = ds ;	
	}
		
render () {		
	
	document.getElementById("delete_all").onclick = (() => {

    		this._ds.clear ();
			shv.render ();
	});
	
	document.getElementById("delete_by_id").onclick = (() => {

	let delId = document.getElementById("delete_id");
	let delValue = delId.value;
   	this._ds.delById (delValue);
		
	
    shv.render ();	// VIEW			

	});
	
	
}
	};

let dv = new DevDelete (ds);
dv.render ();



class ShViwer {   //  смартхаус viewer
	constructor (ds) {
		this._ds = ds ;
	}
		
render () {		
	// удаляем все
	var arrDelelems = document.querySelectorAll('.device');
		
	if (arrDelelems[0] !== undefined) {
	
		for( let k = 0; k < arrDelelems.length ; k++) { 
		let tempElem = arrDelelems[k];
		tempElem.parentNode.removeChild(tempElem);
		}
	}
	// строим все
	let bdColor ; // визуализация
	let m = 1 ; // количество отрисованных элементов
	let i = 1; // количество прочитанных элементов
	
	while (m <= this._ds.devSize) { 
		
		if (this._ds.check (i) === true ) {

		
  let docDiv = document.createElement('div');
  docDiv.className = 'device';
    
  let onBtn = document.createElement("button");
      onBtn.type = "button";
      onBtn.value = i;
	  onBtn.innerHTML = "Вкл.";
    
      onBtn.addEventListener("click", () => {
        		
		this._ds.stateOn(onBtn.value);
		shv.render ();
	 });
      
      let offBtn = document.createElement("button");
      offBtn.type = "button";
      offBtn.value = i;
	  offBtn.innerHTML = "Выкл.";
      
      offBtn.addEventListener("click", () => {
        
	   this._ds.stateOff(offBtn.value);
		shv.render ();
	  });
    
	
	if (this._ds.state(i) === true ) {
		bdColor = 'white' ;
	} else {
		bdColor = '#F0E68C' ;
	};
	
	docDiv.style.backgroundColor = bdColor ;
    docDiv.innerHTML = `${this._ds.type (i)} <br> ${this._ds.name (i)} <br> номер устр.= ${i} <br> ${this._ds.state(i)} <br> `;
    docDiv.appendChild(onBtn);
    docDiv.appendChild(offBtn);
	document.body.appendChild(docDiv);

	
	m++;
	}; 
	console.log (this._ds.getDevice(i));
	i++;
	
	};
	
	console.log (' === --- === ');

};
	};

let shv = new ShViwer (ds); 





