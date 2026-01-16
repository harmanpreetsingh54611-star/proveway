// 1. What is Type Annotation?
// It means manually telling TypeScript what type a variable will hold.
// let username: string = "Harman";
// let age: number = 24;
// let isActive: boolean = true;

//function define
function sum(a:number,b:number):number{
    return (a +b);
}
//function call
let a:number=sum(5,0);
console.log(a)

let longText :string="this is meoahdiks ajsks";
let shortText:string=longText.substring(0,10);
console.log(shortText)

let first="Harmanpreet singh"
let second="Harmanpreet singh";
console.log(first===second)
 //🔶 Bigint Type:
//Next, we explore the Bigint type, which is specifically designed to handle large integer values that exceed the maximum value of the regular number type. We discuss the purpose of Bigint and present practical examples where it is more appropriate and beneficial than using regular number types.
//Creating a BigInt
// 1. With the n suffix:
//const big = 9007199254740991n; // 👈 this is a BigInt
//2. Using the BigInt() function:
//const big = BigInt("9007199254740991234567890");

let firstBigint:bigint=BigInt(Number.MAX_SAFE_INTEGER)
let secondBigint:bigint=BigInt(Number.MAX_SAFE_INTEGER)+9038n
console.log(firstBigint+secondBigint,firstBigint*secondBigint,firstBigint*secondBigint,secondBigint/firstBigint);

function divide(n:number):boolean {
    return (n%4==0&&n%8==0)?true:false
}

console.log(divide(80))

// | What is `any` in TypeScript?     | A type that disables all type checking.               
//          |
// | What is `unknown` in TypeScript? | A safer alternative that requires checks.                      |
// | Which one should you prefer?     | `unknown`, unless you're doing a quick prototype or migration. |
// | Can you use `unknown` directly?  | ❌ No, you must check its type first.                           |
let thirdName:any=293;
thirdName="abcd"//it will work same as any javascript variable in unknown data we will not able to use directly we first need to check datatype before we perform any operation You cannot use an unknown value directly.
// You must check its type first, using a type guard like typeof, instanceof, etc.
let firstName:unknown="Harman"
if(typeof firstName==="string")
    console.log(firstName.toUpperCase())

//Type inference allows the TypeScript compiler to automatically determine the type of a variable based on its value and usage within the code
 let message="Hello typescript";

 function are(length:number,width:number) {
    return length*width;
 }

 console.log(are(2,4));

 function maxNum(arr:number[]){
    let max=arr.reduce((acc,curr)=>{
return acc>curr?acc:curr;
    },arr[0])
    return max;
 }
 console.log(maxNum([2,43,3]));
 
 function avgNum(arr:number[]){
    let max=arr.reduce((acc,curr)=>{
return acc+curr;
    },0)
    return max/arr.length;
 }
 console.log(avgNum([2,43,3]));

 function palidrome(num:string):boolean {
   let reversenum= num.split("").reverse().join("")
   return  reversenum===num?true:false;
 }
 console.log(palidrome("12321"))

//1. Optional Parameters (?)
//An optional parameter means the argument may or may not be passed when the function is called
//Key Rule:
//Use ? after the parameter name.
//It becomes undefined if not provided.
 function greet(name:string,place:string="delhi",id?:number,){
    console.log("hello ",name,"place ",place,id)
 }
 greet("harman");

 //22. Default Parameters (= value)
// A default parameter has a default value assigned if no argument is passed.
// iterview-Level Tip:
// You can combine optional and default parameters, but default must come after required parameters.


// What is an Array in TypeScript?
// An array is a collection of items of the same type.
// 1. Declaring Arrays
// ✅ Method 1: type[]

// let names: string[] = ["Harman", "Raj", "Aman"];
let scores: number[] = [90, 85, 78];

//  Method 2: Array<type>
let names: Array<string> = ["Harman", "Raj"];
let flags: Array<boolean> = [true, false];

// 🔹 3. Array of Objects
type User = { id: number; name: string };

let users: User[] = [
  { id: 1, name: "Harman" },
  { id: 2, name: "Raj" }
];

//🔹 2. Array of Multiple Types (Union)
let values: (string | number)[] = ["Harman", 99, "Raj", 100];
//  5. Readonly Array
// Prevent mutation of the array:
const ids: readonly number[] = [101, 102, 103];

// ids.push(104); ❌ Error: Cannot modify readonly array

// ✅ Array is a built-in global object in JavaScript/TypeScript, and must be capitalized.


let num = new Array(1, 2, 3);
console.log(num); // [1, 2, 3]

// Prefer typed arrays to catch mistakes early

