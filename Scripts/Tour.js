

class Tour
{

    // constructor(tour_id,graphic,grid_parameters, color_parameters)
    constructor(tour_id,graphic, graphics_parameters, transform_parameters)
    {
        this.tour_id = tour_id
        this.graphic = graphic
        this.transform_parameters = transform_parameters
        this.graphics_parameters = graphics_parameters
        // this.parameters.GP.grid_sequence_type == 'general' ?
        // this.graphic.translate(this.parameters.GP.xShift[tour_id],-this.parameters.GP.yShift[tour_id]) : 
        // this.zoom = this.parameters.GP.zoom 
        this.transform_parameter_values = []
        this.transform_functions = []
        this.x = 0
        this.y = 0
        this.draws = 0
        this.point_count = 0
        this.last_transform_index
        this.save_points = false

        this.matrix_machine = new MatrixManipulator(this.transform_parameters.linear)


        this.draw = this.draw.bind(this)
        this.drawPoint = this.drawPoint.bind(this)
        this.nextPoint = this.nextPoint.bind(this)
        this.set_transform_functions = this.set_transform_functions.bind(this)
        this.setParameters = this.setParameters.bind(this)
        // this.set_fill_colors = this.set_fill_colors.bind(this)
        // this.set_background_colors = this.set_background_colors.bind(this)
        this.set_save_points = this.set_save_points.bind(this)
        this.getGraphic = this.getGraphic.bind(this)
        // this.set_overlay = this.set_overlay.bind(this)
        // this.set_color_transform = this.set_color_transform.bind(this)
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
        for(let j = 0; j < this.graphics_parameters.point_count_per_frame; j++)
        {
            this.nextPoint()
            this.drawPoint()
        }
    }

    nextPoint()
    {
        let function_prob = 1 / this.transform_functions.length
        let nextPoint;
        let prob = random(1)
        let sum = 0
        for(let i = 0; i < this.transform_functions.length; i++)
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
    
    setParameters()
    {
        for(let j = 0; j < this.transform_parameters.transform_function_count; j++)
            this.transform_parameter_values.push(this.matrix_machine.generateRandomParameters())   
    }

    set_transform_functions()
    {
        // console.log('transform parameters for tour ', this.tour_id, ':', this.transform_parameters)
        // for(let i = 0; i < transform_parameters.length; i++)
        // {
        //     this.transform_functions.push((x,y) => {return {
        //         x : transform_parameters[i][0] * x + transform_parameters[i][1]  * y + transform_parameters[i][4], 
        //         y : transform_parameters[i][2] * x + transform_parameters[i][3] * y + transform_parameters[i][5]             
        //     }})
        // }
        console.log(this.transform_parameters)
        for(let k = 0; k < this.transform_parameters.transform_function_count; k++)
        {
            console.log('phil',k)
            this.transform_functions.push((x,y) => {return {
                x : this.transform_parameter_values[k][0][0] * x + this.transform_parameter_values[k][0][1]  * y,
                y : this.transform_parameter_values[k][1][0] * x + this.transform_parameter_values[k][1][1] * y,    
            }})
            console.log('tour',k,' parameters',this.transform_parameter_values)
        }
        console.log('Tour', this.tour_id, ' Transform Functions', this.transform_functions)
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

    // set_color_transform(transform_parameters)
    // {
    //     this.color_transform_function = (x,y) => {
    //         return{
    //             x : transform_parameters[0][0] * x + transform_parameters[0][1]  * y + transform_parameters[0][4], 
    //             y : transform_parameters[0][2] * x + transform_parameters[0][3] * y + transform_parameters[0][5]                   
    //         }
    //     }
    // }
    



    // set_background_colors(background_color_index,background_colors)
    // {
        
    //     this.background_color_index = background_color_index
    //     this.background_colors = background_colors
    //     this.graphic.background(this.background_colors[background_color_index].getRGB())

    // }

    // set_fill_colors(fill_color_index, fill_colors)
    // {   
    //     // console.log('hex vals',colors)
    //     this.fill_color_index = fill_color_index
    //     this.fill_colors = fill_colors
    //     // console.log('fill colors',fill_colors)

    //     if (this.parameters.CP.type == 'Const')
    //     {        
    //         this.graphic.stroke(this.fill_colors[fill_color_index].getRGB())
    //     }
    //     else if (this.parameters.CP.type == 'color by function')
    //     {
    //         //set stroke to one color
    //         this.function_color_indexes = []
    //         // second
    //         for(let i = 0; i < this.transform_parameters.length;i++)
    //         {
    //             this.function_color_indexes.push(color_machine.getRandomColourHex())
               
    //         }
    //         console.log('color indexs for tour',this.tour_id,this.function_color_indexes)
    //     }
    //     else if (this.parameters.CP.type == 'gradient by direction')
    //     {
    //         console.log(this.fill_colors)
    //         // this.lowColor = this.fill_colors[0]//.getHex()
    //         this.lowColor = new Color('#FFFFFF')//.getHex()
    //         // this.highColor = this.fill_colors[1]//.getHex()
    //         this.highColor = new Color('#000000')//.getHex()
    //         console.log('low color',this.lowColor.getHex())
    //         console.log('high color',this.highColor.getHex())
    //         this.graphic.stroke(color_machine.getColourHex('green'))
    //     }
    //     else if (this.parameters.CP.type == 'color by extra transform')
    //     {

    //         this.lowColor = this.fill_colors[0]//.getHex()
    //         this.highColor = this.fill_colors[1]//.getHex()
    //         this.graphic.stroke(color_machine.getColourHex('green'))
    //     }


    // }




    getGraphic()
    {
        return this.graphic
    }
}

