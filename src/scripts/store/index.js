const { apiRequest } = wp;
const { dispatch, registerStore } = wp.data;

const DEFAULT_STATE = {
  categories: null,
  postsInPrimaryCategory: null,
};

registerStore('v8ch/primary-category', {
  reducer(state = DEFAULT_STATE, action) {
    switch (action.type) {
      case 'SET_CATEGORIES':
        return {
          ...state,
          categories: action.categories,
        };
      default:
        return state;
    }
  },
  selectors: {
    getCategories(state) {
      return state.categories;
    },
  },
  actions: {
    setCategories(categories) {
      return {
        categories,
        type: 'SET_CATEGORIES',
      };
    },
  },
  resolvers: {
    async getCategories() {
      const categories = await apiRequest({ path: '/wp/v2/categories?per_page=100' });
      dispatch('v8ch/primary-category').setCategories(categories);
    },
  },
});
