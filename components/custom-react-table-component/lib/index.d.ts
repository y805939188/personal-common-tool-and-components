import React, { PureComponent, ReactElement, ReactNode, ChangeEvent } from 'react';
import { TableProps, ColumnProps } from 'antd/es/table';
import { SelectProps, OptionProps } from 'antd/es/select';
import { InputProps } from 'antd/es/input';

interface MyInputProps extends InputProps {
  verification?: {
    rule: 'number' | 'string' | RegExp;
    errorText: string;
  } | 'string' | 'number';
}

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
  type?: 'string' | 'input';
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

declare class ReactTable extends PureComponent<IProps, IStates> {
  private currentOptions: IProps['options'];
  private result: { [prop: string]: any }[];
  private handleResult: (options: IOptions[]) => any;
  private getDefaultData: (key: string, index: number) => any;
  private handleInputChange: (id: string, content: IInputBase0 | IInputBase1, record: any, index: number, e: ChangeEvent<{value: any}>) => void;
  private handleSelectChange: (id: string, content: ISelectBase1[] | ISelectBase2, record: any, index: number, value: any) => void;
  private handleOptions: (options: IOptions[]) => ITablePara;
  private handleInsert: (type: 'top' | 'bottom', index: number, record: any) => void;
  private handleDelete: (index: number) => void;
  private getTableProps: (obj: { columns: ITablePara['columns'], dataSource: ITablePara['dataSource'] }) => ITablePara;
  render: () => ReactNode;
}

export default ReactTable;
