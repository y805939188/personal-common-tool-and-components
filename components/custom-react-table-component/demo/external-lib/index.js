import React, { PureComponent } from 'react';
import Table from 'antd/es/table';
import Select from 'antd/es/select';
import Input from 'antd/es/input';
import 'antd/es/input/style/index.css';
import cloneDeep from 'lodash/cloneDeep';
import 'antd/es/table/style/index.css';
import 'antd/es/select/style/index.css';
import 'antd/es/pagination/style/index.css';
import 'antd/es/button/style/index.css';

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var _typeof_1 = createCommonjsModule(function (module) {
function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    module.exports = _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    module.exports = _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

module.exports = _typeof;
});

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = "#custom-input-verification-wrapper.error input {\n  border: 1px #f10b0b solid;\n}\n#custom-input-verification-wrapper.error span {\n  color: #f10b0b;\n}\n";
styleInject(css);

var RegExp1 = /^[0-9]+$/;
var RegExp2 = /^[a-zA-Z]+$/;

var MyInput =
/** @class */
function (_super) {
  __extends(MyInput, _super);

  function MyInput(props) {
    var _this = _super.call(this, props) || this;

    _this.verificationRule = null;
    _this.errorText = '';

    _this.initVerification = function (verification) {
      if (!verification) return;

      if (_typeof_1(verification) === 'object') {
        if (verification.rule === 'string') {
          _this.verificationRule = RegExp1;
        } else if (verification.rule === 'number') {
          _this.verificationRule = RegExp2;
        } else {
          _this.verificationRule = verification.rule;
        }

        _this.errorText = verification.errorText || '';
      } else if (verification === 'number') {
        _this.verificationRule = RegExp1;
        _this.errorText = '只允许输入number类型';
      } else if (verification === 'string') {
        _this.verificationRule = RegExp2;
        _this.errorText = '只允许输入string类型';
      } else {
        _this.verificationRule = null;
        _this.errorText = '';
      }
    };

    _this.handleChange = function (e) {
      var _a;

      var onChange = _this.props.onChange;
      var value = ((_a = e === null || e === void 0 ? void 0 : e.target) === null || _a === void 0 ? void 0 : _a.value) || '';

      if (!_this.verificationRule || !value) {
        !_this.state.validate && _this.setState({
          validate: true
        });
        onChange && onChange(e);
      } else {
        var isValidate = _this.verificationRule.test(value);

        if (isValidate) {
          _this.setState({
            validate: true
          });

          onChange && onChange(e);
        } else {
          _this.setState({
            validate: false
          });
        }
      }
    };

    _this.render = function () {
      var _a = _this.props,
          onChange = _a.onChange,
          others = __rest(_a, ["onChange"]);

      var validate = _this.state.validate;
      return React.createElement("div", {
        id: "custom-input-verification-wrapper",
        className: !validate ? 'error' : ''
      }, React.createElement(Input, __assign({}, others, {
        onChange: _this.handleChange
      })), !validate && React.createElement("span", null, _this.errorText));
    };

    var verification = _this.props.verification;

    _this.initVerification(verification);

    _this.state = {
      validate: true
    };
    return _this;
  }

  return MyInput;
}(PureComponent);

var css$1 = "body {\n  margin: 0;\n  padding: 0;\n}\n#pd4-react-business-table-wrapper .ant-table-thead {\n  background-color: #F2F4F8;\n}\n#pd4-react-business-table-wrapper .pd4-react-business-table-select-wrapper {\n  width: 100%;\n}\n#pd4-react-business-table-wrapper .pd4-react-business-table-action-btn {\n  color: #00CACB;\n  cursor: pointer;\n}\n#pd4-react-business-table-wrapper .pd4-react-business-table-action-btn:nth-of-type(1) {\n  margin-right: 10px;\n}\n#pd4-react-business-table-wrapper .pd4-react-business-table-action-btn:nth-of-type(2) {\n  margin-right: 10px;\n}\n#pd4-react-business-table-wrapper .pd4-react-business-table-serial-numebr {\n  margin-left: 10px;\n  color: #A8AFB8;\n}\n";
styleInject(css$1);

var Option = Select.Option;

