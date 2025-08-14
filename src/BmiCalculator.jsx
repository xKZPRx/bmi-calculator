import React, {useState, useRef, useEffect} from 'react'

function BmiCalculator() {
    const [inputs, setInputs] = useState({
        weight: '70',
        height: '170'
    });

    const [bmi, setBmi] = useState(null);
    const [result, setResult] = useState('');

    const limits = {
        weight: {min: 30, max: 150},
        height: {min: 100, max: 220}
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        // Allow empty string for easy editing
        if (value === '' || /^\d*$/.test(value)) {
        setInputs((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleInputBlur = (e) => {
        const {name, value} = e.target;
        let num = parseInt(value, 10);

        if (isNaN(num)) {
            num = limits[name].min;
        }

        if (num < limits[name].min) num = limits[name].min;
        if (num > limits[name].max) num = limits[name].max;

        setInputs((prev) => ({...prev, [name]:num.toString()}));
    };

    const calculateBmi = (e) => {
        e.preventDefault();
        const weight = Number(inputs.weight);
        const heightCm = Number(inputs.height);
        const heightMeters = heightCm / 100;

        const bmiValue = weight / (heightMeters * heightMeters);
        setBmi(bmiValue.toFixed(1));

        const newResult =
            bmiValue < 18.5 ? "Underweight" :
            bmiValue <= 24.9 ? "Normal Weight" :
            bmiValue <= 29.9 ? "Overweight" :
            bmiValue <= 34.9 ? "Obese class I" :
            bmiValue <= 39.9 ? "Obese class II" : "Obese class III";
        setResult(newResult);
    };

    return(
        <form onSubmit={calculateBmi}>
            <div className="bmi-calculator-container">
                <h1>Calculate your BMI</h1>

                <div className="input-group">
                    <input type="range" name="weight" min={limits.weight.min} max={limits.weight.max} step="1" value={inputs.weight} onChange={handleInputChange}></input><br/>
                    <label>
                        WEIGHT:
                        <input type="number" name="weight" value={inputs.weight} onChange={handleInputChange} onBlur={handleInputBlur}></input>
                        kg
                    </label>
                </div>

                <div className="input-group">
                    <input type="range" name="height" min={limits.height.min} max={limits.height.max} step="1" value={inputs.height} onChange={handleInputChange}></input><br/>
                    <label>
                        HEIGHT:
                        <input type="number" name="height"value={inputs.height} onChange={handleInputChange} onBlur={handleInputBlur}></input>
                        cm
                    </label>
                </div>

                <button type="submit" className="calculate-bmi-button">CALCULATE</button>

                <h2 className="bmi-display" style={{display: bmi ? 'block' : 'none'}}>Your BMI: <span>{bmi}</span></h2>
                <p className="result-display" style={{display: bmi ? 'block' : 'none'}}>{result}</p>
            </div>
        </form>
    );
}

export default BmiCalculator