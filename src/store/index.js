import { apiRequest } from '@wordpress/api-request';
import { dispatch, registerStore } from '@wordpress/data';

const DEFAULT_STATE = { categories: null };

registerStore( 'primary-category', {
	reducer( state = DEFAULT_STATE, action ) {
		switch ( action.type ) {
			case 'SET_CATEGORIES':
				return {
					...state,
					categories: action.categories,
				};
		}

		return state;
	},
	selectors: {
		getCategories( state ) {
			return state.categories;
		},
	},
	actions: {
		setCategories( categories ) {
			return {
				categories,
				type: 'SET_CATEGORIES',
			};
		},
	},
	resolvers: {
		async fetchCategories() {
			const categories = await apiRequest( { path: '/wp/v2/categories?per_page=100' } );
			dispatch( 'v8ch/primary-category' ).setCategories( categories );
		},
	},
} );
