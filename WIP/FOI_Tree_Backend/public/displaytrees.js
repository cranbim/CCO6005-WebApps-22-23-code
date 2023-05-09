// let treeData=[
//   {
//     id: 0,
//     treeName: "Dave",
//     colour: 5, //0-9
//     size: 5 //1-5
//   },
//   {
//     id: 0,
//     treeName: "Noodle",
//     colour: 2, //0-9
//     size: 2 //1-5
//   }
// ]

let nextTreeID=0
let trees=[]
// let testTrees=new Array(10).fill(0)
// console.log(testTrees)

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB)
  // treeData.forEach(function(td){
  //   let tree=new Tree(nextTreeID++, td)
  //   if(tree.place(width, height,trees,150)){
  //     trees.push(tree)
  //   }
    
  // })
}

function draw() {
  background(0,0,5);
  noFill()
  stroke(0,0,100)
  rect(0,0,width, height)
  trees.forEach(function(tree){
    tree.render(50)
  })
}

function mousePressed(){
  fetch('/treedata')
      .then(response=>response.json())
      .then(fetchedData=>instantiateTrees(fetchedData))
      // .then(fetchedData=>console.log(fetchedData))
}

function instantiateTrees(treeData){
  trees=[]
  treeData.forEach(function(td){
    console.log(td)
    let tree=new Tree(nextTreeID++, td)
    if(tree.place(width, height,trees,150)){
      trees.push(tree)
    }
    
  })
  trees.sort((a,b) => a.pos.y - b.pos.y)
}

function Tree(id, data){
  this.pos={x:0, y:0}
  this.isPlaced=false
  
  this.place=function(w,h,others, minDist){
    let x=random(0.1,0.9)*w
    let y=random(0.2,0.9)*h
    this.pos.x=x
    this.pos.y=y
    this.isPlaced=true
    return this.isPlaced
  }
  
  this.NONplace=function(w,h,others, minDist){
    let x=-1000,y=-1000
    let d=0
    let maxAttempts=3
    let attempts=0
    let distOK=false
    
    while(!distOK && attempts<maxAttempts){
      console.log(attempts)
      if(others.length==0){
        x=random(w)
        y=random(h)
        this.pos.x=x
        this.pos.y=y
        this.isPlaced=true
        distOK=true
      } else {
        for(let i=0; i<others.length; i++){
          x=random(w)
          y=random(h)
          d=dist(others[i].pos.x, others[i].pos.y, x, y)
          
          if(d>minDist){
            distOK=true
            this.pos.x=x
            this.pos.y=y
            this.isPlaced=true
            break
          }
          console.log(id,floor(d),minDist,distOK)
        }
      }
      
      attempts++
    }
    console.log(id, this.isPlaced, this.pos.x, this.pos.y)
    return distOK
  }
  
  this.render=function(minDist){
    push()
    translate(this.pos.x, this.pos.y)
    noFill()
    stroke(120,100,100)
    ellipse(0,0,minDist,minDist/2)
    push()
    scale(1+(data.size)/5)
    strokeWeight(10)
    stroke(360*data.colour/10,60,80)
    line(0,0,0,-40)
    noStroke()
    fill(360*data.colour/10,80,80)
    ellipse(0,-40,35)
    pop()
    fill(0,0,100)
    noStroke()
    textSize(20)
    rotate(-PI/2)
    textAlign(LEFT, CENTER)
    text(data.treeName,0,0)
    pop()
  }
}