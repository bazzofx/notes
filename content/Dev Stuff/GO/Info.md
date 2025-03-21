- Go is an object oriented language that was meant to be the modern version of **C**.
- Go applications need to be compile to be run, The same code can be compiled to OS specifc Windows,Mac,Linux.
- Statically type language: all variables needs a type assigned

## Variables
**Type variables** are static and can't be change once variable is initialized.

#### Explicit
Explicit tells which type to use
```
var anInteger int = 33
var anString string = "Hello"
```
#### Implicit
The GO compiler makes the decision for the type to use
```
anInteger := 33
anString := "Hello"
```

#### Const
A variable that never change, like in **JavaScript**
```
const ScoreBlue int = 44
const scoreRed := 12
```

| Fixed Integer Types        | Aliases | Floating Values|Complex Number|
|----------------------------|---------|----------------|--------------------|
| uint8, uint16,uint32,uint64|byte, uint| float32|complex64|
|int8,int16,int32,int64      |int, uintptr|float64|complex128|

|Data Collections| Functions | Data Management|
|-----------------|------------|---------------------|
|arrays,slices,maps,strucs | functions| pointers|
|                 |        |Ref variables that points to another address in memory|





| Function | Description |
|----------------|--------------------------------|
|  ten (string) | returns the length of a string |
|  panic(error) | stops execution, displays error message |
|  recover ( )   | manages behavior ofa panicking Goroutine |

