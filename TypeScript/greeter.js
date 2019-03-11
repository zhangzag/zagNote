/**
 * 类型注解
 * TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。
*/
// function greeter(person: string) {
//     return "Hello, " + person;
// }
function greeter(person) {
    return "Hello, " + person.firstName + " " + person.lastName;
}
var user = { firstName: "Jane", lastName: "User" };
document.body.innerHTML = greeter(user);
