let list =(locationList,elementId)=>{
    element = document.getElementById(elementId);
    element.innerHTML='';
    for(let i=0;i<locationList.length;i++){
        element.innerHTML += `<div>${locationList[i]}</div>`;
    }
}

let getLocationTemp = (address) =>{
    let coordination = location_code.getLocation(address);
    console.log(coordination);
}

let addLocation = (location) =>{
    locationList.push(location);

    return locationList;
}