import React, { Component, Fragment } from 'react';
import { Form, Input, InputNumber, Select, Radio, Button } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

@Form.create()
class FromBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: props.dataSource,
    };
  }

  handleSubmit = () => {
    console.log('handleSubmit');
  };

  render() {
    const { form, hidePrevMenu } = this.props;
    const { getFieldDecorator, getFieldValue } = form;
    const { dataSource } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };
    return (
      <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
        {!hidePrevMenu ? (
          <FormItem {...formItemLayout} label="上级菜单:">
            {getFieldDecorator('prevMenu', {
              initialValue: dataSource.prevMenu || '无',
            })(<Input disabled />)}
          </FormItem>
        ) : null}
        <FormItem {...formItemLayout} label="菜单名称:">
          {getFieldDecorator('name', {
            initialValue: dataSource.name,
            rules: [
              {
                required: true,
                message: '请输入菜单名称',
              },
            ],
          })(<Input placeholder="请输入菜单名称" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="菜单地址:">
          {getFieldDecorator('path', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请输入菜单地址',
              },
            ],
          })(<Input placeholder="请输入菜单地址" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="菜单图标:">
          {getFieldDecorator('icon', {
            initialValue: '',
            rules: [
              {
                required: true,
                message: '请输入菜单图标',
              },
            ],
          })(<Input placeholder="请输入菜单图标" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="显示顺序:">
          {getFieldDecorator('orderNo', { initialValue: '0' })(
            <InputNumber min={0} placeholder="输入排列顺序" />
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="菜单状态:">
          {getFieldDecorator('hideInMenu', { initialValue: 'true' })(
            <RadioGroup>
              <Radio value="true">显示</Radio>
              <Radio value="false">隐藏</Radio>
            </RadioGroup>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="面包屑状态:">
          {getFieldDecorator('hideInBreadcrumb', { initialValue: 'true' })(
            <RadioGroup>
              <Radio value="true">显示</Radio>
              <Radio value="false">隐藏</Radio>
            </RadioGroup>
          )}
        </FormItem>
      </Form>
    );
  }
}
export default FromBasic