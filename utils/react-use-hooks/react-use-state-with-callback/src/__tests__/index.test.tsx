import React from 'react';
import { mount } from 'enzyme';
import useStateWithCallback from '../';

const Test: React.FC<any> = (props) => {
  const [number1, setNumber1] = useStateWithCallback(0);
  const handleClick1 = () => setNumber1(number1 + 1, (prevState, currentState) => {
    console.log('callback effect 111', `currentState: ${currentState}`, `prevState: ${prevState}`);
    setNumber1(100);
  });
  return (<button id="btn-1" onClick={handleClick1}>{number1}</button>);
}
test('custom test', (done) => {
  /**
   * 这里虽然组件就一层但是需要使用 mount, 不然 useEffect 和 useLayoutEffect 不好使
   * https://dev.to/mikeborozdin/shallow-rendering-react-hooks-and-why-shallow-rendering-is-good-57hd
   */
  
  const wrapper = mount(<Test />);
  wrapper.find('#btn-1').simulate('click');
  wrapper.update();
  setImmediate(() => {
    wrapper.update();
    expect(wrapper.children().text()).toBe('100');
    done();
  });
});
