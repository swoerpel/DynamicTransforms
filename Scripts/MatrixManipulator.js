

class MatrixManipulator
{

    constructor(parameters)
    {
        this.tolerance = parameters.tolerance
        this.precision = parameters.precision
        this.shape     = parameters.shape
        this.generateRandomParameters = this.generateRandomParameters.bind(this)
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


}