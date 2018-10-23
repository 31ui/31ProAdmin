// 环境部署配置
const APIV1 = '';
// const APIV2 = '/v2';
export default {
  apix: {
    // fakeAccountLogin: { url: `${APIV1}/api/auth/getSaltCode`, method: 'POST'},
    fakeAccountLogin: { url: `${APIV1}/api/login/account`, method: 'POST' },
    // fakeAccountLogin: { url: `${APIV1}/user/login`, method: 'POST'},
    menu: { url: `${APIV1}/api/menu`, method: 'GET' },
    queryUsers: { url: `${APIV1}/api/users`, method: 'GET' },
    queryUserCurrent: { url: `${APIV1}/api/currentUser`, method: 'GET' },
    queryNotices: { url: `${APIV1}/api/notices`, method: 'GET' }, // 通知
    fakeChartData: { url: `${APIV1}/api/fake_chart_data`, method: 'GET' },
    /**
     * 获取系统角色
     */
    queryRolesList: { url: `${APIV1}/api/roles/list`, method: 'GET' },
    queryUsersList: { url: `${APIV1}/api/users/list`, method: 'GET' },
  },
};
