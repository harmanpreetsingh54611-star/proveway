/**
 * ============================================================================
 * TypeScript Crash Course - Complete Guide
 * ============================================================================
 * A comprehensive beginner-to-intermediate guide covering all TypeScript concepts
 */

// ============================================================================
// INTRODUCTION: WHAT IS TYPESCRIPT?
// ============================================================================

/**
 * 🔷 What is TypeScript?
 * TypeScript is a SUPERSET of JavaScript that adds STATIC TYPING.
 * 
 * In simple terms:
 * - TypeScript = JavaScript + Types
 * - It's a programming language built on top of JavaScript
 * - Adds type safety before code runs
 * - Compiles to plain JavaScript that browsers/Node.js understand
 * 
 * Think of it like this:
 * JavaScript: "Do whatever you want, I'll figure it out at runtime"
 * TypeScript: "Tell me the types upfront, I'll catch errors before runtime"
 */

/**
 * 🔷 Why Use TypeScript?
 * 
 * 1. **Type Safety**
 *    - Catch errors at compile time, not runtime
 *    - Prevents type mismatches
 *    Example: Calling .toUpperCase() on a number will error immediately
 * 
 * 2. **Better IDE Support**
 *    - Autocomplete suggestions
 *    - IntelliSense for methods and properties
 *    - Faster development
 * 
 * 3. **Self-Documenting Code**
 *    - Types serve as documentation
 *    - Other developers understand what data types to pass
 *    - No need for separate API docs
 * 
 * 4. **Refactoring Confidence**
 *    - Change code without breaking other parts
 *    - Compiler warns about incompatibilities
 *    - Saves debugging time
 * 
 * 5. **Object-Oriented Programming**
 *    - Classes, interfaces, inheritance
 *    - Better for large applications
 *    - Scalable architecture
 * 
 * 6. **Catches Bugs Early**
 *    - Prevents undefined is not a function errors
 *    - Null/undefined checks
 *    - Property access errors
 */

/**
 * 🔷 JavaScript vs TypeScript Comparison
 * 
 * | Feature | JavaScript | TypeScript |
 * |---------|-----------|-----------|
 * | Types | Dynamic (runtime) | Static (compile-time) |
 * | Type Checking | At runtime | Before runtime |
 * | Learning Curve | Easy | Medium |
 * | Tooling Support | Basic | Excellent |
 * | IDE Autocomplete | Limited | Excellent |
 * | Error Detection | Runtime | Compile-time |
 * | Code Safety | Low | High |
 * | Performance | Fast | Fast (after compilation) |
 * | Browser Support | Native | Via compilation |
 * | Refactoring | Risky | Safe |
 */

/**
 * 🔷 JavaScript Code Problem (Without Types)
 * 
 * let user = {
 *   name: "Harman",
 *   age: 25
 * };
 * 
 * // Developer accidentally passes wrong type
 * function printAge(person) {
 *   return person.age.toUpperCase(); // ❌ Runtime Error!
 * }
 * 
 * printAge(user);
 * // Error: person.age.toUpperCase is not a function
 * // This error only shows when code runs!
 */

/**
 * 🔷 Same Code with TypeScript (Type-Safe)
 * 
 * type User = {
 *   name: string;
 *   age: number;
 * };
 * 
 * let user: User = {
 *   name: "Harman",
 *   age: 25
 * };
 * 
 * function printAge(person: User): string {
 *   return person.age.toUpperCase(); // ❌ COMPILE ERROR!
 * }
 * 
 * // TypeScript catches this BEFORE runtime!
 * // Error: Property 'toUpperCase' does not exist on type 'number'
 */

/**
 * 🔷 TypeScript Compilation Process
 * 
 * Step 1: Write TypeScript Code (.ts files)
 *   ↓
 * Step 2: TypeScript Compiler (tsc) checks types
 *   ↓
 * Step 3: If no errors, compile to JavaScript (.js)
 *   ↓
 * Step 4: JavaScript runs in browser/Node.js
 * 
 * Example Command:
 * $ tsc myfile.ts  // Compiles myfile.ts to myfile.js
 */

