console.log("CRUD with JSON")

let data={
    "Noodle":{
        born: 2016,
        colour: "white"
        }
}

function add(name="", born=0, colour=""){
    isValid=!!name && !!born && !!colour
    if(isValid){
        if(data[name]){
            console.log("exists")
        } else {
            data[name]={
                born: born,
                colour:colour
            }
        }
    }
}

function update(name="", born=0, colour=""){
    isValid=!!name && !!born && !!colour
    if(isValid){
        if(data[name]){
            data[name]={
                born: born,
                colour:colour
            }
        } else {
            console.log(name+" not valid entry")
        }
    }
}

function retrieveOne(name=""){
    isValid=!!name
    if(isValid){
        if(data[name]){
            return { 
                name:name,
                data:data[name]
            }
        } else {
            console.log(name+" not valid entry")
        }
    }
}

function retrieveAll(){
    // return data
    let res=[]
    for (const key in data) {
        res.push({
            name:key,
            data: data[key]
        })
    }
    return res
}

function remove(name=""){
    isValid=!!name
    if(isValid){
        if(data[name]){
            console.log("removing "+name)
            delete data[name]
        } else {
            //
        }
    }
}



