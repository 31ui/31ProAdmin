import React, { Component } from 'react';
import { Form, Input, Select } from 'antd';
import ModalLayout from '@/components/HocModal';

const Option = Select.Option;
const FormItem = Form.Item;

@Form.create()
class FromBasic extends Component {
  constructor(props) {
    super(props);
    //   debugger
    //   this.state = {
    //     ...props,
    //   }
  }

  render() {
    const { dataSource, form } = this.props;
    const { getFieldDecorator } = form;
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
      <Form style={{ marginTop: 8 }}>
        <FormItem {...formItemLayout} label="账号:">
          {getFieldDecorator('userName', {
            initialValue: dataSource.userName,
            rules: [
              {
                required: true,
                message: '请输入账号',
              },
            ],
          })(<Input placeholder="请输入账号" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="昵称:">
          {getFieldDecorator('name', {
            initialValue: dataSource.name,
            rules: [
              {
                required: true,
                message: '请输入昵称',
              },
            ],
          })(<Input placeholder="请输入昵称" />)}
        </FormItem>

        <FormItem {...formItemLayout} label="手机号:">
          {getFieldDecorator('phone', {
            initialValue: dataSource.phone,
            rules: [
              {
                required: true,
                message: '请输入正确手机号',
              },
            ],
          })(<Input placeholder="请输入手机号" />)}
        </FormItem>
        <FormItem {...formItemLayout} label="角色类型:">
          {getFieldDecorator('role', {
            initialValue: dataSource.role,
            rules: [
              {
                required: true,
                message: '请选择角色类型',
              },
            ],
          })(
            <Select placeholder="请选择角色类型 " mode="multiple">
              <Option value="admin">admin</Option>
              <Option value="user">user</Option>
            </Select>
          )}
        </FormItem>
        <FormItem {...formItemLayout} label="备注:">
          {getFieldDecorator('remark', {
            initialValue: dataSource.remark,
          })(<Input placeholder="备注信息" />)}
        </FormItem>
      </Form>
    );
  }
}

export default ModalLayout(FromBasic);
