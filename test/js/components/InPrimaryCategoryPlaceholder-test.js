import { shallow } from 'enzyme';
import InPrimaryCategoryPlaceholder from '../../../src/components/InPrimaryCategoryPlaceholder';

const categories = { data: [ { id: 2, name: 'Test Category' } ] };

describe( 'Placeholder', () => {
	test( 'should render', () => {
		const rendered = shallow(
			<InPrimaryCategoryPlaceholder
				categories={ categories }
				primaryCategoryId="2"
			/>
		);
		expect( rendered ).toMatchSnapshot();
	} );
} );
