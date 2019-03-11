
/** 
 * 类型注解
 * TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。
*/
// function greeter(person: string) {
//     return "Hello, " + person;
// }

// let user = [0, 1, 2];//error TS2345: Argument of type 'number[]' is not assignable to parameter of type 'string'.

// document.body.innerHTML = greeter(user);

/** 
 * 接口
 * 在TypeScript里，只要两个类型内部的结构兼容那么这两个类型就是兼容的。 这就允许我们在实现接口时候只要保证包含了接口要求的结构就可以，而不必明确地使用implements语句。
*/
interface Person {
    firstName: string;
    lastName: string;
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}

let user = { firstName: "Jane", lastName: "User" };

document.body.innerHTML = greeter(user);