/**
 * 🔷 Real-World Use Cases
 * 
 * ✅ Large Projects: Big codebases benefit from type safety
 * ✅ Team Development: Types act as contracts between developers
 * ✅ APIs & Libraries: Clear function signatures for users
 * ✅ E-commerce: Handle money/inventory with precision
 * ✅ Finance Apps: Prevent calculation errors
 * ✅ Healthcare Apps: Type safety critical for safety
 * ✅ Enterprise Apps: Scalable, maintainable code
 * 
 * ❌ When NOT to use TypeScript:
 * - Simple scripts
 * - Quick prototypes
 * - Solo hobby projects
 * - Learning JavaScript basics
 */

/**
 * 🔷 TypeScript Setup (Quick Overview)
 * 
 * Installation:
 * $ npm install -g typescript
 * 
 * Create TypeScript file:
 * myfile.ts
 * 
 * Compile:
 * $ tsc myfile.ts
 * 
 * Result: myfile.js (JavaScript) is created
 * 
 * Run JavaScript:
 * $ node myfile.js
 */

/**
 * 🔷 Key Benefits Summary
 * 
 * 🎯 For Individual Developers:
 *    - Catch mistakes before shipping
 *    - Better code quality
 *    - Faster development (good IDE support)
 * 
 * 👥 For Teams:
 *    - Shared understanding of data structures
 *    - Type as documentation
 *    - Easier code review
 *    - Reduced bugs in production
 * 
 * 🏢 For Large Organizations:
 *    - Scalability
 *    - Maintainability
 *    - Knowledge sharing
 *    - Future-proof code
 */

// ============================================================================
// MODULE 1: TYPE ANNOTATIONS & BASIC TYPES
// ============================================================================

/**
 * 🔵 What is Type Annotation?
 * Type annotation means manually telling TypeScript what type a variable will hold.
 * This helps catch errors at compile time before runtime.
 */

// Primitive Type Annotations
let username: string = "Harman";
let age: number = 24;
let isActive: boolean = true;
let nothing: null = null;
let notDefined: undefined = undefined;

/**
 * 📌 Key Points:
 * ✅ Always specify types for variables
 * ✅ Use lowercase for primitives (string, number, boolean)
 * ✅ TypeScript checks types at compile time
 * ❌ JavaScript doesn't have built-in type checking
 */

// ============================================================================
// MODULE 2: FUNCTIONS WITH TYPES
// ============================================================================

/**
 * 🔵 Function Declaration with Type Annotations
 * Pattern: function name(param: type): returnType { }
 */

// Basic function with parameters and return type
function sum(a: number, b: number): number {
  return a + b;
}

let result: number = sum(5, 10);
console.log(result); // 15

// Function with string operations
function extractText(longText: string, length: number): string {
  return longText.substring(0, length);
}

let shortText: string = extractText("This is a longer text", 10);
console.log(shortText); // "This is a "

// Function with no return value (void)
function logMessage(message: string): void {
  console.log(message);
}

// Function that checks divisibility
function isDivisible(n: number, divisor: number): boolean {
  return n % divisor === 0;
}

console.log(isDivisible(80, 4)); // true
console.log(isDivisible(80, 8)); // true

/**
 * 📌 Function Return Types:
 * - number: Returns a number
 * - string: Returns a string
 * - boolean: Returns a boolean
 * - void: Returns nothing (undefined)
 * - any: Can return anything (avoid using this)
 */

// ============================================================================
// MODULE 3: SPECIAL NUMBER TYPES
// ============================================================================

/**
 * 🔵 BigInt Type
 * BigInt is for large integers exceeding Number.MAX_SAFE_INTEGER (2^53 - 1)
 * Use case: Large mathematical calculations, IDs, timestamps
 */

// Creating BigInt - Method 1: Using 'n' suffix
const big1: bigint = 9007199254740991n;

// Creating BigInt - Method 2: Using BigInt() function
const big2: bigint = BigInt("9007199254740991234567890");

