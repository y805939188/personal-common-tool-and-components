import React from 'react';
import ReactDOM from 'react-dom';
import useStateWithCallback from '../../dev-build';
import './index.css';

const Test: React.FC<any> = (props) => {
  const [number1, setNumber1] = useStateWithCallback(0);
  const [number2, setNumber2] = useStateWithCallback(99);
  const handleClick1 = () => setNumber1(number1 + 1, (prevState, currentState) => {
    console.log('callback effect 111', `currentState: ${currentState}`, `prevState: ${prevState}`);
  });
  const handleClick2 = () => setNumber2(number2 - 1, (prevState, currentState) => {
    console.log('callback effect 222', `currentState: ${currentState}`, `prevState: ${prevState}`);
  });
  return (
    <>
      <button onClick={handleClick1}>{number1}</button>
      <button onClick={handleClick2}>{number2}</button>
    </>
  )
}
ReactDOM.render(
  <Test />,
  document.querySelector('#react'),
)
