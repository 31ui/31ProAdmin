import React, { Component } from 'react';
import { Form, Input } from 'antd';
import ModalLayout from '@/components/HocModal';

const FormItem = Form.Item;

@Form.create()
class FromBasic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...props,
    };
  }

  render() {
    const { dataSource, form } = this.state;
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
        <FormItem {...formItemLayout} label="角色名称:">
          {getFieldDecorator('roleName', {
            initialValue: dataSource.roleName,
            rules: [
              {
                required: true,
                message: '请输入角色名称',
              },
            ],
          })(<Input placeholder="请输入角色名称" />)}
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
