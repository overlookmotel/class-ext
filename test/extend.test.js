/* --------------------
 * class-extension module
 * Tests for `extend` method
 * ------------------*/

'use strict';

// Modules
const {extend, Extension} = require('../index');

// Tests

describe('`.extend()`', () => {
	it('returns subclass', () => {
		class Class {}
		Class.extend = extend;

		const extension = new Extension(InClass => class extends InClass {});
		const SubClass = Class.extend(extension);

		expect(Object.getPrototypeOf(SubClass)).toBe(Class);

		const instance = new SubClass();
		expect(instance).toBeInstanceOf(SubClass);
		expect(instance).toBeInstanceOf(Class);
	});

	it('can be called on subclass', () => {
		class Class {}
		Class.extend = extend;

		const extension1 = new Extension(InClass => class extends InClass {});
		const extension2 = new Extension(InClass => class extends InClass {});
		const SubClass = Class.extend(extension1);
		const SubSubClass = SubClass.extend(extension2);

		expect(Object.getPrototypeOf(SubSubClass)).toBe(SubClass);

		const instance = new SubSubClass();
		expect(instance).toBeInstanceOf(SubSubClass);
		expect(instance).toBeInstanceOf(SubClass);
		expect(instance).toBeInstanceOf(Class);
	});
});
