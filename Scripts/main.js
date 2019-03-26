let canvasX = 2000 
let canvasY = 2000         
let current_graphic;

var graphics_parameters = {
    canvas_width : 2000,
    canvas_height: 2000,
    frame_count: 10,
    point_count_per_frame: 1000,

}

var transform_parameters = {

    // how many functions are available to choose from when drawing each point
    transform_function_count : 2,

    // decides how each transform component is populated
    // values are vaguely defined for now,
    // simple refers to constants only (like previous project)
    // nonlinear refers to functions including an extra parameter such as tan(t), where t is an extra parameter
    // complex refers to nonlinear transforms using x,y and any other parameters desired
    // such as sin(x), x - cos(y), xy^2, e^-(x/2)^2, or 
    transform_function_component_type : 'linear', // 'nonlinear', 'complex'

    // parameters specific to linear transform component functions
    // constant linear transforms only
    linear : {
        tolerance : 1,  // max distance from origin parameter constants can vary
        precision : 8,  // decimals used for each constant
        shape     :{ x : 2, y : 2 }, // [2x2][2x1], [4x2][2x1], [3x3][3,1] -> extra dimension chooses color

    },

    // Number of transform components chained together for a full transform function
    // previous project only allowed a linear form f(x,y) = Fg(x,y)
    // new feature will allow functions of    form f(x,y) = Fg1(x,y) + Fg2(x,y) + ... + Fgn(x,y)
    // allows significantly more complicated transforms, espically when including nonlinear
    transform_function_component_count : 1,       

    // size of matrix multiplying current vector:
    
    // transform_function_group_shape : { x : 2, y : 2 }

    

}
var controller; 

function setup()
{
    controller = new DynamicTransform(graphics_parameters,transform_parameters)
    // 
    controller.setupGraphics()  
    controller.setupParameters()
    
    // generates all points
    controller.generateFrames()

    
    canvas = createCanvas(graphics_parameters.canvas_width, graphics_parameters.canvas_height);
    canvas.parent('display');
    canvas.background(150);

}

var count = 0
// only displays completed frames
function draw()
{   
    controller.draw(count)

    // image(controller.getGraphicByIndex(count),0,0)
    count++
    count = count % graphics_parameters.frame_count
    // current_graphic.point(0,0)
    // image(current_graphic,0, 0)
}