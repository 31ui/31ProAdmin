// import { routerRedux } from 'dva/router';
import executeS from '@/services/executeS';

export default {
  namespace: 'systemRoles',
  state: {
    modalVisible: false,
    records:[]
  },
  effects: {
    *query(_, { call, put }) {
      const response = yield call(executeS, { apixkey: 'queryRolesList' });
      if (response.code === 200 ) {
        yield put({
          type: 'querySuccess',
          payload:  response.data
        });
      }
    },
  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    querySuccess (state, { payload }) {
      const { records, page_no, page_size, total_count } = payload;
      const data={
        records,
        pagination: {
          ...state.pagination,
          current: Number(page_no) || 1,
          pageSize: Number(page_size) || 10,
          total: Number(total_count) || 0,
        },
      }
      return {
        ...state,
        ...data,
      };
    },

  },
};
