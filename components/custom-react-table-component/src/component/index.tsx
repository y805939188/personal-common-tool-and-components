import React, { PureComponent, ReactElement, ReactNode, ChangeEvent } from 'react';
import Table, { TableProps, ColumnProps } from 'antd/es/table';
import Select, { SelectProps, OptionProps } from 'antd/es/select';
import { InputProps } from 'antd/es/input';
import MyInput, { MyInputProps } from './my-input';
import cloneDeep from 'lodash/cloneDeep';
import 'antd/es/table/style/index.css';
import 'antd/es/select/style/index.css';
import 'antd/es/pagination/style/index.css';
import 'antd/es/button/style/index.css';
import './index.less';

type ISelectBase0 = { value: any; isDefault?: boolean, extraProps?: OptionProps };
type ISelectBase1 = number | string | ReactElement | ISelectBase0;
type ISelectBase2 = { data: ISelectBase1[]; extraProps?: SelectProps };
type ISelectDefault = (ISelectBase1[] | ISelectBase2)[];

type IInputBase0 = number | string;
type IInputBase1 = { value: IInputBase0; extraProps?: InputProps };
type IInputDefault = (IInputBase0 | IInputBase1)[];

interface IOptionsBase {
  id: string | number;
  title: string | React.ReactElement;
  extraProps?: ColumnProps<any>;
  verification?: MyInputProps['verification'];
}

interface IOptionsBase0 extends IOptionsBase {
  type?: 'input';
  defaultData?: IInputDefault;
}

interface IOptionsBase1 extends IOptionsBase {
  type?: 'string';
  defaultData?: (number | string | ReactElement)[];
}

interface IOptionsBase2 extends IOptionsBase {
  type?: 'select';
  defaultData?: ISelectDefault;
}

interface IOptionsBase3 extends IOptionsBase {
  type?: 'custom';
  defaultData?: any[];
}

export type IOptions = IOptionsBase0 | IOptionsBase1 | IOptionsBase2 | IOptionsBase3;

interface IActionsProps extends ColumnProps<any> {
  topInsertBtnText?: string;
  bottomInsertBtnText?: string;
  deleteBtnText?: string;
}

export interface IProps extends TableProps<any> {
  options: IOptions[];
  topInsert?: boolean;
  bottomInsert?: boolean;
  allowDelete?: boolean;
  actionProps?: IActionsProps;
  width?: number | string;
  height?: number | string;
  serialNumber?: boolean;
  serialNumberText?: string;
  onDataChange?: (result: { [propname: string]: any }[]) => void;
  onTableLoaded?: (result: { [propname: string]: any }[]) => void;
}

interface IStates {
  columns: ColumnProps<any>[];
  dataSource: any[];
}

type ITablePara = {
  columns: ColumnProps<any>[];
  dataSource: any[];
}

const { Option } = Select;
export default class ReactTable extends PureComponent<IProps, IStates> {
  private currentOptions: IProps['options'];
  private result: { [prop: string]: any }[];
  constructor(props: IProps) {
    super(props);
    const { options, columns: customColumns, dataSource: customDataSource } = props;
    if (customColumns && customDataSource) {
      this.state = { columns: customColumns, dataSource: customDataSource };
      this.currentOptions = [];
      this.result = [];
    } else {
      const { columns = [], dataSource = [] } = this.getTableProps(this.handleOptions(options));
      this.currentOptions = cloneDeep(options);
      this.state = { columns, dataSource };
      this.result = this.handleResult(options);
      // console.log('init初始值是', this.result)
    }
  }

  componentDidMount = () => {
    const { onTableLoaded } = this.props;
    onTableLoaded && onTableLoaded(this.result);
  }

  private handleResult = (options: IOptions[]) => {
    const defaultDataLengthMax = options.reduce((a, b) => {
      const defaultData1 = a.defaultData;
      const defaultData2 = b.defaultData;
      if (!defaultData1 && defaultData2) return b;
      if (defaultData1 && !defaultData2) return a;
      if ((defaultData1 || []).length >= (defaultData2 || []).length) return a;
      return b;
    });
    const resultData: any[] = new Array(defaultDataLengthMax?.defaultData?.length).fill(null);
    options.forEach(item => {
      const { id, type, defaultData } = item;
      resultData.forEach((res, index) => {
        const obj = resultData[index] || (resultData[index] = {});
        if (!defaultData) return obj[id] = '';
        const currentData = defaultData[index];
        if (!currentData) return obj[id] = '';
        if (type === 'input') {
          if (typeof currentData === 'object') {
            obj[id] = currentData.value || '';
          } else {
            obj[id] = currentData;
          }
        } else if (type === 'select') {
          if (Array.isArray(currentData)) {
            const temporaryData = currentData.find(item => item && item.isDefault);
            obj[id] = temporaryData && temporaryData.value || '';
          } else if (typeof currentData === 'object') {
            const temporaryData = currentData.data && currentData.data.find((item: any) => item && item.isDefault);
            obj[id] = temporaryData && temporaryData.value || '';
          } else {
            obj[id] = '';
          }
        } else {
          obj[id] = currentData;
        }
      });
    });
    return resultData;
  }

