export default {
  namespace: 'systemMenus',
  state: {
    visible: false,
  },

  effects: {
    *query({ payload }, { call, put }) {
      debugger;
    },
  },

  reducers: {
    trigger(state, action) {
      return {
        error: action.payload,
      };
    },
  },
};
