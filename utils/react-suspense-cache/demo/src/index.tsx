import React, { Suspense, useState } from 'react';
import ReactDOM from 'react-dom';
import TestComponent1 from '../components/test1';
import TestComponent2 from '../components/test2';
import TestComponent3 from '../components/test3';
import './index.css';

const Test: React.FC<any> = (props) => {
  const [ change1, setChange1 ] = useState<boolean>(true);
  const [ change2, setChange2 ] = useState<boolean>(true);
  const [ change3, setChange3 ] = useState<boolean>(true);
  return (
    <div>
      <div id="test-wrapper">test</div>
      <div>
      <button onClick={() => setChange1(!change1)}>如果参数传false或者不传 每次重新出发函数组件执行都会重新执行promise</button>
        {change1 ? (
          <Suspense fallback={"Loading..."}>
            <TestComponent1 parentData={"test11111111"} />
          </Suspense>
        ) : (
          <Suspense fallback={"Loading..."}>
            <TestComponent1 parentData={"test22222222"} />
          </Suspense>
        )}
      </div>
      <p>----------------------------</p>
      <div>
        <button onClick={() => setChange2(!change2)}>如果参数传true, 并且前后两次参数一致, 则不会重新执行promise</button>
        {change2 ? (
          <Suspense fallback={"Loading..."}>
            <TestComponent2 parentData={"test66666666"} />
          </Suspense>
        ) : (
          <Suspense fallback={"Loading..."}>
            <TestComponent2 parentData={"test77777777"} />
          </Suspense>
        )}
      </div>
      <p>----------------------------</p>
      <div>
        <button onClick={() => setChange3(!change3)}>如果参数穿true, 并且传参数的话, 会判断前后两次参数是否一样来决定是否重新执行promise</button>
        {change3 ? (
          <Suspense fallback={"Loading..."}>
            <TestComponent3 parentData={"test88888888"} />
          </Suspense>
        ) : (
          <Suspense fallback={"Loading..."}>
            <TestComponent3 parentData={"test99999999"} />
          </Suspense>
        )}
      </div>
    </div>
  )
}
ReactDOM.render(
  <Test />,
  document.querySelector('#react'),
)
