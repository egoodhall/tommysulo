A visualizer for Tomasulo's algorithm in Node.js and React.js

## [Try it out!](https://emm035.github.io/tommysulo/demo/index.html)

### Legal Code
The assembly parser can handle `LD`, `ST`, `ADD`, `SUB`, `MUL`, and `DIV` instructions with the following formats:
```
------------------
LD  REG  INT(REG)
ST 
------------------
ADD  REG  [REG|INT]  [REG|INT]
SUB
MUL
DIV
```
Registers are denoted with `R#` and integers are just the immediate value. For example:
```
ADD R0 1 2    // Add 1 & 2 and store the result in R0
ST  R0 2(R1)  // Store the value in R0 at R1 + 2 in memory
LD  R0 2(R2)  // Load the value in memory at R2 + 2 into R0

```
__Note:__ The parenthesis are required in `LD` and `ST` instructions

Comments start with a `//` and end with a newline

### Contributors
- [Sam Greenberg](https://github.com/greenboigz)
- [Eric Marshall](https://ericmarshall.codes/)
- [Lukas Muñoz](https://github.com/lam046)
- [Jordan Sechler](https://github.com/jordansekky)
