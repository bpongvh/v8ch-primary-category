import { shallow } from 'enzyme';
import InPrimaryCategoryControls from '../../../src/components/InPrimaryCategoryControls';

describe( 'Controls', () => {
	test( 'should render', () => {
		const rendered = shallow(
			<InPrimaryCategoryControls />
		);
		expect( rendered ).toMatchSnapshot();
	} );
} );
