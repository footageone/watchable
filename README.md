# Watchable

## Usage

```typescript
import { Watchable, WatchableProperty } from '@footage.one/watchable';

// Class with a watchable property
class ClassWithState {
    @Watchable()
    public property: WatchableProperty<string>;
}

const instance = new ClassWithState();

// Watching on changes
instance.property.watch().subscribe({
    next: (value) => console.log(value)
});

// Setting value
instance.property.value = 'somestring value';

// Getting value
console.log(instance.property.value);
```