// Working with BigInt
let firstBigint: bigint = BigInt(Number.MAX_SAFE_INTEGER);
let secondBigint: bigint = BigInt(Number.MAX_SAFE_INTEGER) + 9038n;

console.log(firstBigint + secondBigint); // Addition
console.log(firstBigint * secondBigint); // Multiplication
console.log(secondBigint / firstBigint); // Division

/**
 * ⚠️ Important BigInt Rules:
 * ✅ Cannot mix BigInt with regular numbers
 * ✅ Use 'n' suffix: 100n is BigInt
 * ❌ Cannot use decimal points: 100.5n is INVALID
 * ❌ Cannot use in Math object functions
 */

// ============================================================================
// MODULE 4: SPECIAL TYPES - ANY vs UNKNOWN
// ============================================================================

/**
 * 🔵 The 'any' Type
 * 'any' disables all type checking - avoid when possible!
 * It's like using JavaScript with TypeScript syntax.
 */

let thirdName: any = 293;
thirdName = "abcd"; // ✅ Works (but NOT type-safe!)
thirdName = true;   // ✅ Works (but NOT type-safe!)

/**
 * 🔵 The 'unknown' Type
 * 'unknown' is type-safe alternative to 'any'
 * You MUST check the type before using it.
 */

let firstName: unknown = "Harman";

// ❌ This won't work - TypeScript prevents direct usage
// console.log(firstName.toUpperCase()); // Error!

// ✅ This works - we check type first
if (typeof firstName === "string") {
  console.log(firstName.toUpperCase()); // "HARMAN"
}

/**
 * 📊 Comparison Table: any vs unknown
 * | Feature | any | unknown |
 * |---------|-----|---------|
 * | Type Checking | Disabled | Enabled |
 * | Can Use Directly | ✅ Yes | ❌ No |
 * | Must Check Type | ❌ No | ✅ Yes |
 * | Safety Level | Low | High |
 * | Best Practice | Avoid | Prefer |
 */

// ============================================================================
// MODULE 5: TYPE INFERENCE
// ============================================================================

/**
 * 🔵 Type Inference
 * TypeScript automatically determines variable types based on values assigned.
 * No type annotation needed if initial value is clear.
 */

let message = "Hello TypeScript"; // Type inferred as string
let count = 42;                   // Type inferred as number
let isValid = true;               // Type inferred as boolean

// Type inference in functions
let maxNum = (arr: number[]): number => {
  return arr.reduce((acc, curr) => (acc > curr ? acc : curr), arr[0]);
};

console.log(maxNum([2, 43, 3])); // 43

let avgNum = (arr: number[]): number => {
  let sum = arr.reduce((acc, curr) => acc + curr, 0);
  return sum / arr.length;
};

console.log(avgNum([2, 43, 3])); // 16

/**
 * 📌 When to Use Type Inference vs Annotation:
 * ✅ Inference: Simple assignments with clear types
 * ✅ Annotation: Function parameters, complex objects, public APIs
 */

// ============================================================================
// MODULE 6: STRING MANIPULATION EXAMPLES
// ============================================================================

/**
 * 🔵 Common String Operations with Type Safety
 */

// Check if string is palindrome
function isPalindrome(str: string): boolean {
  let reversed = str.split("").reverse().join("");
  return reversed === str;
}

console.log(isPalindrome("12321")); // true
console.log(isPalindrome("hello")); // false

// Compare strings for equality
let first: string = "Harmanpreet singh";
let second: string = "Harmanpreet singh";
console.log(first === second); // true

// ============================================================================
// MODULE 7: FUNCTION PARAMETERS - OPTIONAL & DEFAULT
// ============================================================================

/**
 * 🔵 Optional Parameters (?)
 * Optional parameters may or may not be passed when function is called.
 * If not provided, they become undefined.
 */

function greet(
  name: string,
  place: string = "delhi", // Default parameter
  id?: number              // Optional parameter
): void {
  console.log("hello", name, "place", place, "id", id);
}

greet("harman");                        // Uses default place
greet("harman", "mumbai");              // Override default place
greet("harman", "mumbai", 123);         // All parameters provided

