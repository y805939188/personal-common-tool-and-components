import React, { useCallback, useMemo } from 'react';
import Menu, { MenuProps } from 'antd/es/menu';
import Tooltip from 'antd/es/tooltip';
import 'antd/es/menu/style/index.css';
import 'antd/es/tooltip/style/index.css';
import './index.less';

const SubMenu = Menu.SubMenu;
const MenuItem = Menu.Item;

export interface SidebarItem {
  key: string;
  name: React.ReactNode;
  allowClicked?: boolean;
  children?: SidebarItem[];
  path?: string;
  tooltip?: {
    title: React.ReactNode;
    placement?: ('top' | 'bottom' | 'left' | 'right');
  };
  dot?: boolean;
  iconBeforeClicked?: React.ReactNode;
  iconAfterClicked?: React.ReactNode;
}

export interface IProps extends MenuProps {
  header?: string;
  sidebarItems: SidebarItem[];
  shouldShowItem?: boolean;
  defaultOpenKeys?: string[];
  defaultSelectedKeys?: string[];
  children?: React.ReactElement;
  onClickItem?(params: SidebarItem, parent?: SidebarItem): void;
}

const getItem = (
  items: SidebarItem[],
  cb: IProps['onClickItem'],
  k: string[] | undefined,
  parent?: SidebarItem,
) => {
  const res = items.map((item) => {
    const children = item.children;
    const options = item.tooltip;
    const { key, iconAfterClicked, iconBeforeClicked , dot, name, allowClicked = true } = item;
    if (children) {
      const title = (options ? <Tooltip {...options}>{name}</Tooltip> : name);
      const childBeClicked = k && (children || []).some(child => (k.includes(child.key)));
      return (
        <SubMenu
          key={key}
          className={dot ? 'menu-dot' : ''}
          title={useMemo(() => (
            <>
              {childBeClicked ? iconAfterClicked : iconBeforeClicked}
              &nbsp;&nbsp;&nbsp;
              {title}
            </>
          ), [childBeClicked])}
          onTitleClick={useCallback(() => {
            item.path && (window.location.hash = `#${item.path}`);
            allowClicked && cb && cb(item, parent);
          }, [])}
        >{children && getItem(children, cb, k, item)}</SubMenu>
      );
    }
    const oDiv = (<div onClick={
      () => {
        item.path && (window.location.hash = `#${item.path}`);
        allowClicked && cb && cb(item, parent);
      }
    }>
      <>
        {k ? k.includes(key) ? iconAfterClicked : iconBeforeClicked : null}
        &nbsp;&nbsp;&nbsp;
        {item.name}
      </>
    </div>);
    const ChildComponent = (options ?
      (<Tooltip {...options}>{oDiv}</Tooltip>) : oDiv);
    return (<MenuItem key={`${item.key}`}>{ChildComponent}</MenuItem>);
  });
  return res;
};

const ProphetContent: React.FC<IProps> = (props) => {
  const {
    header,
    children,
    onClickItem,
    sidebarItems,
    selectedKeys,
    shouldShowItem = true,
    defaultOpenKeys,
    defaultSelectedKeys,
    ...other
  } = props;
  const contentClass = shouldShowItem ? 'custom-prophet-content-entity' : 'custom-prophet-content-no-item';
  return (
    <div
      className={`${children ? 'has-children' : ''} custom-prophet-content-wrapper clearfloat`}
      data-test="test"
    >
      {shouldShowItem && (
        <div className="custom-prophet-content">
          {header && <div className="custom-prophet-content-header">{header}</div>}
          <Menu
            mode="inline"
            className="custom-prophet-content-menu"
            defaultOpenKeys={defaultOpenKeys}
            selectedKeys={selectedKeys}
            {...other}
          >{getItem(sidebarItems, onClickItem, selectedKeys)}</Menu>
        </div>
      )}
      {children && <div className={contentClass}>{children}</div>}
    </div>
  );
};

export default React.memo(ProphetContent);
