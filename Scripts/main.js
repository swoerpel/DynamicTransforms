let canvasX = 2000 
let canvasY = 2000         
let current_graphic;

function setup()
{
    c = createCanvas(canvasX, canvasY);
    c.parent('display');
    c.background(150);
    current_graphic = createGraphics(canvasX, canvasY)

    current_graphic.strokeWeight(5)
    current_graphic.stroke(255)
    current_graphic.background(0)
    current_graphic.translate(canvasX / 2, canvasY / 2)
}


function draw()
{
    current_graphic.point(0,0)
    image(current_graphic,0, 0)
}