---
title: typeScript记录
description: typeScript记录
author: PandaJS
date: 2025/12/20 18:46
isTop: false
categories:
  - 工具四海谈
tags:
  - TypeScript
---

# typeScript记录

typescript类型分三块

- any 类型 没有任何限制 unknown 类型 类型安全的any
- never 类型 空类型（不存在任何值）
- void 类型 无返回值的函数
- string 字符串
- number 数字
- boolean 布尔值
- undefined 
- null
- symbol 唯一值
- bigint 大整数
- object 类型 包含对象 数组 函数

## 联合类型

联合类型（union types）指的是多个类型组成的一个新类型，使用符号|表示。

联合类型A|B表示，任何一个类型只要属于A或B，就属于联合类型A|B。

```typescript
let a: string | number;
a = "hello";
a = 123;


let b: string | number | boolean = 12;
a = 'string'
a = true
```

## 交叉类型

交叉类型（intersection types）指的多个类型组成的一个新类型，使用符号&表示。

交叉类型A&B表示，任何一个类型必须同时属于A和B，才属于交叉类型A&B，即交叉类型同时满足A和B的特征。

```typescript
let a: { name: string, age: number } & { gender: string };
a = { name: 'Panda', age: 18, gender: 'male' };
```

## 类型别名
type命令用来定义一个类型的别名。

```typescript
type Person = {
  name: string;
  age: number;
};

let p: Person = {
  name: 'Panda',
  age: 18
};
```

## 数组类型

```typescript
const arr: string[] = ['s', 's']
const arr1: Array<string> = ['s', 's']

const arr2: number[] = [1,2,3]
const arr3: Array<number> = [1,2,3]

const arr4: (string | number)[] = ['s', 1]
const arr5: Array<string|number> = ['s', 1]

const arr6: readonly number[] = [1,2,3]

const arr7: number[][] = [[1,2]]

```