/**
 * 📌 Parameter Ordering Rules:
 * ✅ Required parameters first
 * ✅ Default parameters after required
 * ✅ Optional parameters last
 * ❌ Optional before required = Type Error
 */

// ============================================================================
// MODULE 8: ARRAYS IN TYPESCRIPT
// ============================================================================

/**
 * 🔵 Array Type Declaration
 * Two main ways to declare typed arrays
 */

// Method 1: type[] syntax (preferred)
let names: string[] = ["Harman", "Raj", "Aman"];
let scores: number[] = [90, 85, 78];
let flags: Array<boolean> = [true, false]; // Method 2

/**
 * 🔵 Array of Objects
 * Define a type first, then use it for array
 */

type User = { id: number; name: string };

let users: User[] = [
  { id: 1, name: "Harman" },
  { id: 2, name: "Raj" }
];

/**
 * 🔵 Array of Multiple Types (Union)
 * Use | (union) when array can hold different types
 */

let values: (string | number)[] = ["Harman", 99, "Raj", 100];

/**
 * 🔵 Readonly Arrays
 * Prevent array from being modified
 */

const ids: readonly number[] = [101, 102, 103];
// ids.push(104); ❌ Error: Cannot modify readonly array

/**
 * 🔵 Array Methods - ADDING Elements
 */

let fruits: string[] = ["apple", "banana"];

// push() - Add to end
fruits.push("mango");
console.log(fruits); // ["apple", "banana", "mango"]

// unshift() - Add to beginning
fruits.unshift("grapes");
console.log(fruits); // ["grapes", "apple", "banana", "mango"]

// splice(startIndex, deleteCount, ...items) - Insert at specific position
fruits.splice(2, 0, "kiwi"); // Insert "kiwi" at index 2
console.log(fruits); // ["grapes", "apple", "kiwi", "banana", "mango"]

/**
 * 🔵 Array Methods - REMOVING Elements
 */

// pop() - Remove from end
fruits.pop(); // Removes "mango"

// shift() - Remove from start
fruits.shift(); // Removes "grapes"

// splice(startIndex, deleteCount) - Remove at specific position
fruits.splice(1, 1); // Removes element at index 1

/**
 * 🔵 Array Iteration Methods
 */

// for...of loop (cleaner)
for (const fruit of fruits) {
  console.log(fruit);
}

// forEach() (functional)
fruits.forEach((fruit) => {
  console.log(fruit);
});

// map() (transform array)
let lengths = names.map((name) => name.length);
console.log(lengths); // [7, 3, 4]

// filter() (select items)
let numbers: number[] = [1, 2, 3, 4, 5, 6];
let evenNumbers = numbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6]

// reduce() (aggregate to single value)
let sum2 = numbers.reduce((acc, curr) => acc + curr, 0);
console.log(sum2); // 21

/**
 * 📊 Array Methods Quick Reference
 * | Method | Purpose | Returns |
 * |--------|---------|---------|
 * | push() | Add to end | New length |
 * | unshift() | Add to start | New length |
 * | pop() | Remove from end | Removed item |
 * | shift() | Remove from start | Removed item |
 * | splice() | Add/remove at index | Removed items |
 * | map() | Transform items | New array |
 * | filter() | Select items | New array |
 * | reduce() | Aggregate items | Single value |
 * | forEach() | Loop through | undefined |
 */

// ============================================================================
// MODULE 9: OBJECTS IN TYPESCRIPT
// ============================================================================

/**
 * 🔵 Object Type Declaration - Basic
 * An object is a collection of key-value pairs
 */

let person: { name: string; age: number } = {
  name: "Harman",
  age: 25
};

/**
 * 🔵 Nested Objects
 * Objects can contain other objects
 */

let persons: {
  name: string;
  age: number;
  company: string;
  place: {
    country: string;
    city: string;
  };
} = {
  name: "harmanpreet singh",
  age: 27,
  company: "tcs",
  place: {
    country: "india",
    city: "delhi"
  }
};

persons.place.country = "canada";
console.log(persons);

