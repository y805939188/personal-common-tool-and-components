import React from 'react';
import axios from 'axios';
import fetchData from '../../dev-build';

const getMockData = () => axios.get('http://localhost:13191/test/api');

const resource = fetchData(getMockData, res => res.data);

const TestComponent1: React.FC<any> = (props) => {
  const res = resource.read(); // === resource.read(false); 不做缓存
  return (<div>{props.parentData}: {res.data}</div>);
}

export default React.memo(TestComponent1);
