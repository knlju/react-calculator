import React, {useState} from 'react';

function Calculator(props) {
  const [inputText, setInputText] = useState(0)
  const [multiplier, setMultiplier] = useState(10)
  const [firstNumber, setFirstNumber] = useState(undefined)
  const [action, setAction] = useState(undefined)
  // multiply last input by 0 if new input is needed
  const [inputChangable, setInputChangeable] = useState(0)

  const setActionAndFisrtNumber = (action) => {
    setAction(action)
    setFirstNumber(inputText)
    setMultiplier(10)
    setInputChangeable(0)
  }

  const reset = () => {
    setInputText(0)
    setMultiplier(10)
    setAction(undefined)
  }

  const switchMultiplier = () => {
    if (multiplier === 10) {
      setMultiplier(1 / 10)
    }
  }

  const calculate = () => {
    setFirstNumber(undefined)
    setAction(undefined)

    switch (action) {
      case 'mod': {
        const result = firstNumber % inputText
        setInputText(result)
        break
      }
      case 'plus': {
        const result = firstNumber + inputText
        setInputText(result)
        break
      }
      case 'minus': {
        const result = firstNumber - inputText
        setInputText(result)
        break
      }
      case 'multiply': {
        const result = firstNumber * inputText
        setInputText(result)
        break
      }
      case 'divide': {
        const result = firstNumber / inputText
        setInputText(result)
        break
      }
      default: {
        break
      }
    }
  }

  const appendInput = input => {
    // positive if 0 because it will be used for multiplication
    let sign = (Math.sign(inputText) || 1)
    if (inputChangable === 0) {
      setInputChangeable(1)
      // set sign to positive for new inputs
      sign = 1
    }
    if (multiplier === 10) {
      setInputText(inputChangable * inputText * multiplier + input * sign)
      return
    }
    setMultiplier(multiplier / 10)
    setInputText(inputChangable * inputText + input * multiplier * sign)
  }

  // limit number to 10 digits and filter trailing zeros
  const presentedInputValue = Number.parseFloat(inputText.toString()).toPrecision(10).replace(/\.?0+$/,"")

  return (
    <div className="calculator-container">
      <div className='row'>
        <input type="text" value={presentedInputValue} maxLength="11"/>
      </div>
      <div className='row'>
        <button className='button-controls' onClick={() => reset()}>
          {inputText === 0 ? 'AC' : 'C'}
        </button>
        <button className='button-controls' onClick={() => setInputText(-inputText)}>±</button>
        <button className='button-controls' onClick={() => setActionAndFisrtNumber('mod')}>%</button>
        <button className='button-actions' onClick={() => setActionAndFisrtNumber('divide')}>÷</button>
      </div>
      <div className='row'>
        <button onClick={() => appendInput(1)}>1</button>
        <button onClick={() => appendInput(2)}>2</button>
        <button onClick={() => appendInput(3)}>3</button>
        <button className='button-actions' onClick={() => setActionAndFisrtNumber('multiply')}>x</button>
      </div>
      <div className='row'>
        <button onClick={() => appendInput(4)}>4</button>
        <button onClick={() => appendInput(5)}>5</button>
        <button onClick={() => appendInput(6)}>6</button>
        <button className='button-actions' onClick={() => setActionAndFisrtNumber('minus')}>-</button>
      </div>
      <div className='row'>
        <button onClick={() => appendInput(7)}>7</button>
        <button onClick={() => appendInput(8)}>8</button>
        <button onClick={() => appendInput(9)}>9</button>
        <button className='button-actions' onClick={() => setActionAndFisrtNumber('plus')}>+</button>
      </div>
      <div className='row'>
        <button className='button-zero' onClick={() => appendInput(0)}>0</button>
        <button onClick={() => switchMultiplier()}>.</button>
        <button className='button-actions' onClick={() => calculate()}>=</button>
      </div>
    </div>
  );
}

export default Calculator;