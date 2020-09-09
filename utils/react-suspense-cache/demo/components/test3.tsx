import React from 'react';
import axios from 'axios';
import fetchData from '../../dev-build';

const getMockData = () => axios.get('http://localhost:13191/test/api');

const resource = fetchData(getMockData, res => res.data);

const TestComponent2: React.FC<any> = (props) => {
  const res = resource.read(true, props.parentData);
  return (<div>{props.parentData}: {res.data}</div>);
}

export default TestComponent2;
