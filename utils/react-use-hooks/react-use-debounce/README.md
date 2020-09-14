# react-use-debounce
---
> 基于 react hooks 的防抖函数

```bash
  npm install --save react-use-debounce
```
```js
import React from 'react';
import useDebouncedCallback from 'react-use-debounce';
const = () => {
  const [debouncedCallback] = useDebouncedCallback(() => console.log('test'), 500);
  return (
    <div>
      <input type="text" onChange={debouncedCallback} />
    </div>
  )
}
```
