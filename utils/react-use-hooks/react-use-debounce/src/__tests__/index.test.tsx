import React from 'react';
import { shallow, mount } from 'enzyme';
import useDebouncedCallback from '../index';

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

test('custom test', () => {
  const wrapper = shallow(<Test />);
});
