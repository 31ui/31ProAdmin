import React, { Component } from 'react';
import ModalLayout from '@/components/HocModal';

import FromBasic from './fromBasic';

@ModalLayout
class fromBasicModal extends Component {
  render() {
    return <FromBasic {...this.props} />;
  }
}

export default fromBasicModal;
