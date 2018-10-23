// import { routerRedux } from 'dva/router';
import executeS from '@/services/executeS';

export default {
  namespace: 'systemRoles',
  state: {
    modalVisible: false,
  },
  effects: {
    *query(_, { call, put }) {
      const response = yield call(executeS, { api: 'queryRolesList' });
      if (response.status === 'ok') {
        yield put({
          type: 'querySuccess',
          payload: {
            records: response.data,
          },
        });
      }
    },
  },
  reducers: {},
};
