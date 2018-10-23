import executeS from '@/services/executeS';

export default {
  namespace: 'systemUsers',
  state: {
    modalVisible: false,
    addRolesVisible: false,
  },
  effects: {
    *query(_, { call, put }) {
      const response = yield call(executeS, { api: 'queryUsersList' });
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
