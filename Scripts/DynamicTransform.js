

class DynamicTransform
{
    constructor(graphics_parameters, transform_parameters)
    {
        this.graphics_parameters = graphics_parameters
        this.transform_parameters = transform_parameters
        this.graphics = []
        this.transform_parameter_values = []
        this.transform_functions = []
        this.tours = []
        this.setupParameters =  this.setupParameters.bind(this)
        this.setupGraphics =    this.setupGraphics.bind(this)
        this.generateFrames =   this.generateFrames.bind(this)
        this.generateTransformFunctions = this.generateTransformFunctions.bind(this)
        this.getGraphicByIndex = this.getGraphicByIndex.bind(this)
        this.draw = this.draw.bind(this)
    }

    getGraphicByIndex(index)
    {
        return this.tours[index].getGraphic()
    }


    setupParameters()
    {
        if (this.transform_parameters.transform_function_component_type == 'linear')
        {
            // takes transform component type parameter object INSTEAD of individual parameters
            
            // frames in animation
            for(let i = 0; i < this.graphics_parameters.frame_count; i++)
            {
                
                this.tours[i].setParameters()
                // functions in each transform
                // let current_transform = []
                // for(let j = 0; j < this.transform_parameters.transform_function_count; j++)
                //     current_transform.push(matrix_machine.generateRandomParameters())
                

                // this.transform_parameter_values.push(current_transform)
            }
            console.log('Linear Dynamic Transform Parameters',this.transform_parameter_values)
        }
        this.generateTransformFunctions()
    }

    generateTransformFunctions()
    {
        if (this.transform_parameters.transform_function_component_type == 'linear')
        {
            // takes transform component type parameter object INSTEAD of individual parameters
            let matrix_machine = new MatrixManipulator(this.transform_parameters.linear)
            for(let i = 0; i < this.graphics_parameters.frame_count; i++)
            {
                
                // let current_transform_function = []
                this.tours[i].set_transform_functions()
                // for(let k = 0; k < this.transform_parameters.transform_function_count; k++)
                // {
                //     current_transform_function.push((x,y) => {return {
                        
                //         x : this.transform_parameter_values[k][0] * x + this.transform_parameter_values[k][1]  * y,
                //         y : this.transform_parameter_values[k][2] * x + this.transform_parameter_valuess[k][3] * y,    
                //     }})
                // }
                // this.transform_functions.push(current_transform_function)
                
            }
            // console.log('Frames/Tours->Functions->Values', this.transform_functions)
        }

    }

    setupGraphics()
    {

        for(let i = 0; i < this.graphics_parameters.frame_count; i++)
        {
            let current_graphic = createGraphics(this.graphics_parameters.canvas_width, this.graphics_parameters.canvas_height)
            current_graphic.strokeWeight(10)
            current_graphic.stroke(255)
            current_graphic.background(0)
            current_graphic.translate(this.graphics_parameters.canvas_width / 2, this.graphics_parameters.canvas_height / 2)
            this.graphics.push(current_graphic)
            this.tours.push(new Tour(i,current_graphic,this.graphics_parameters, this.transform_parameters))
        }
        console.log('Graphics Created', this.graphics_parameters.frame_count, this.graphics )

    }

    generateFrames()
    {
        for(let i = 0; i < this.graphics_parameters.frame_count; i++)
        {
            console.log('drawing frame ', i)
            this.tours[i].draw()
            console.log(this.tours[i])
        }
    }

    draw(index)
    {
        let current_graphic = this.tours[index].getGraphic()
        image(this.graphics[index],0,0)
    }

}