//  Adding Elements to an Array
// 1. push() – Add to the end
let fruits: string[] = ["apple", "banana"];
fruits.push("mango"); 
console.log(fruits)
// ["apple", "banana", "mango"]

// 2. unshift() – Add to the beginning

fruits.unshift("grapes"); 
console.log(fruits)
// ["grapes", "apple", "banana", "mango"]

// 3. Using splice() – Add at specific index
fruits.splice(2, 2, "kiwi"); //startindex,number of index to deleted fromthat index ,item that should insert from 2 index
console.log(fruits)
// Inserts "kiwi" at index 2
// ["grapes", "apple", "kiwi", "banana", "mango"]

//  Removing Elements from an Array
// 1. pop() – Remove from end
// fruits.pop(); 
// removes "mango"
// 2. shift() – Remove from start
//  fruits.shift(); 
// removes "grapes"

// 3. splice() – Remove from specific index
// fruits.splice(1, 1); 
// removes 1 element at index 1 → removes "kiwi"


//iterationfor ,for of ,forEach

for(const fruit of fruits){
    console.log(fruit)
}
fruits.forEach((fruit)=>{
console.log(fruit)
})

let persons:{name:string;age:number;company:string;place:{country:string;city:string}}={
    name:"harmanpreet singh",
    age:27,
    company:"tcs",
    place:{
        country:"india",
        city:"delhi"
    }
}
persons.place.country="canada"
console.log(persons)
//An object in TypeScript is a collection of key-value pairs, where each key has a type and each value has a type. if we dont define type then typescript infrence will automatically assign datatype
let person: { name: string; age: number } = {
  name: "Harman",
  age: 25
};

//  2. Optional Properties
// Use ? to make a property optional:

let user: { name: string; email?: string } = {
  name: "Harman"
};

//| Symbol | Used for            | Example           |
// | ------ | ------------------- | ----------------- |
// | `:`    | Declares a **type** | `name: string`    |
// | `=`    | Assigns a **value** | `name = "Harman"` |
// 🔹 Use : when defining structure (type)
// let person: { name: string; age: number };
//Here, you are saying:

// person is an object.

// person must have a name (string) and age (number).

// You are not assigning any values yet

// 🔹 Use = when giving actual value
// let person = {
//   name: "Harman",
//   age: 25
// };
type Creating=number;
type Person={//first letter should be capital best practice
    name :string;
    id:number;
    claass?:string

}
let manu:Person={
    name:"harmanpreet singh",
    id:289
    
}

// Type Aliases
// Type Aliases allow defining types with a custom name (an Alias).

// Type Aliases can be used for primitives like string or more complex types such as objects and arrays:
// type CarYear = number
// type CarType = string
// type CarModel = string
// type Car = {
//   year: CarYear,
//   type: CarType,
//   model: CarModel
// }

// const carYear: CarYear = 2001
// const carType: CarType = "Toyota"
// const carModel: CarModel = "Corolla"
// const car: Car = {
//   year: carYear,
//   type: carType,
//   model: carModel
// };


// Interfaces
// Interfaces are similar to type aliases, except they only apply to object types.

// interface Rectangle {
//   height: number,
//   width: number
// }

// const rectangle: Rectangle = {
//   height: 20,
//   width: 10
// };


type Product={
    name:string;
    price:number;
    quantity:number
}
let laptop:Product={
    name: "Hp",
    price: 0,
    quantity: 0
}
console.log(laptop)
function totalPrice(obj:Product):number{
    return obj.price*obj.quantity;
}
laptop.price=10;
laptop.quantity=10;
console.log(totalPrice(laptop))

/**A call signature describes:

What a function takes (parameters) and what it returns (return type). without implementing it 

It’s like a type for a function.

Here:

(name: string) => string is the call signature

It means: function takes a string, returns a string

sayHello must follow this shape*/
type Greet = (name: string) => string;

const sayHello: Greet = (name) => {
  return "Hello " + name;
};

// 🔹 What is an Enum?
// An enum is a way to give names to a set of numeric or string values.

// Enums make your code more readable and less error-prone, especially when you have a list of related values.
enum Direction {
  North,   // 0
  East,    // 1
  South,   // 2
  West     // 3
}

let dir: Direction = Direction.East;
console.log(dir);  // Output: 1
// By default, numbering starts from 0 and increases by 1.

// You can also manually assign values.

// enum Direction {
//   North = 1,
//   East = 2,
//   South = 3,
//   West = 4
// }

// enum Color {
//   Red = "RED",
//   Green = "GREEN",
//   Blue = "BLUE"
// }

