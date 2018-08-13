import { ReplaySubject, Observable } from 'rxjs';

export interface WatchableProperty<T> {
    watch(): Observable<T>;
    value: T;
}

export interface WatchableOptions<T> {
    initialValue?: T;
}

export function Watchable<T>(options?: WatchableOptions<T>): PropertyDecorator {
    return (target: Object, propertyKey: string | symbol) => {
        const subject: ReplaySubject<T> = new ReplaySubject(1);
        let internalValue: T;
        if (typeof options !== 'undefined' && typeof options.initialValue !== 'undefined') {
            internalValue = options.initialValue;
            subject.next(internalValue);
        }
        target[propertyKey] = Object.defineProperties({}, {
            value: {
                configurable: true,
                get: () => internalValue,
                set: (value: T) => {
                    subject.next(value);
                    internalValue = value;
                }
            },
            watch: {
                value: () => subject.asObservable()
            }
        });
    }
}
