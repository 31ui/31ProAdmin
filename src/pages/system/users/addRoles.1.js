import React, { Component } from 'react';
import { Item } from 'ant-design';
import PureRenderMixin from 'react-addons-pure-render-mixin';

class NameItem extends Component {
  construtor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <Item>
        <span>arctur</span>
      </Item>
    );
  }
}

// class MyInput extends Component {
//     constructor(props){
//         super(props);
//         this.handleChange=this.handleChange.bind(this);
//     }

//     handleChange(){
//         this.props.unpdate(e.target.value)
//     }

//     render(){
//         return(
//           <input type="text" onChange={this.handleChange} />
//         )
//     }
// }

// export default MyInput
// class Item extends Component {
//     render(){
//         return(
//           <item>
//             <span>arctur</span>
//           </item>
//         )
//     }
// }

// class aa extends Comment{
//     render(){
//         return  <Item children={React.createElement('<span>',{},'arctur')} />
//     }
// }

export default NameItem;
