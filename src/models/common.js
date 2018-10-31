
export default {
  namespace: 'common',
  state: {
    records: [],
    pagination: {
      showSizeChanger: true,
      showQuickJumper: true,
      showTotal: total => `共 ${total} 条 `,
      current: 1,
      total: 0,
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
          pageSize: Number(page_size) || 1,
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
