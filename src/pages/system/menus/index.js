import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Row, Col, Tree, Button } from 'antd';

import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FromBasic from './fromBasic';
import ModalLayout from './modal';

import styles from './index.less';

const DirectoryTree = Tree.DirectoryTree;
const TreeNode = Tree.TreeNode;

@connect(({ systemMenus }) => ({
  systemMenus,
}))
class systemMenuLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalType: 'createMenu',
    };
  }

  onSelect = () => {
    console.log('Trigger Select');
  };

  onExpand = () => {
    console.log('Trigger Expand');
  };

  /**
   * 取消弹出框
   */
  onModalCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'systemMenus/updateState',
      payload: { visible: false },
    });
  };
  /**
   * 弹出框 标题
   */

  setModalTile = modalType => {
    switch (modalType) {
      case 'createMenu':
        return '新建菜单';
      case 'nextMenu':
        return '新建下级菜单';
      default:
        return '弹出框';
    }
  };

  /**
   * 新建菜单
   */

  addMenusFn = () => {
    const { dispatch } = this.props;
    this.setState({
      modalType: 'createMenu',
    });
    dispatch({
      type: 'systemMenus/updateState',
      payload: { visible: true },
    });
  };

  /**
   * 新建下级菜单
   */
  addnextMenusFn = () => {
    const { dispatch } = this.props;
    this.setState({
      modalType: 'nextMenu',
    });
    dispatch({
      type: 'systemMenus/updateState',
      payload: { visible: true },
    });
  };

  /**
   * 弹出框内容提交
   */
  handleSubmit = props => {
    const { modalType } = this.state;
    const {
      form: { getFieldsValue },
    } = props;
    if (modalType === 'createMenu') {
      console.log(getFieldsValue(), '新建菜单');
    } else if (modalType === 'nextMenu') {
      console.log(getFieldsValue(), '新建下级菜单');
    }
  };

  render() {
    const { systemMenus } = this.props;
    const TreeNodes = (
      <TreeNode title="parent 1" key="0-0">
        <TreeNode title="parent 1-0" key="0-0-0">
          <TreeNode title="leaf" key="0-0-0-0" isLeaf />
          <TreeNode title="leaf" key="0-0-0-1" isLeaf />
          <TreeNode title="leaf" key="0-0-0-2" isLeaf />
        </TreeNode>
        <TreeNode title="parent 1-1" key="0-0-1">
          <TreeNode title="leaf" key="0-0-1-0" isLeaf />
        </TreeNode>
        <TreeNode title="parent 1-2" key="0-0-2">
          <TreeNode title="leaf" key="0-0-2-0" isLeaf />
          <TreeNode title="leaf" key="0-0-2-1" isLeaf />
        </TreeNode>
      </TreeNode>
    );
    const { modalType } = this.state;
    const ModalProps = {
      title: this.setModalTile(modalType),
      visible: systemMenus.visible,
      onCancel: this.onModalCancel,
      onOk: this.handleSubmit,
      dataSource: {
        name: '',
        remark: '',
      },
    };
    return (
      <PageHeaderWrapper title="菜单管理">
        <Row gutter={24} type="flex" justify="space-between" className={styles.pageMenuWrap}>
          <Col xl={6} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false} style={{ marginBottom: 24 }}>
              <DirectoryTree
                defaultExpandAll
                defaultSelectedKeys={['0-0-0']}
                onSelect={this.onSelect}
                onExpand={this.onExpand}
              >
                {TreeNodes}
              </DirectoryTree>
            </Card>
          </Col>
          <Col xl={18} lg={24} md={24} sm={24} xs={24}>
            <Card bordered={false}>
              <FromBasic dataSource={{ name: 'niao' }} hidePrevMenu />
            </Card>
            <div className="btnDivBox">
              <Button type="primary" size="large" icon="plus" onClick={this.addMenusFn}>
                新建菜单
              </Button>
              <Button
                type="primary"
                size="large"
                icon="plus-circle-o"
                onClick={this.addnextMenusFn}
              >
                新加下级菜单
              </Button>
              <Button type="primary" size="large" icon="edit">
                修改
              </Button>
              <Button type="danger" size="large" icon="delete">
                删除
              </Button>
            </div>
          </Col>
        </Row>
        <ModalLayout {...ModalProps} />
      </PageHeaderWrapper>
    );
  }
}
export default systemMenuLayout;
