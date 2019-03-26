

class DynamicTransform
{
    constructor(parameters)
    {
        this.parameters = parameters
        this.graphics = []
        this.transform_parameter_values = []
        this.transform_functions = []
        this.tours = []
        this.setupParameters =  this.setupParameters.bind(this)
        this.setupGraphics =    this.setupGraphics.bind(this)
        this.generateFrames =   this.generateFrames.bind(this)
        // this.generateTransformFunctions = this.generateTransformFunctions.bind(this)
        this.getGraphicByIndex = this.getGraphicByIndex.bind(this)
        this.draw = this.draw.bind(this)
    }

    getGraphicByIndex(index)
    {
        return this.tours[index].getGraphic()
    }


    setupParameters()
    {
        if (this.parameters.TP.function_component_type == 'linear')
        {
            // takes transform component type parameter object INSTEAD of individual parameters
            // frames in animation
            let matrix_machine = new MatrixManipulator(this.parameters)
            let start_parameters_one = matrix_machine.generateRandomParameters()
            let start_parameters_two = matrix_machine.generateRandomParameters()
            console.log('Start Params 1',start_parameters_one)
            console.log('Start Params 2',start_parameters_two)
            let constant_vals = [random(1), random(1)]
            for(let i = 0; i < this.parameters.GP.frame_count; i++)
            {    

                this.tours[i].setParameters(start_parameters_one,start_parameters_two, constant_vals)
                this.tours[i].set_transform_functions()
                start_parameters_one = matrix_machine.incrementParameters(start_parameters_one, this.parameters.TP.step)
                start_parameters_two = matrix_machine.incrementParameters(start_parameters_two, this.parameters.TP.step)
            }
            console.log('tours',this.tours)
            // console.log('Linear Dynamic Transform Parameters',this.transform_parameter_values)
        }
        // this.generateTransformFunctions()
    }


    setupGraphics()
    {

        for(let i = 0; i < this.parameters.GP.frame_count; i++)
        {
            let current_graphic = createGraphics(this.parameters.GP.canvas_width, this.parameters.GP.canvas_height)
            current_graphic.strokeWeight(8)
            current_graphic.stroke(255)
            current_graphic.background(0)
            current_graphic.translate(this.parameters.GP.canvas_width / 2, this.parameters.GP.canvas_height / 2)
            this.graphics.push(current_graphic)
            this.tours.push(new Tour(i,current_graphic, this.parameters))
        }
        console.log('Graphics Created', this.parameters.GP.frame_count, this.graphics )

    }

    generateFrames()
    {
        for(let i = 0; i < this.parameters.GP.frame_count; i++)
        {
            console.log('drawing frame ', i)
            this.tours[i].draw()
            console.log(this.tours[i])
        }
    }

    draw(index)
    {
        // let current_graphic = this.tours[index].getGraphic()
        image(this.graphics[index],0,0)
    }

}