const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1;
var backgroundImg,platform;
var bird, slingShot;
var bg = "morning.jpg";
var score =0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,400);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 305, 300, 170);

    box1 = new Pig(800,350);
    box2 = new Pig(850,350);
    pig1 = new Pig(900, 350);
    log1 = new Pig(750,350);

    box3 = new Pig(800,300);
    box4 = new Pig(850,270);
    pig3 = new Pig(900, 300);

    log3 =  new Pig(750,300);

    //box5 = new Box(810,160);
    log4 = new Pig(800,350);
    log5 = new Pig(850,350);

    bird = new Bird(200,50);

   // log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:50});
}

function draw(){
    if(backgroundImg)
    {
        background(backgroundImg);

        noStroke();
        textSize(30);
        fill("white");
        text("Score: "+score,width-300,50);
    }
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    log3.display();

   // box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
    Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
}


function mouseReleased(){
    slingshot.fly();
}

function keyPressed()
{
    if (keyCode===32)
    {
        slingshot.attach(bird.body);
    }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);

    if(hour>=06 && hour<=16)
    {
        bg = "morning.jpg";
    }
    else{
        bg="night.jpg";
    }
    backgroundImg = loadImage(bg);
    console.log(responseJSON);
}