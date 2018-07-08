const { apiRequest } = wp;
const { dispatch, registerStore } = wp.data;

const DEFAULT_STATE = {
  categories: null,
  primaryCategories: null,
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
      case 'PUSH_PRIMARY_CATEGORY':
        return {
          ...state,
          primaryCategories: [
            ...state.primaryCategories,
            action.primaryCategory,
          ],
        };
      case 'SET_PRIMARY_CATEGORIES':
        return {
          ...state,
          primaryCategories: action.primaryCategories,
        };
      default:
        return state;
    }
  },
  selectors: {
    getCategories(state) {
      return state.categories;
    },
    getPrimaryCategories(state) {
      return state.primaryCategories;
    },
    getPrimaryCategoryNames(state) {
      return !state.primaryCategories ? state.primaryCategories
        : state.primaryCategories.reduce((accumulator, primaryCategory) => (
          [...accumulator, primaryCategory.name]
        ), []);
    },
  },
  actions: {
    pushPrimaryCategory(primaryCategory) {
      return {
        primaryCategory,
        type: 'PUSH_PRIMARY_CATEGORY',
      };
    },
    setCategories(categories) {
      return {
        categories,
        type: 'SET_CATEGORIES',
      };
    },
    setPrimaryCategories(primaryCategories) {
      return {
        primaryCategories,
        type: 'SET_PRIMARY_CATEGORIES',
      };
    },
  },
  resolvers: {
    async getCategories() {
      const categories = await apiRequest({ path: '/wp/v2/categories?per_page=100' });
      dispatch('v8ch/primary-category').setCategories(categories);
    },
    async getPrimaryCategories() {
      const primaryCategories = await apiRequest({ path: '/wp/v2/primary_category?per_page=100' });
      dispatch('v8ch/primary-category').setPrimaryCategories(primaryCategories);
    },
  },
});
