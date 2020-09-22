import React from 'react';
import ReactDOM from 'react-dom';
import CustomMenu from '@widget';
import './index.less';

const SidebarItems = [
  {
    key: "item1",
    name: "item1",
    path: "/item1",
    dot: true,
    children: [
      {
        key: "children1",
        name: "children1",
        path: "/children1",
      },
      {
        key: "children2",
        name: "children2",
        path: "/children2",
      },
    ]
  },
  {
    key: "item2",
    name: "item2",
    path: "/item2",
    children: [
      {
        key: "children3",
        name: "children3",
        path: "/children3",
      },
    ]
  },
];

const Test: React.FC<any> = (props) => {
  return (
    <div>
      <CustomMenu defaultOpenKeys={['item1', 'item2']} sidebarItems={SidebarItems} />
    </div>
  )
}
ReactDOM.render(
  <Test />,
  document.querySelector('#react'),
)
