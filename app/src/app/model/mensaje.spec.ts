import { Mensaje } from './mensaje';

describe('Mensaje', () => {

	it('Debe rear una instacia', () => {
		expect(new Mensaje()).toBeTruthy();
	});

});