  private getDefaultData = (key: string, index: number) => {
    const options = this.currentOptions;
    const { defaultData, type } = options.find(item => item.id === key) || {};
    const data = (defaultData || [])[index];
    switch (type) {
      case 'input':
        if (typeof data === 'object') {
          return data.value || '';
        } else {
          return data;
        }
      case 'select':
        if (Array.isArray(data)) {
          const temporaryData = data.find(item => item && item.isDefault);
          return temporaryData && temporaryData.value || '';
        } else if (typeof data === 'object') {
          const temporaryData = data.data && data.data.find((item: any) => item && item.isDefault);
          return temporaryData && temporaryData.value || '';
        } else {
          return '';
        }
      case 'string':
      case 'custom':
      default: return data;
    }
  }

  private handleInputChange = (id: string, content: IInputBase0 | IInputBase1, record: any, index: number, e: ChangeEvent<HTMLInputElement>) => {
    this.result[index][id] = e.target?.value;
    // console.log('改变输入框了', this.result);
    const { onDataChange } = this.props;
    onDataChange && onDataChange(this.result);
  }

  private handleSelectChange = (id: string, content: ISelectBase1[] | ISelectBase2, record: any, index: number, value: any) => {
    this.result[index][id] = value;
    // console.log('改变select狂了', this.result);
    const { onDataChange } = this.props;
    onDataChange && onDataChange(this.result);
  }

  private handleOptions = (options: IOptions[]): ITablePara => {
    const columns: ColumnProps<any>[] = [];
    const dataSource: any[] = [];
    const temporaryIdObj: { [id: string]: true } = {};
    options.forEach((option, index) => {
      const { id, title, type = 'custom', defaultData = [], extraProps, verification } = option;
      if (!id) return;
      if (!temporaryIdObj[id]) {
        temporaryIdObj[id] = true;
      } else {
        console.warn(`id为 ${id} 的出现重复`);
        return;
      }
      const temporary: ColumnProps<any> = { ...extraProps };
      temporary.title = title;
      temporary.key = id;
      temporary.dataIndex = String(id);
      defaultData.forEach((data, index) => {
        (!dataSource[index]) ? (dataSource[index] = { [id]: data }) : (dataSource[index][id] = data);
        dataSource[index].key = `_${index}`;
      });
      switch (type) {
        case 'input':
          temporary.render = (text: IInputBase0 | IInputBase1, record: any, index: number): ReactNode => {
            const handleFunction = this.handleInputChange.bind(this, id, text, record, index);
            return (typeof text === 'object') ?
              <MyInput verification={verification} onChange={handleFunction} defaultValue={text.value} {...text.extraProps} /> :
              <MyInput verification={verification} onChange={handleFunction} defaultValue={text || ''} />
          };
          break;
        case 'select':
          temporary.render = (text: ISelectBase1[] | ISelectBase2, record: any, index: number): ReactNode => {
            const childrenOptionsObj: {
              OptionsComponents: ReactNode[];
              defaultValue: any;
              isInvalid: boolean;
              selectDefaultProps: SelectProps;
            } = {
              OptionsComponents: [],
              defaultValue: '',
              isInvalid: false,
              selectDefaultProps: {},
            };
            const getChildren = (data: ISelectBase1[]) => {
              data.forEach((option, index: number) => {
                const isObject = option && typeof option === 'object';
                const value = isObject ? (option as ISelectBase0).value : option;
                const optionProps = isObject ? (option as ISelectBase0).extraProps : {};
                isObject && (option as ISelectBase0).isDefault && (childrenOptionsObj.defaultValue = value);
                childrenOptionsObj.OptionsComponents.push(
                  <Option key={`${value}_${index}`} value={value} {...optionProps} >{value}</Option>
                );
              });
            };
            if (Array.isArray(text)) {
              getChildren(text);
            } else if (text && typeof text === 'object') {
              const { data, extraProps = {} } = text;
              childrenOptionsObj.selectDefaultProps = extraProps;
              getChildren(data);
            } else {
              childrenOptionsObj.isInvalid = true;
            }
            const handleFunction = this.handleSelectChange.bind(this, id, text, record, index);
            return (
              !childrenOptionsObj.isInvalid ? (
                <Select
                  onChange={handleFunction}
                  className="pd4-react-business-table-select-wrapper"
                  defaultValue={childrenOptionsObj.defaultValue}
                  { ...childrenOptionsObj.selectDefaultProps }
                >
                  {childrenOptionsObj.OptionsComponents}
                </Select>) :
                null
            );
          };
          break;
        case 'custom':
          temporary.render = (text: any, record: any, index: number): ReactNode => (<>{text}</>);
          break;
        case 'string':
        default:
          break;
      };
      columns.push(temporary);
    });
    return { columns, dataSource };
  }

