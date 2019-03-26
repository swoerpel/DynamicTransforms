

class MatrixManipulator
{

    constructor(parameters)
    {   
        this.parameters = parameters
        console.log('parameters', this.parameters)
        this.tolerance = parameters.TP.linear.tolerance
        this.precision = parameters.TP.linear.precision
        this.shape     = parameters.TP.linear.shape
        this.generateRandomParameters = this.generateRandomParameters.bind(this)
        this.incrementParameters = this.incrementParameters.bind(this)
    }

    generateRandomParameters()
    {
        let rand_matrix = []
        for (let i = 0; i < this.shape.x; i++)
        {
            let row = []
            for (let j = 0; j < this.shape.y; j++)
            {
                row.push(parseFloat(random(-this.tolerance,this.tolerance).toFixed(this.precision)))
            }
            rand_matrix.push(row)
        }
        return rand_matrix
        
    }

    incrementParameters(parameters, step)
    {
        for(let i = 0; i < this.parameters.TP.function_count; i++)
        {
            for (let j = 0; j < this.shape.x; j++)
            {
                parameters[i][j] += step
            }
        }
        return parameters
    }


}