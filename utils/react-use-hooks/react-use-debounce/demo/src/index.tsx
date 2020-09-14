import React from 'react';
import ReactDOM from 'react-dom';
import useDebouncedCallback from '../../dev-build';

const Test: React.FC<any> = (props) => {
  const [debouncedCallback] = useDebouncedCallback(() => {
    console.log(6666);
  }, 500);
  return (
    <div>
      <input type="text" onChange={debouncedCallback} />
    </div>
  )
}
ReactDOM.render(
  <Test />,
  document.querySelector('#react'),
)