  private handleInsert = (type: 'top' | 'bottom', index: number, record: any) => {
    const currentOptions = this.currentOptions;
    const newDataSource = [...this.state.dataSource];
    const newResultTemplate = newDataSource[index];
    const newData = cloneDeep(newResultTemplate);
    
    newData.key = `_${+ new Date}`;
    if (type === 'top') {
      newDataSource.splice(index, 0, newData);
      currentOptions.forEach(item => {
        const temporaryArr = item.defaultData || (item.defaultData = []);
        temporaryArr.splice(index, 0, temporaryArr[index]);
      });
      const resultObj = this.result[index] || {};
      const temporaryObj: { [prop: string]: any } = {};
      this.result.splice(index, 0, temporaryObj);
      Object.keys(resultObj).forEach(key => {
        temporaryObj[key] = this.getDefaultData(key, index) || "";
      });
    } else if (type === 'bottom') {
      newDataSource.splice(index + 1, 0, newData);
      currentOptions.forEach(item => {
        const temporaryArr = item.defaultData || (item.defaultData = []);
        temporaryArr.splice(index + 1, 0, temporaryArr[index]);
      });
      const resultObj = this.result[index] || {};
      const temporaryObj: { [prop: string]: any } = {};
      this.result.splice(index + 1, 0, temporaryObj);
      Object.keys(resultObj).forEach(key => {
        temporaryObj[key] = this.getDefaultData(key, index) || "";
      });
    }
    // console.log('新的result是', this.result)
    const { onDataChange } = this.props;
    onDataChange && onDataChange(this.result);
    this.setState({ dataSource: newDataSource });
  }

  private handleDelete = (index: number) => {
    const currentOptions = this.currentOptions;
    const newDataSource = [...this.state.dataSource];
    newDataSource.splice(index, 1);
    currentOptions.forEach(item => {
      const temporaryArr = item.defaultData || (item.defaultData = []);
      temporaryArr.splice(index, 1);
    });
    this.result.splice(index, 1);
    // console.log('这里的result是', this.result);
    const { onDataChange } = this.props;
    onDataChange && onDataChange(this.result);
    this.setState({ dataSource: newDataSource });
  }

  private getTableProps = (obj: { columns: ITablePara['columns'], dataSource: ITablePara['dataSource'] }): ITablePara => {
    const { topInsert = true, bottomInsert = true, allowDelete = true, actionProps = {}, serialNumber = true, serialNumberText } = this.props;
    if (!topInsert && !bottomInsert && !allowDelete) return { columns: obj.columns, dataSource: obj.dataSource };
    const { title, key, render, topInsertBtnText, bottomInsertBtnText, deleteBtnText, ...others } = actionProps;
    const temporaryColumns: ColumnProps<any> = {
      title: title || '操作',
      key: key || '__INTERNAL_ACTIONS__',
      render: render || (
        (text, record, index) => {
          return (
            <>
              {topInsert && (
                <span
                  onClick={this.handleInsert.bind(this, 'top', index, record)}
                  className="pd4-react-business-table-action-btn"
                >{topInsertBtnText || '上插一行'}</span>
              )}
              {bottomInsert && (
                <span
                  onClick={this.handleInsert.bind(this, 'bottom', index, record)}
                  className="pd4-react-business-table-action-btn"
                >{bottomInsertBtnText || '下插一行'}</span>
              )}
              {allowDelete && (
                <span
                  onClick={this.handleDelete.bind(this, index)}
                  className="pd4-react-business-table-action-btn"
                >{deleteBtnText || '删除'}</span>
              )}
            </>
          )
        }
      ),
      ...others,
    };
    obj.columns.push(temporaryColumns);
    if (serialNumber) {
      const temporaryColumns2: ColumnProps<any> = {
        title: serialNumberText || '序号',
        key: '__INTERNAL_SERIAL_NUMBER__',
        render: (text, record, index) => {
          return (<span className="pd4-react-business-table-serial-numebr" >{index + 1}</span>)
        },
      };
      obj.columns.unshift(temporaryColumns2);
    }
    return { columns: obj.columns, dataSource: obj.dataSource };
  }

  render() {
    const { pagination = false, width, height, ...others } = this.props;
    const { columns, dataSource } = this.state;
    const style: any = {};
    width && (style.width = width);
    height && (style.height = height);
    return (
      <div {...style} id="pd4-react-business-table-wrapper">
        <Table pagination={pagination} columns={columns} dataSource={dataSource} {...others} />
      </div>
    );
  }
}
