import { shallow } from 'enzyme';
import Placeholder from '../../../src/components/Placeholder';

const categories = { data: [ { id: 2, name: 'Test Category' } ] };

describe( 'Placeholder', () => {
	test( 'should render', () => {
		const rendered = shallow(
			<Placeholder
				categories={ categories }
				primaryCategoryId="2"
			/>
		);
		expect( rendered ).toMatchSnapshot();
	} );
} );
