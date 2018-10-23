import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';

import { Card, Divider, Button, Table, Icon } from 'antd';
// import HocModal from './hocModal';
import FromBasic from './fromBasic';

import styles from './index.less';

// const DirectoryTree = Tree.DirectoryTree;
// const TreeNode = Tree.TreeNode;

@connect(({ systemRoles, loading }) => ({
  systemRoles,
  loading,
}))
class systemRolesLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalType: 'createRole',
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRoles/query',
    });
  }

  /**
   * 弹出框取消
   */
  onModalCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRoles/updateState',
      payload: {
        modalVisible: false,
      },
    });
  };

  /**
   * 弹出框 标题
   */
  setModalTile = modalType => {
    switch (modalType) {
      case 'createRole':
        return '新建角色';
      case 'updateRole':
        return '修改角色';
      default:
        return '弹出框';
    }
  };

  /**
   * 创建角色
   */

  createRole = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRoles/updateState',
      payload: {
        modalVisible: true,
      },
    });
    this.setState({
      modalType: 'createRole',
    });
  };

  /**
   * 弹出框内容提交
   */
  handleSubmit = _ref => {
    const { modalType } = this.state;
    const {
      form: { getFieldsValue },
    } = _ref.props;
    if (modalType === 'createRole') {
      console.log(getFieldsValue(), '新建角色');
    } else if (modalType === 'updateRole') {
      console.log(getFieldsValue(), '编辑角色');
    }
  };

  editFn = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemRoles/updateState',
      payload: {
        modalVisible: true,
      },
    });
    this.setState({
      modalType: 'updateRole',
    });
  };

  render() {
    const {
      systemRoles: { data, modalVisible },
    } = this.props;
    const { modalType } = this.state;

    const columns = [
      {
        title: '序号',
        width: '80px',
        dataIndex: 'xh',
        render: (text, record, index) => {
          return index + 1;
        },
      },
      {
        title: '角色名称',
        dataIndex: 'roleName',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <a onClick={this.editFn}>
              <Icon type="edit" />
              修改
            </a>
            <Divider type="vertical" />
            <a href="">
              <Icon type="delete" />
              删除
            </a>
            <Divider type="vertical" />
            <a href="">
              <Icon type="user-add" />
              分配用户
            </a>
            <Divider type="vertical" />
            <a href="">
              <Icon type="fork" />
              分配菜单
            </a>
          </Fragment>
        ),
      },
    ];
    const ModalProps = {
      title: this.setModalTile(modalType),
      visible: modalVisible,
      onCancel: this.onModalCancel,
      onOk: this.handleSubmit,
      dataSource: {
        roleName: '',
        remark: '',
      },
    };
    return (
      <PageHeaderWrapper title="系统角色管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.createRole}>
                新建角色
              </Button>
            </div>
            <Table
              bordered
              rowKey={record => record.id}
              loading={false}
              columns={columns}
              // dataSource={data.list}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <FromBasic {...ModalProps} />
      </PageHeaderWrapper>
    );
  }
}
export default systemRolesLayout;
