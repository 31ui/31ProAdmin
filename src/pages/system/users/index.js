import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import { Card, Divider, Button, Table, Icon } from 'antd';
// import HocModal from './hocModal';
import FromBasic from './fromBasic';
import AddRoles from './addRoles';

import styles from './index.less';

// const DirectoryTree = Tree.DirectoryTree;
// const TreeNode = Tree.TreeNode;

@connect(({ systemUsers, loading }) => ({
  systemUsers,
  loading,
}))
class systemUsersLayout extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      modalType: 'createUser',
      userData: {},
    };
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemUsers/query',
    });
  }

  /**
   * 弹出框取消
   */
  onModalCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemUsers/updateState',
      payload: {
        modalVisible: false,
        addRolesVisible: false,
      },
    });
  };

  /**
   * 弹出框 标题
   */
  setModalTile = modalType => {
    switch (modalType) {
      case 'createUser':
        return '新建用户';
      case 'updateUser':
        return '修改用户';
      default:
        return '弹出框';
    }
  };

  /**
   * 创建用户
   */

  createUser = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemUsers/updateState',
      payload: {
        modalVisible: true,
      },
    });
    this.setState({
      modalType: 'createUser',
      userData: {},
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
    if (modalType === 'createUser') {
      console.log(getFieldsValue(), '新建用户');
    } else if (modalType === 'updateUser') {
      console.log(getFieldsValue(), '编辑用户');
    }
  };

  /**
   * 分配角色
   */
  handleRolesSubmit = props => {
    console.log(props);
  };
  /**
   * 修改
   */

  editFn = record => {
    const { dispatch } = this.props;

    dispatch({
      type: 'systemUsers/updateState',
      payload: {
        modalVisible: true,
      },
    });
    this.setState({
      modalType: 'updateUser',
      userData: record,
    });
  };

  /**
   * 分配角色
   */
  addRolesFn = (text, record, index) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemUsers/updateState',
      payload: {
        addRolesVisible: true,
      },
    });
  };

  render() {
    const {
      systemUsers: { data, modalVisible, addRolesVisible },
    } = this.props;
    const { modalType, userData } = this.state;
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
        title: '头像',
        dataIndex: 'avator',
        render: (text, record, index) => {
          return <img src={text} />;
        },
      },
      {
        title: '账号',
        dataIndex: 'userName',
      },
      {
        title: '姓名',
        dataIndex: 'name',
      },
      {
        title: '手机号',
        dataIndex: 'phone',
      },
      {
        title: '角色类型',
        dataIndex: 'roleName',
      },
      {
        title: '备注',
        dataIndex: 'remark',
      },
      {
        title: '操作',
        render: (text, record, index) => (
          <Fragment>
            <a
              onClick={() => {
                this.editFn(record);
              }}
            >
              <Icon type="edit" />
              修改
            </a>
            <Divider type="vertical" />
            <a href="">
              <Icon type="delete" />
              删除
            </a>
            <Divider type="vertical" />
            <a onClick={this.addRolesFn}>
              <Icon type="user-add" />
              分配角色
            </a>
            <Divider type="vertical" />
            <a href="">
              <Icon type="fork" />
              重置密码
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
      dataSource: userData,
    };
    const addRolesProps = {
      title: '分配角色',
      visible: addRolesVisible,
      onCancel: this.onModalCancel,
      onOk: this.handleRolesSubmit,
      dataSource: {
        roleName: '',
        remark: '',
      },
    };
    return (
      <PageHeaderWrapper title="系统用户管理">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={this.createUser}>
                新建用户
              </Button>
            </div>
            <Table
              bordered
              rowKey={record => record.id}
              loading={false}
              columns={columns}
              //  dataSource={data.list}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <FromBasic {...ModalProps} />
        <AddRoles {...addRolesProps} />
      </PageHeaderWrapper>
    );
  }
}

export default systemUsersLayout;
