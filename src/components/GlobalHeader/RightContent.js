import React, { PureComponent } from 'react';
import { FormattedMessage, formatMessage } from 'umi/locale';
import { Spin, Tag, Menu, Icon, Dropdown, Avatar, Tooltip } from 'antd';

import moment from 'moment';
// import Debounce from 'lodash-decorators/debounce';
import isEqual from 'lodash/isEqual';
import memoizeOne from 'memoize-one';
import groupBy from 'lodash/groupBy';

import NoticeIcon from '../NoticeIcon';
import HeaderSearch from '../HeaderSearch';
import SelectLang from '../SelectLang';
import styles from './index.less';
import BaseMenu from '../SiderMenu/BaseMenu';

/**
 * 如果菜单一级没有设置重定向
 * 默认取子集路由的children下第一个子节点
 */

const getFirstChildrenItemPath = arr => {
  const firstItem = arr && arr.length > 0 ? arr[0] : { path: '/404' };
  return arr[0].children ? getFirstChildrenItemPath(arr[0].children) : firstItem.path;
};
export default class GlobalHeaderRight extends PureComponent {
  constructor(props) {
    super(props);
    this.memoizeOneGetFirstLevelMenuData = memoizeOne(this.getFirstLevelMenuData, isEqual);
    this.state = {
      LmaxWidth: window.innerWidth - 256 - 306 - 68 - 15,
    };
  }

  componentDidMount() {
    const { layout, isMobile } = this.props;
    if (String(layout) === 'allmenu' && !isMobile) {
      window.addEventListener('resize', this.resize);
      this.resize();
    }
  }

