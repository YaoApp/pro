### System modules

xgen运行环境提供如下预先注入的包，这些包在打包的时候可使用rollup的external排除掉，以减小产物体积。

```tsx
import { Form, Input } from 'antd'
import { deepEqual } from 'fast-equals'
import * as Mobx from 'mobx'
import * as MobxReactLite from 'mobx-react-lite'
import React from 'react'
import ReactDom from 'react-dom'
import ReactDomClient from 'react-dom/client'
import JsxRuntime from 'react/jsx-runtime'
import * as Tsyringe from 'tsyringe'

System.set('app:antd', { Input, Form })
System.set('app:fast-equals', { deepEqual })
System.set('app:tsyringe', { ...Tsyringe })
System.set('app:mobx', { ...Mobx })
System.set('app:mobx-react-lite', { ...MobxReactLite })
System.set('app:react', { default: React, __useDefault: true })
System.set('app:react/jsx-runtime', { ...JsxRuntime })
System.set('app:react-dom', { default: ReactDom, __useDefault: true })
System.set('app:react-dom/client', { default: ReactDomClient, __useDefault: true })
```