var ReactTable =
/** @class */
function (_super) {
  __extends(ReactTable, _super);

  function ReactTable(props) {
    var _this = _super.call(this, props) || this;

    _this.componentDidMount = function () {
      var onTableLoaded = _this.props.onTableLoaded;
      onTableLoaded && onTableLoaded(_this.result);
    };

    _this.handleResult = function (options) {
      var _a;

      var defaultDataLengthMax = options.reduce(function (a, b) {
        var defaultData1 = a.defaultData;
        var defaultData2 = b.defaultData;
        if (!defaultData1 && defaultData2) return b;
        if (defaultData1 && !defaultData2) return a;
        if ((defaultData1 || []).length >= (defaultData2 || []).length) return a;
        return b;
      });
      var resultData = new Array((_a = defaultDataLengthMax === null || defaultDataLengthMax === void 0 ? void 0 : defaultDataLengthMax.defaultData) === null || _a === void 0 ? void 0 : _a.length).fill(null);
      options.forEach(function (item) {
        var id = item.id,
            type = item.type,
            defaultData = item.defaultData;
        resultData.forEach(function (res, index) {
          var obj = resultData[index] || (resultData[index] = {});
          if (!defaultData) return obj[id] = '';
          var currentData = defaultData[index];
          if (!currentData) return obj[id] = '';

          if (type === 'input') {
            if (_typeof_1(currentData) === 'object') {
              obj[id] = currentData.value || '';
            } else {
              obj[id] = currentData;
            }
          } else if (type === 'select') {
            if (Array.isArray(currentData)) {
              var temporaryData = currentData.find(function (item) {
                return item && item.isDefault;
              });
              obj[id] = temporaryData && temporaryData.value || '';
            } else if (_typeof_1(currentData) === 'object') {
              var temporaryData = currentData.data && currentData.data.find(function (item) {
                return item && item.isDefault;
              });
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
    };

    _this.getDefaultData = function (key, index) {
      var options = _this.currentOptions;

      var _a = options.find(function (item) {
        return item.id === key;
      }) || {},
          defaultData = _a.defaultData,
          type = _a.type;

      var data = (defaultData || [])[index];

      switch (type) {
        case 'input':
          if (_typeof_1(data) === 'object') {
            return data.value || '';
          } else {
            return data;
          }

        case 'select':
          if (Array.isArray(data)) {
            var temporaryData = data.find(function (item) {
              return item && item.isDefault;
            });
            return temporaryData && temporaryData.value || '';
          } else if (_typeof_1(data) === 'object') {
            var temporaryData = data.data && data.data.find(function (item) {
              return item && item.isDefault;
            });
            return temporaryData && temporaryData.value || '';
          } else {
            return '';
          }

        case 'string':
        case 'custom':
        default:
          return data;
      }
    };

    _this.handleInputChange = function (id, content, record, index, e) {
      var _a;

      _this.result[index][id] = (_a = e.target) === null || _a === void 0 ? void 0 : _a.value; // console.log('改变输入框了', this.result);

      var onDataChange = _this.props.onDataChange;
      onDataChange && onDataChange(_this.result);
    };

    _this.handleSelectChange = function (id, content, record, index, value) {
      _this.result[index][id] = value; // console.log('改变select狂了', this.result);

      var onDataChange = _this.props.onDataChange;
      onDataChange && onDataChange(_this.result);
    };

    _this.handleOptions = function (options) {
      var columns = [];
      var dataSource = [];
      var temporaryIdObj = {};
      options.forEach(function (option, index) {
        var id = option.id,
            title = option.title,
            _a = option.type,
            type = _a === void 0 ? 'custom' : _a,
            _b = option.defaultData,
            defaultData = _b === void 0 ? [] : _b,
            extraProps = option.extraProps,
            verification = option.verification;
        if (!id) return;

        if (!temporaryIdObj[id]) {
          temporaryIdObj[id] = true;
        } else {
          console.warn("id\u4E3A " + id + " \u7684\u51FA\u73B0\u91CD\u590D");
          return;
        }

        var temporary = __assign({}, extraProps);

        temporary.title = title;
        temporary.key = id;
        temporary.dataIndex = String(id);
        defaultData.forEach(function (data, index) {
          var _a;

          !dataSource[index] ? dataSource[index] = (_a = {}, _a[id] = data, _a) : dataSource[index][id] = data;
          dataSource[index].key = "_" + index;
        });

        switch (type) {
          case 'input':
            temporary.render = function (text, record, index) {
              var handleFunction = _this.handleInputChange.bind(_this, id, text, record, index);

              return _typeof_1(text) === 'object' ? React.createElement(MyInput, __assign({
                verification: verification,
                onChange: handleFunction,
                defaultValue: text.value
              }, text.extraProps)) : React.createElement(MyInput, {
                verification: verification,
                onChange: handleFunction,
                defaultValue: text || ''
              });
            };

            break;

          case 'select':
            temporary.render = function (text, record, index) {
              var childrenOptionsObj = {
                OptionsComponents: [],
                defaultValue: '',
                isInvalid: false,
                selectDefaultProps: {}
              };

              var getChildren = function getChildren(data) {
                data.forEach(function (option, index) {
                  var isObject = option && _typeof_1(option) === 'object';
                  var value = isObject ? option.value : option;
                  var optionProps = isObject ? option.extraProps : {};
                  isObject && option.isDefault && (childrenOptionsObj.defaultValue = value);
                  childrenOptionsObj.OptionsComponents.push(React.createElement(Option, __assign({
                    key: value + "_" + index,
                    value: value
                  }, optionProps), value));
                });
              };

              if (Array.isArray(text)) {
                getChildren(text);
              } else if (text && _typeof_1(text) === 'object') {
                var data = text.data,
                    _a = text.extraProps,
                    extraProps_1 = _a === void 0 ? {} : _a;
                childrenOptionsObj.selectDefaultProps = extraProps_1;
                getChildren(data);
              } else {
                childrenOptionsObj.isInvalid = true;
              }

              var handleFunction = _this.handleSelectChange.bind(_this, id, text, record, index);

              return !childrenOptionsObj.isInvalid ? React.createElement(Select, __assign({
                onChange: handleFunction,
                className: "pd4-react-business-table-select-wrapper",
                defaultValue: childrenOptionsObj.defaultValue
              }, childrenOptionsObj.selectDefaultProps), childrenOptionsObj.OptionsComponents) : null;
            };

            break;

          case 'custom':
            temporary.render = function (text, record, index) {
              return React.createElement(React.Fragment, null, text);
            };

            break;
        }
        columns.push(temporary);
      });
      return {
        columns: columns,
        dataSource: dataSource
      };
    };

    _this.handleInsert = function (type, index, record) {
      var currentOptions = _this.currentOptions;

      var newDataSource = __spreadArrays(_this.state.dataSource);

      var newResultTemplate = newDataSource[index];
      var newData = cloneDeep(newResultTemplate);
      newData.key = "_" + +new Date();

      if (type === 'top') {
        newDataSource.splice(index, 0, newData);
        currentOptions.forEach(function (item) {
          var temporaryArr = item.defaultData || (item.defaultData = []);
          temporaryArr.splice(index, 0, temporaryArr[index]);
        });
        var resultObj = _this.result[index] || {};
        var temporaryObj_1 = {};

        _this.result.splice(index, 0, temporaryObj_1);

        Object.keys(resultObj).forEach(function (key) {
          temporaryObj_1[key] = _this.getDefaultData(key, index) || "";
        });
      } else if (type === 'bottom') {
        newDataSource.splice(index + 1, 0, newData);
        currentOptions.forEach(function (item) {
          var temporaryArr = item.defaultData || (item.defaultData = []);
          temporaryArr.splice(index + 1, 0, temporaryArr[index]);
        });
        var resultObj = _this.result[index] || {};
        var temporaryObj_2 = {};

        _this.result.splice(index + 1, 0, temporaryObj_2);

        Object.keys(resultObj).forEach(function (key) {
          temporaryObj_2[key] = _this.getDefaultData(key, index) || "";
        });
      } // console.log('新的result是', this.result)


      var onDataChange = _this.props.onDataChange;
      onDataChange && onDataChange(_this.result);

      _this.setState({
        dataSource: newDataSource
      });
    };

    _this.handleDelete = function (index) {
      var currentOptions = _this.currentOptions;

      var newDataSource = __spreadArrays(_this.state.dataSource);

      newDataSource.splice(index, 1);
      currentOptions.forEach(function (item) {
        var temporaryArr = item.defaultData || (item.defaultData = []);
        temporaryArr.splice(index, 1);
      });

      _this.result.splice(index, 1); // console.log('这里的result是', this.result);


      var onDataChange = _this.props.onDataChange;
      onDataChange && onDataChange(_this.result);

      _this.setState({
        dataSource: newDataSource
      });
    };

    _this.getTableProps = function (obj) {
      var _a = _this.props,
          _b = _a.topInsert,
          topInsert = _b === void 0 ? true : _b,
          _c = _a.bottomInsert,
          bottomInsert = _c === void 0 ? true : _c,
          _d = _a.allowDelete,
          allowDelete = _d === void 0 ? true : _d,
          _e = _a.actionProps,
          actionProps = _e === void 0 ? {} : _e,
          _f = _a.serialNumber,
          serialNumber = _f === void 0 ? true : _f,
          serialNumberText = _a.serialNumberText;
      if (!topInsert && !bottomInsert && !allowDelete) return {
        columns: obj.columns,
        dataSource: obj.dataSource
      };

      var title = actionProps.title,
          key = actionProps.key,
          render = actionProps.render,
          topInsertBtnText = actionProps.topInsertBtnText,
          bottomInsertBtnText = actionProps.bottomInsertBtnText,
          deleteBtnText = actionProps.deleteBtnText,
          others = __rest(actionProps, ["title", "key", "render", "topInsertBtnText", "bottomInsertBtnText", "deleteBtnText"]);

      var temporaryColumns = __assign({
        title: title || '操作',
        key: key || '__INTERNAL_ACTIONS__',
        render: render || function (text, record, index) {
          return React.createElement(React.Fragment, null, topInsert && React.createElement("span", {
            onClick: _this.handleInsert.bind(_this, 'top', index, record),
            className: "pd4-react-business-table-action-btn"
          }, topInsertBtnText || '上插一行'), bottomInsert && React.createElement("span", {
            onClick: _this.handleInsert.bind(_this, 'bottom', index, record),
            className: "pd4-react-business-table-action-btn"
          }, bottomInsertBtnText || '下插一行'), allowDelete && React.createElement("span", {
            onClick: _this.handleDelete.bind(_this, index),
            className: "pd4-react-business-table-action-btn"
          }, deleteBtnText || '删除'));
        }
      }, others);

      obj.columns.push(temporaryColumns);

      if (serialNumber) {
        var temporaryColumns2 = {
          title: serialNumberText || '序号',
          key: '__INTERNAL_SERIAL_NUMBER__',
          render: function render(text, record, index) {
            return React.createElement("span", {
              className: "pd4-react-business-table-serial-numebr"
            }, index + 1);
          }
        };
        obj.columns.unshift(temporaryColumns2);
      }

      return {
        columns: obj.columns,
        dataSource: obj.dataSource
      };
    };

    var options = props.options,
        customColumns = props.columns,
        customDataSource = props.dataSource;

    if (customColumns && customDataSource) {
      _this.state = {
        columns: customColumns,
        dataSource: customDataSource
      };
      _this.currentOptions = [];
      _this.result = [];
    } else {
      var _a = _this.getTableProps(_this.handleOptions(options)),
          _b = _a.columns,
          columns = _b === void 0 ? [] : _b,
          _c = _a.dataSource,
          dataSource = _c === void 0 ? [] : _c;

      _this.currentOptions = cloneDeep(options);
      _this.state = {
        columns: columns,
        dataSource: dataSource
      };
      _this.result = _this.handleResult(options); // console.log('init初始值是', this.result)
    }

    return _this;
  }

  ReactTable.prototype.render = function () {
    var _a = this.props,
        _b = _a.pagination,
        pagination = _b === void 0 ? false : _b,
        width = _a.width,
        height = _a.height,
        others = __rest(_a, ["pagination", "width", "height"]);

    var _c = this.state,
        columns = _c.columns,
        dataSource = _c.dataSource;
    var style = {};
    width && (style.width = width);
    height && (style.height = height);
    return React.createElement("div", __assign({}, style, {
      id: "pd4-react-business-table-wrapper"
    }), React.createElement(Table, __assign({
      pagination: pagination,
      columns: columns,
      dataSource: dataSource
    }, others)));
  };

  return ReactTable;
}(PureComponent);

export default ReactTable;
//# sourceMappingURL=index.js.map