  componentDidUpdate(prevProps) {
    const { layout } = this.props;
    if (prevProps.layout === 'sidemenu' && prevProps.layout !== layout) {
      window.addEventListener('resize', this.resize);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  /**
   * data => 数组
   * 获取一级菜单数据
   */
  getFirstLevelMenuData = data =>
    data.map(item => {
      const { children, ...otherProps } = item;
      let redirectPath = '';
      if (item.redirect) {
        redirectPath = item.redirect;
      } else {
        redirectPath = getFirstChildrenItemPath(children);
      }
      const currentMenuData = {
        ...otherProps,
        redirect: redirectPath,
      };
      return currentMenuData;
    });

  getNoticeData() {
    const { notices = [] } = this.props;
    if (notices.length === 0) {
      return {};
    }
    const newNotices = notices.map(notice => {
      const newNotice = { ...notice };
      if (newNotice.datetime) {
        newNotice.datetime = moment(notice.datetime).fromNow();
      }
      if (newNotice.id) {
        newNotice.key = newNotice.id;
      }
      if (newNotice.extra && newNotice.status) {
        const color = {
          todo: '',
          processing: 'blue',
          urgent: 'red',
          doing: 'gold',
        }[newNotice.status];
        newNotice.extra = (
          <Tag color={color} style={{ marginRight: 0 }}>
            {newNotice.extra}
          </Tag>
        );
      }
      return newNotice;
    });
    return groupBy(newNotices, 'type');
  }

  
  resize = () => {
    const objTarget = this.leftnode;
    if (!objTarget || objTarget === null) {
      return;
    }
    requestAnimationFrame(() => {
      const { offsetWidth } = objTarget;
      if (offsetWidth !== 0) {
        this.setState({
          LmaxWidth: offsetWidth - 80,
        });
      }
    });
  };

  render() {
    const {
      currentUser,
      fetchingNotices,
      onNoticeVisibleChange,
      onMenuClick,
      onNoticeClear,
      theme,
      menuData,
      isMobile,
      setting,
    } = this.props;
    const { LmaxWidth } = this.state;
    const { layout } = setting;
    const isAllMenu = layout === 'allmenu';
    const menu = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
        <Menu.Item key="userCenter">
          <Icon type="user" />
          <FormattedMessage id="menu.account.center" defaultMessage="account center" />
        </Menu.Item>
        <Menu.Item key="userinfo">
          <Icon type="setting" />
          <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
        </Menu.Item>
        <Menu.Item key="triggerError">
          <Icon type="close-circle" />
          <FormattedMessage id="menu.account.trigger" defaultMessage="Trigger Error" />
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    const noticeData = this.getNoticeData();
    let className = styles.right;

    if (theme === 'dark') {
      className = `${styles.right}  ${styles.dark}`;
    }
    // 获取一级的菜单数据
    const FirestLevelMenuData = this.memoizeOneGetFirstLevelMenuData(menuData);
    // 重组菜单组件属性
    const baseMenuProps = {
      ...this.props,
      mode: 'horizontal',
      firstLevel: true,
      menuData: FirestLevelMenuData,
    };

    const leftMenuLayout = (
      <div
        className="topMenuLeft"
        ref={n => {
          this.leftnode = n;
        }}
      >
        <div style={{ maxWidth: LmaxWidth }}>
          <BaseMenu {...baseMenuProps} style={{ border: 'none', height: 64 }} />
        </div>
      </div>
    );
    return (
      <div className={className}>
        {isAllMenu && !isMobile ? leftMenuLayout : null}
        <div className="topMenuRight">
          <HeaderSearch
            className={`${styles.action} ${styles.search}`}
            placeholder={formatMessage({ id: 'component.globalHeader.search' })}
            dataSource={[
              formatMessage({ id: 'component.globalHeader.search.example1' }),
              formatMessage({ id: 'component.globalHeader.search.example2' }),
              formatMessage({ id: 'component.globalHeader.search.example3' }),
            ]}
            onSearch={value => {
              console.log('input', value); // eslint-disable-line
            }}
            onPressEnter={value => {
              console.log('enter', value); // eslint-disable-line
            }}
          />
          <Tooltip title={formatMessage({ id: 'component.globalHeader.help' })}>
            <a
              target="_blank"
              href="https://pro.ant.design/docs/getting-started"
              rel="noopener noreferrer"
              className={styles.action}
            >
              <Icon type="question-circle-o" />
            </a>
          </Tooltip>
          <NoticeIcon
            className={styles.action}
            count={currentUser.notifyCount}
            onItemClick={(item, tabProps) => {
              console.log(item, tabProps); // eslint-disable-line
            }}
            locale={{
              emptyText: formatMessage({ id: 'component.noticeIcon.empty' }),
              clear: formatMessage({ id: 'component.noticeIcon.clear' }),
            }}
            onClear={onNoticeClear}
            onPopupVisibleChange={onNoticeVisibleChange}
            loading={fetchingNotices}
            popupAlign={{ offset: [20, -16] }}
          >
            <NoticeIcon.Tab
              list={noticeData.notification}
              title={formatMessage({ id: 'component.globalHeader.notification' })}
              name="notification"
              emptyText={formatMessage({ id: 'component.globalHeader.notification.empty' })}
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/wAhyIChODzsoKIOBHcBk.svg"
            />
            <NoticeIcon.Tab
              list={noticeData.message}
              title={formatMessage({ id: 'component.globalHeader.message' })}
              name="message"
              emptyText={formatMessage({ id: 'component.globalHeader.message.empty' })}
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/sAuJeJzSKbUmHfBQRzmZ.svg"
            />
            <NoticeIcon.Tab
              list={noticeData.event}
              title={formatMessage({ id: 'component.globalHeader.event' })}
              name="event"
              emptyText={formatMessage({ id: 'component.globalHeader.event.empty' })}
              emptyImage="https://gw.alipayobjects.com/zos/rmsportal/HsIsxMZiWKrNUavQUXqx.svg"
            />
          </NoticeIcon>
          {currentUser.name ? (
            <Dropdown overlay={menu}>
              <span className={`${styles.action} ${styles.account}`}>
                <Avatar
                  size="small"
                  className={styles.avatar}
                  src={currentUser.avatar}
                  alt="avatar"
                />
                <span className={styles.name}>{currentUser.name}</span>
              </span>
            </Dropdown>
          ) : (
            <Spin size="small" style={{ marginLeft: 8, marginRight: 8 }} />
          )}
          <SelectLang className={styles.action} />
        </div>
      </div>
    );
  }
}
