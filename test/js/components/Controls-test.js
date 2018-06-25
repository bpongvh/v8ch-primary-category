import { shallow } from 'enzyme';
import Controls from '../../../src/components/Controls';

describe( 'Controls', () => {
	test( 'should render', () => {
		const rendered = shallow(
			<Controls />
		);
		expect( rendered ).toMatchSnapshot();
	} );
} );
