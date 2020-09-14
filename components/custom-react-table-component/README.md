# react的table业务组件

demo:
![demo](./react-table.gif)
</br></br>
使用方法:</br>
```
npm install --save pd4-react-table-component
```
```js
import React from 'react';
import ReactTable, { IOptions } from 'pd4-react-table-component';

const options: IOptions[] = [
  {
    id: 'name',
    title: '字段名',
    type: 'input',
    defaultData: [''],
  },
  {
    id: 'type',
    title: '字段类型',
    type: 'select',
    defaultData: [[{value: 'string', isDefault: true}, {value: 'number'}, {value: 'Object'}]],
  },
  {
    id: 'distributed',
    title: '数据分布',
    type: 'select',
    defaultData: [[{value: 'a', extraProps: { /** antd的Option的其他属性 */ }}, 'b', 'c', 'd', 'e']],
  },
  {
    id: 'distributedParameter',
    title: '数据分布参数',
    type: 'input',
    defaultData: [''],
  },
  {
    id: 'uniqueNumber',
    title: '唯一数量',
    type: 'input',
    defaultData: [''],
  },
  {
    id: 'missingValueRatio',
    title: '缺失值比例',
    type: 'input',
    defaultData: [''],
  },
];

const TestWrapper: React.FC<any> = (props) => {
  const handleOnDataChange = (result) => {
    console.log('这里的数据是', result);
  }
  return (
    <div>
      <ReactTable
        options={options}
        onDataChange={handleOnDataChange}
        onTableLoaded={handleOnDataChange}
      />
    </div>
  )
}
```