/**
 * 🔵 Optional Properties
 * Use ? to make a property optional
 */

let user: { name: string; email?: string } = {
  name: "Harman"
  // email is optional, can be omitted
};

// Now we can add email if needed
user.email = "harman@example.com";

/**
 * 📌 Colon (:) vs Equals (=)
 * - `:` declares TYPE: `name: string`
 * - `=` assigns VALUE: `name = "Harman"`
 */

// ============================================================================
// MODULE 10: TYPE ALIASES
// ============================================================================

/**
 * 🔵 Type Aliases
 * Create reusable type definitions with custom names
 * Convention: Start with capital letter
 */

// Simple type alias
type Creating = number;

// Object type alias
type Person = {
  name: string;
  id: number;
  class?: string; // Optional property
};

let manu: Person = {
  name: "harmanpreet singh",
  id: 289
};

// Alias for multiple types
type CarYear = number;
type CarType = string;
type CarModel = string;

type Car = {
  year: CarYear;
  type: CarType;
  model: CarModel;
};

const car: Car = {
  year: 2001,
  type: "Toyota",
  model: "Corolla"
};

/**
 * 🔵 Type Alias for Objects with Methods
 */

type Product = {
  name: string;
  price: number;
  quantity: number;
};

let laptop: Product = {
  name: "HP",
  price: 50000,
  quantity: 2
};

function totalPrice(obj: Product): number {
  return obj.price * obj.quantity;
}

console.log(totalPrice(laptop)); // 100000

// ============================================================================
// MODULE 11: CALL SIGNATURES & FUNCTION TYPES
// ============================================================================

/**
 * 🔵 Call Signatures
 * Define function shape without implementing it
 * Describes: parameters and return type
 */

// Simple function type
type Greet = (name: string) => string;

const sayHello: Greet = (name) => {
  return "Hello " + name;
};

console.log(sayHello("World")); // "Hello World"

/**
 * 🔵 Complex Function Types
 */

// Function that takes multiple parameters and returns boolean
type Validate = (email: string, password: string) => boolean;

const isValidUser: Validate = (email, password) => {
  return email.includes("@") && password.length >= 8;
};

// Function with optional return
type Fetch = (url: string) => Promise<string> | null;

/**
 * 📌 Benefits of Call Signatures:
 * ✅ Enforce function contract
 * ✅ Reusable across multiple functions
 * ✅ Clear intent for other developers
 * ✅ Better IDE autocomplete
 */

// ============================================================================
// MODULE 12: ENUMS
// ============================================================================

/**
 * 🔵 What are Enums?
 * Enums give names to a set of numeric or string values
 * Makes code more readable and less error-prone
 */

// Numeric Enum (default - starts from 0)
enum Direction {
  North = 0,  // 0
  East = 1,   // 1
  South = 2,  // 2
  West = 3    // 3
}

let dir: Direction = Direction.East;
console.log(dir); // Output: 1

// String Enum
enum Color {
  Red = "RED",
  Green = "GREEN",
  Blue = "BLUE"
}

let myColor: Color = Color.Green;
console.log(myColor); // Output: "GREEN"

// Mixed Enum
enum Status {
  Active = 1,
  Inactive = 2,
  Pending = "PENDING"
}

/**
 * 📌 When to Use Enums:
 * ✅ Fixed set of related values
 * ✅ Status codes, directions, colors
 * ✅ Configuration options
 * ❌ Dynamic values
 */

// ============================================================================
// MODULE 13: TUPLES
// ============================================================================

/**
 * 🔵 What is a Tuple?
 * A fixed-length array where each position has a specific type
 * Different from regular array which has same type for all elements
 */

// Basic Tuple
let person2: [string, number] = ["John", 25];
// Index 0: string, Index 1: number

// Tuple with 3 elements of different types
let user2: [string, number, boolean] = ["Alice", 30, true];

/**
 * 🔵 Optional Tuple Elements
 * Use ? to make elements optional
 */

let optionalUser: [string, number?] = ["Bob"];
// Second element can be omitted

