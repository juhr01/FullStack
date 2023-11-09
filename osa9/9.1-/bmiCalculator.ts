interface calculateBmi {
    value1: number,
    value2: number
}

const bmiCalculator = (height : number, weight: number) => {
    return weight / (height / 100 * height / 100);
}

const parseArguments = (args: string[]): calculateBmi => {
    if (args.length < 4) throw new Error('Not enough arguments');
    if (args.length > 4) throw new Error('Too many arguments');
  
    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
      return {
        value1: Number(args[2]),
        value2: Number(args[3])
      }
    } else {
      throw new Error('Provided values were not numbers!');
    }
  }

try {
    const { value1, value2 } = parseArguments(process.argv);
    if (bmiCalculator(value1, value2) >= 25) {
        console.log("Overweight (unhealthy weight)")
    } else if (bmiCalculator(value1, value2) <= 18.4) {
        console.log("Underweight (unhealthy weight)")
    } else {
        console.log("Normal (healthy weight)")
    }
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
      errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
  }