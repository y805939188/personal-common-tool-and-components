import React from 'react';
import ReactDOM from 'react-dom';
// @ts-ignore
import ReactTable, { IOptions } from 'external-lib';
// import ReactTable, { IOptions } from '../../src/index';


// const options: IOptions[] = [
//   {
//     id: 'ding1',
//     title: '这里是1',
//     type: 'string',
//     defaultData: ['string1', 'string2'],
//   },
//   {
//     id: 'ding2',
//     title: '这里是2',
//     type: 'select',
//     defaultData: [
//       {
//         data: [{value: 8888, isDefault: true}, 999],
//       },
//       [{ value: 'ding' }, { value: 66, isDefault: true }, '3'],
//       [{value: 23333, extraProps: { disabled: true }}, '5', '6'],
//       ['ding1']
//     ],
//     extraProps: {
//       width: 300
//     }
//   },
//   {
//     id: 'ding3',
//     title: (<div>这里是3</div>),
//     type: 'input',
//     defaultData: ['a', { value: 'niubi' }, 'b', 'c', 'e'],
//   },
//   {
//     id: 'ding4',
//     title: '这里是4',
//     defaultData: [<input></input>, 'string2'],
//   },
// ];


const options: IOptions[] = [
  {
    id: 'name',
    title: '字段名',
    type: 'input',
    verification: 'number',
    defaultData: [''],
  },
  {
    id: 'type',
    title: '字段类型',
    type: 'select',
    defaultData: [[{value: 'string', isDefault: true}, 'number', 'Object']],
  },
  {
    id: 'distributed',
    title: '数据分布',
    type: 'select',
    defaultData: [[{value: 'a', isDefault: true}, 'b', 'c', 'd', 'e']],
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
  const handleOnDataChange = (result: any) => {
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

ReactDOM.render(
  <TestWrapper />,
  document.querySelector('#app'),
)