/**
 * 🔵 Tuple with Rest Elements
 * Use ... (spread) to accept multiple elements
 */

let scores2: [string, ...number[]] = ["Rahul", 90, 85, 95];
// First element is string, rest are numbers

/**
 * 🔵 Tuple Destructuring
 * Extract values from tuple into separate variables
 */

function getUser(): [string, number] {
  return ["Harman", 101];
}

let [userName, userId] = getUser();
console.log(userName, userId); // "Harman", 101

/**
 * 📊 Tuple vs Array Comparison
 * | Feature | Array | Tuple |
 * |---------|-------|-------|
 * | Length | Variable | Fixed |
 * | Types | All same | Can differ |
 * | Example | `string[]` | `[string, number]` |
 * | Flexibility | High | Low |
 * | Safety | Medium | High |
 */

/**
 * 🧪 Practice: Tuple with City Data
 */

type CityData = [string, number]; // [cityName, population]
let city: CityData = ["Delhi", 32000000];

/**
 * 🧪 Practice: Product Tuple
 */

type ProductTuple = [string, number, boolean]; // [name, price, inStock]
let product: ProductTuple = ["Laptop", 49999, true];

// ============================================================================
// MODULE 14: UNION TYPES
// ============================================================================

/**
 * 🔵 What is a Union Type?
 * A variable can be ONE of multiple types
 * Use | (pipe) to separate types
 * Think of it as OR logic
 */

// Union of two types
let id: string | number;

id = "ABC123"; // ✅ Valid - string
id = 12345;    // ✅ Valid - number
// id = true;  // ❌ Error - boolean not allowed

/**
 * 🔵 Union in Function Parameters
 */

function printId(id: string | number): void {
  console.log("ID:", id);
}

printId("ABC123"); // ✅ Works
printId(12345);    // ✅ Works

/**
 * 🔵 Union with Type Guards
 * Check type before using type-specific methods
 */

function processInput(input: string | number): void {
  if (typeof input === "string") {
    console.log(input.toUpperCase()); // String method
  } else {
    console.log(input.toFixed(2)); // Number method
  }
}

processInput("hello"); // "HELLO"
processInput(42);      // "42.00"

/**
 * 🔵 Union with Objects
 */

type Cat = { name: string; meow(): void };
type Dog = { name: string; bark(): void };

let pet: Cat | Dog;

pet = { name: "Whiskers", meow: () => console.log("meow") }; // Cat
pet = { name: "Buddy", bark: () => console.log("woof") };    // Dog

/**
 * 📌 Union Type Use Cases:
 * ✅ API responses (success | error)
 * ✅ Optional values (value | null)
 * ✅ Multiple input types
 * ✅ Configuration options
 */

// ============================================================================
// MODULE 15: INTERSECTION TYPES
// ============================================================================

/**
 * 🔵 What is an Intersection Type?
 * Combine multiple types into ONE
 * Use & (ampersand) to combine types
 * Think of it as AND logic
 */

// Define individual types
type HasName = { name: string };
type HasAge = { age: number };

// Intersection - must have both
type PersonIntersection = HasName & HasAge;

const fullPerson: PersonIntersection = {
  name: "Harman",
  age: 25
  // ❌ Error if either property is missing
};

/**
 * 🔵 Intersection with Functions
 */

type HasEmail = { email: string };
type HasPhone = { phone: string };
type Contact = HasEmail & HasPhone;

let contact: Contact = {
  email: "harman@example.com",
  phone: "9999999999"
};

/**
 * 📊 Union vs Intersection Comparison
 * | Feature | Union (|) | Intersection (&) |
 * |---------|-----------|-----------------|
 * | Meaning | Either type A or B | Both type A and B |
 * | Logic | OR | AND |
 * | Properties | Some from A or B | All from A and B |
 * | Use Case | Flexible input | Combining features |
 * | Example | `string | number` | `{ name } & { age }` |
 */

/**
 * 🧪 Practice Questions & Answers
 */

// Q1: Declare variable holding string or number
let flexibleInput: string | number;