// let c: Color = Color.Green;
// console.log(c);  // Output: "GREEN"


/**
 * 🟣 What is a Tuple?
A Tuple is a fixed-length array where each position has a specific type.

🔸 Think of a tuple as an array with fixed size and fixed types at each index.

🔹 Example of a Normal Array (for comparison):
let fruits: string[] = ["apple", "banana", "mango"];
You can add any number of strings.

All elements are of the same type (string).
🔹 Example of a Tuple:
let person: [string, number] = ["John", 25];
| Index | Type   | Value  |
| ----- | ------ | ------ |
| 0     | string | "John" |
| 1     | number | 25     |
| Feature | Array      | Tuple                   |
| ------- | ---------- | ----------------------- |
| Length  | Can change | Fixed                   |
| Types   | Same type  | Different types allowed |
| Example | `string[]` | `[string, number]`      |

 Interview Questions on Tuples (with Answers)
1. What is a Tuple in TypeScript?
Answer:
A tuple is a fixed-length array where each element can have a different type.
Example:

ts
Copy
Edit
let user: [string, number] = ["Alice", 25];
2. How is a Tuple different from an Array?
Answer:

Feature	Array	Tuple
Length	Not fixed	Fixed
Types	All elements same type	Elements can have different types
Example	string[]	[string, number]

3. Can you make a Tuple with optional elements?
Answer:
Yes. You can use ? to make elements optional.

ts
Copy
Edit
let user: [string, number?] = ["John"];
4. What will happen if you change the order of tuple types?
Answer:
You’ll get a type error.

ts
Copy
Edit
let user: [string, number] = [25, "John"]; // ❌ Error
5. Can Tuples have rest elements?
Answer:
Yes. Use the ... (spread operator).

ts
Copy
Edit
let scores: [string, ...number[]] = ["Rahul", 90, 85];
🔸 Practice Questions
🧪 Q1. Declare a tuple that stores a city name and its population.
✅ Expected Answer:

ts
Copy
Edit
let city: [string, number] = ["Delhi", 32000000];
🧪 Q2. Create a tuple with a product name (string), price (number), and availability (boolean).
✅ Expected Answer:

ts
Copy
Edit
let product: [string, number, boolean] = ["Laptop", 49999, true];
🧪 Q3. Create a function that returns a tuple with a user name and user id.
✅ Expected Answer:

ts
Copy
Edit
function getUser(): [string, number] {
  return ["Harman", 101];
}

let [name, id] = getUser();
console.log(name, id); // "Harman", 101
🧪 Q4. Is this valid? If not, why?
ts
Copy
Edit
let data: [string, number] = ["Age", "30"];
❌ Answer:
Not valid. The second value should be a number, not a string.


🟣 1. What is a Union Type?
A union type allows a variable to be one of multiple types.

🔹 Syntax:
ts
Copy
Edit
let value: string | number;
This means value can be a string OR number.

✅ Example:
ts
Copy
Edit
let id: string | number;

id = "ABC123"; // ✅ valid
id = 12345;    // ✅ valid
id = true;     // ❌ Error: boolean is not allowed
✅ Union in Function Parameters:
ts
Copy
Edit
function printId(id: string | number) {
  console.log("ID:", id);
}
🧠 Interview Tip:
Union is like OR (either one or another).

Useful when API can return multiple types (e.g., string or null).

🟢 2. What is an Intersection Type?
An intersection type combines multiple types into one.

🔹 Syntax:
ts
Copy
Edit
type A = { name: string };
type B = { age: number };

type Person = A & B;
Now Person must have both name and age.

✅ Example:
ts
Copy
Edit
const user: Person = {
  name: "Harman",
  age: 25,
};
🧠 Interview Tip:
Intersection is like AND (must have all properties from all types).

Used to combine features or models.

🔁 Union vs Intersection Table
| Feature | Union (|) | Intersection (&) |
|----------------|-------------------------------|-------------------------------------|
| Meaning | Either type A or type B | Must satisfy both type A and B |
| Use Case | Flexible input/output types | Merge multiple types |
| Example | string | number | { name: string } & { age: number } |

🧪 Practice Questions
Q1. Declare a variable that can hold a string or number.
ts
Copy
Edit
let input: string | number;
Q2. Create a type Person that has both name: string and age: number.
ts
Copy
Edit
type Person = { name: string } & { age: number };
Q3. Is this code valid?
ts
Copy
Edit
type A = { a: string };
type B = { b: number };

let val: A | B = { a: "test" }; // ✅ Yes
let val2: A & B = { a: "test" }; // ❌ Error: missing `b`

 */