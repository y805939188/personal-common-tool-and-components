import React, { PureComponent, ChangeEvent } from 'react';
import Input, { InputProps } from 'antd/es/input';
import 'antd/es/input/style/index.css';
import './index.less';

export interface MyInputProps extends InputProps {
  verification?: {
    rule: 'number' | 'string' | RegExp;
    errorText: string;
  } | 'string' | 'number';
}

interface IState {
  validate: boolean;
}

const RegExp1 = /^[0-9]+$/;
const RegExp2 = /^[a-zA-Z]+$/;
class MyInput extends PureComponent<MyInputProps, IState> {
  private verificationRule: RegExp | null = null;
  private errorText: string = '';
  constructor(props: MyInputProps) {
    super(props);
    const { verification } = this.props;
    this.initVerification(verification);
    this.state = { validate: true };
  }

  private initVerification = (verification: MyInputProps['verification']) => {
    if (!verification) return;
    if (typeof verification === 'object') {
      if (verification.rule === 'string') {
        this.verificationRule = RegExp1;
      } else if (verification.rule === 'number') {
        this.verificationRule = RegExp2;
      } else {
        this.verificationRule = verification.rule;
      }
      this.errorText = verification.errorText || '';
    } else if (verification === 'number') {
      this.verificationRule = RegExp1;
      this.errorText = '只允许输入number类型';
    } else if (verification === 'string') {
      this.verificationRule = RegExp2;
      this.errorText = '只允许输入string类型';
    } else {
      this.verificationRule = null;
      this.errorText = '';
    }
  }

  private handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { onChange } = this.props;
    const value = e?.target?.value || '';
    if (!this.verificationRule || !value) {
      (!this.state.validate) && this.setState({ validate: true });
      onChange && onChange(e);
    } else {
      const isValidate = this.verificationRule.test(value);
      if (isValidate) {
        this.setState({ validate: true });
        onChange && onChange(e);
      } else {
        this.setState({ validate: false });
      }
    }
  }

  render = () => {
    const { onChange, ...others } = this.props;
    const { validate } = this.state;
    return (
      <div id="custom-input-verification-wrapper" className={!validate ? 'error' : ''} >
        <Input {...others} onChange={this.handleChange} />
        {!validate && <span>{this.errorText}</span>}
      </div>
    )
  }
}

export default MyInput;