// Q2: Create type combining two objects
type Address = { city: string };
type Job = { company: string };
type EmployeeFull = Address & Job;

const employee: EmployeeFull = {
  city: "Delhi",
  company: "TCS"
};

// Q3: Is this valid?
type A = { a: string };
type B = { b: number };

let val: A | B = { a: "test" }; // ✅ Yes - Union, only needs one
let val2: A & B = { a: "test", b: 123 }; // ✅ Yes - Intersection needs both

// ============================================================================
// MODULE 16: INTERFACES (Alternative to Type Aliases)
// ============================================================================

/**
 * 🔵 What are Interfaces?
 * Similar to type aliases but only for object types
 * More commonly used in OOP contexts
 */

interface Rectangle {
  height: number;
  width: number;
}

const rectangle: Rectangle = {
  height: 20,
  width: 10
};

/**
 * 🔵 Interface with Optional Properties
 */

interface User3 {
  name: string;
  email?: string; // Optional
  age?: number;   // Optional
}

/**
 * 🔵 Interface Inheritance (Extending)
 */

interface Animal {
  name: string;
  age: number;
}

interface Dog3 extends Animal {
  breed: string;
}

const dog: Dog3 = {
  name: "Buddy",
  age: 5,
  breed: "Labrador"
};

/**
 * 📌 Type Alias vs Interface
 * | Feature | Type | Interface |
 * |---------|------|-----------|
 * | Use Case | Any type | Objects only |
 * | Extension | & (intersection) | extends |
 * | Merging | Not allowed | Allowed |
 * | Primitives | ✅ Yes | ❌ No |
 * | Functions | ✅ Yes | Limited |
 */

// ============================================================================
// MODULE 17: PRACTICAL EXAMPLES & REAL-WORLD PATTERNS
// ============================================================================

/**
 * 🔵 Example 1: E-commerce Product System
 */

type ProductPrice = {
  amount: number;
  currency: string;
};

type ProductInventory = {
  inStock: boolean;
  quantity: number;
};

type FullProduct = ProductPrice & ProductInventory & { name: string };

const laptop2: FullProduct = {
  name: "MacBook Pro",
  amount: 150000,
  currency: "INR",
  inStock: true,
  quantity: 5
};

/**
 * 🔵 Example 2: API Response Handler
 */

type SuccessResponse = {
  status: "success";
  data: any;
};

type ErrorResponse = {
  status: "error";
  error: string;
};

type APIResponse = SuccessResponse | ErrorResponse;

function handleResponse(response: APIResponse): void {
  if (response.status === "success") {
    console.log("Data:", response.data);
  } else {
    console.log("Error:", response.error);
  }
}

/**
 * 🔵 Example 3: Form Validation
 */

type FormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};

function validateForm(data: FormData): boolean {
  return data.email.includes("@") && data.password.length >= 8;
}

/**
 * 🔵 Example 4: Configuration Object
 */

type AppConfig = {
  apiUrl: string;
  timeout: number;
  retries?: number;
  debug?: boolean;
};

const config: AppConfig = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  debug: true
};

// ============================================================================
// SUMMARY & BEST PRACTICES
// ============================================================================

/**
 * ✅ DO's in TypeScript:
 * 1. Always annotate function parameters and return types
 * 2. Use type aliases for reusable types
 * 3. Prefer unknown over any
 * 4. Use union types for flexible inputs
 * 5. Use interfaces for object contracts
 * 6. Document types with comments
 * 7. Use readonly for immutable data
 * 8. Leverage type guards in conditionals
 *
 * ❌ DON'Ts in TypeScript:
 * 1. Don't use any without good reason
 * 2. Don't mix union and intersection without clarity
 * 3. Don't create overly complex nested types
 * 4. Don't skip return type annotations
 * 5. Don't ignore TypeScript errors
 *
 * 🎯 Interview Tips:
 * 1. Explain difference between type and interface
 * 2. Know when to use union vs intersection
 * 3. Understand type guards and narrowing
 * 4. Practice type compatibility
 * 5. Know common built-in types
 */

console.log("TypeScript Crash Course Complete!");
