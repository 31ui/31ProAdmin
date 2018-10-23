import React, { Component } from 'react';
import { Modal } from 'antd';

export default WrappedComponent =>
  class ModalLayout extends Component {
    static displayName = `ModalLayout(${WrappedComponent.displayName ||
      WrappedComponent.name ||
      'Component'})`;

    handleSubmit = () => {
      const { onOk } = this.props;
      onOk(this.formRef);
    };

    afterCloseFn = () => {
      if (this.formRef.props.form) {
        const { resetFields } = this.formRef.props.form;
        resetFields();
      }
    };

    render() {
      const {
        title,
        visible = false,
        maskClosable,
        wrapClassName = 'fromBasicModalWrap',
        onCancel,
        dataSource,
      } = this.props;
      const WrappedComponentProps = {
        dataSource,
      };

      return (
        <Modal
          centered
          maskClosable={maskClosable || false}
          title={title}
          visible={visible}
          wrapClassName={wrapClassName}
          onCancel={onCancel}
          onOk={this.handleSubmit}
          afterClose={this.afterCloseFn}
        >
          <WrappedComponent
            {...WrappedComponentProps}
            wrappedComponentRef={inst => {
              this.formRef = inst;
            }}
          />
        </Modal>
      );
    }
  };
