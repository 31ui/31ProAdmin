import executeS from '@/services/executeS';
import { totree, getFlatMenuKeys } from '@/utils/utils';

export default {
  namespace: 'menus',
  state: {
    menuData: [],
    flatMenus: [],
    flatMenuData: [],
  },
  subscriptions: {
    setup({ dispatch }) {
      dispatch({ type: 'fetch' });
    },
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(executeS, { apixkey: 'menu' });
      if (String(response.code) === '200') {
        yield put({
          type: 'saveData',
          payload: response.data,
        });
      }
    },
  },
  reducers: {
    saveData(state, { payload }) {
      const menuTree = totree(payload);
      const flatMenus = getFlatMenuKeys(payload);
      return {
        ...state,
        menuData: menuTree,
        flatMenus,
        // flatMenuData:payload
      };
    },
  },
};
