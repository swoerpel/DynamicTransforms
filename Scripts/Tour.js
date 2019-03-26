

class Tour
{

    // constructor(tour_id,graphic,grid_parameters, color_parameters)
    constructor(tour_id,graphic,parameters)
    {
        this.tour_id = tour_id
        this.graphic = graphic
        this.parameters = parameters
        // this.parameters.GP.grid_sequence_type == 'general' ?
        // this.graphic.translate(this.parameters.GP.xShift[tour_id],-this.parameters.GP.yShift[tour_id]) : 
        // this.zoom = this.parameters.GP.zoom 
        this.transform_values = []
        this.transform_functions = []
        this.x = 0
        this.y = 0
        this.draws = 0
        this.point_count = 0
        this.last_transform_index
        this.save_points = false

        this.matrix_machine = new MatrixManipulator(this.parameters)


        this.draw = this.draw.bind(this)
        this.drawPoint = this.drawPoint.bind(this)
        this.nextPoint = this.nextPoint.bind(this)
        this.set_transform_functions = this.set_transform_functions.bind(this)
        this.setParameters = this.setParameters.bind(this)
        this.set_save_points = this.set_save_points.bind(this)
        this.getGraphic = this.getGraphic.bind(this)
    }

    setParameters(start_parameters_one,start_parameters_two, constant_vals)
    {
        this.constant_vals = constant_vals

        this.transform_values.push(start_parameters_one)
        this.transform_values.push(start_parameters_two)
        // for(let j = 0; j < this.parameters.TP.function_count; j++)
        // {
        //     // let current_function_parameters = []
        //     // for(let k = 0; k < this.transform_parameters.linear.shape.x * this.transform_parameters.linear.shape.y; k++)
        //     // current_function_parameters.push()
            
        //     this.transform_values.push(this.matrix_machine.generateRandomParameters())   
        // }
        // console.log('set parameters',this.transform_values)
    
    }

    set_transform_functions()
    {
        // console.log('set functions',this.transform_values)

        for(let k = 0; k < this.parameters.TP.function_count; k++)
        {
            this.transform_functions.push((x,y) => {return {
                x : this.transform_values[k][0][0] * x + this.transform_values[k][0][1]  * y + random(1),
                y : this.transform_values[k][1][0] * x + this.transform_values[k][1][1] * y + random(1),    
            }})
        }
        // console.log('Tour', this.tour_id, ' Transform Functions', this.transform_functions)
    }


    set_save_points()
    {
        this.save_points = true
        this.points = []
        this.points.push([this.x,this.y])
    }

    getGraphic()
    {
        return this.graphic
    }

    draw()
    {
        for(let j = 0; j < this.parameters.GP.point_count_per_frame; j++)
        {
            this.nextPoint()
            this.drawPoint()
        }
    }

    nextPoint()
    {
        let function_prob = 1 / this.parameters.TP.function_count
        let nextPoint;
        let prob = random(1)
        let sum = 0
        for(let i = 0; i < this.parameters.TP.function_count; i++)
        {
            // sum += this.transform_parameters[i][this.transform_parameters[i].length - 1]
            sum += function_prob
            if (sum > prob)
            {
                this.last_transform_index = i
                nextPoint = this.transform_functions[i](this.x, this.y)
                this.x = nextPoint.x
                this.y = nextPoint.y
                break; //key to loop
            }
        }
        if (this.save_points)
            this.points.push([this.x,this.y])
        this.point_count++
    }
    


    drawPoint()
    {
        // this.graphic.point(
        //     map(this.x,-this.zoom,this.zoom,0,this.parameters.GP.tour_width), 
        //     map(this.y,-this.zoom,this.zoom,0,this.parameters.GP.tour_height)
        // );
        this.graphic.point(this.x,this.y)
        this.draws += 1
    }

    getGraphic()
    {
        return this.graphic
    }
}

