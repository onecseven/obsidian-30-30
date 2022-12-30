let test = `#+ Research
25 Readings
ss
Longbreak 25
5 Break
25 Synthetize
15 Snack
25 Reading
x1
-#


Data Structures: 25

Break: 5
Algorithm: 25

#+Pollo

lol
-#`

let full_block = new RegExp(/\#\+(.)*?\-\#/gs)

console.log(test.match(full_block))