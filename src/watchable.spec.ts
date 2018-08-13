import { Observable } from 'rxjs';
import { Watchable, WatchableProperty } from './watchable';

class Test {
    @Watchable()
    property: WatchableProperty<string>;
}

class Test2 {
    @Watchable({
        initialValue: 'initial'
    })
    property: WatchableProperty<string>;
}

describe('Watchable Decorator', () => {
    let testClass: Test;
    beforeEach(() => {
        testClass = new Test();
    });

    it('should allow access to value', () => {
        testClass.property.value = 'teststring';
        expect(testClass.property.value).toBe('teststring');
    });

    it('should set value with setter', () => {
        const spy = spyOnProperty(testClass.property, 'value', 'set').and.callThrough();
        testClass.property.value = 'teststring';
        expect(spy).toHaveBeenCalled();
    });

    it('should return value with getter', () => {
        spyOnProperty(testClass.property, 'value', 'get').and.returnValue('bySpy');
        expect(testClass.property.value).toEqual('bySpy');
    });

    it('should return initial value with getter', () => {
        const test = new Test2();
        expect(test.property.value).toEqual('initial');
    });

    it('should have a function watch()', () => {
        expect(testClass.property.watch).toEqual(jasmine.any(Function));
    });

    it('watch should return an observable', () => {
        expect(testClass.property.watch()).toEqual(jasmine.any(Observable));
    });

    it('should observe value', (done) => {
        testClass.property.watch().subscribe({
            next: (value) => {
                expect(value).toBe('teststring');
                done();
            }
        });
        testClass.property.value = 'teststring';
    });

    it('should return value set before', (done) => {
        testClass.property.value = 'teststring';
        testClass.property.watch().subscribe({
            next: (value) => {
                expect(value).toBe('teststring');
                done();
            }
        });
    });

    it('should return initial value', (done) => {
        const test = new Test2();
        test.property.watch().subscribe({
            next: (value) => {
                expect(value).toBe('initial');
                done();
            }
        });
    });
});
