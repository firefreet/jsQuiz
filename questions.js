// questions and answers from https://jaxenter.com/
var questions1 = [
    {
        question: "Who created JavaScript?",
        choices: ["a) Microsoft","b) Sun Microsystems","c) Oracle","d) Netscape"],
        answer: "d) Netscape"
    },
    {
        question: "How long did Brendan Eich take to write the JavaScript programming language?",
        choices: ["a) 10 days","b) 2 weeks","c) 2 months","d) 10 months",],
        answer: "a) 10 days"
    },
    {   
        question: "JavaScript wasn’t always called that. What other name has it been released under?",
        choices: ["a) Latte","b) Mocha","c) BScript","d) Spidermonkey"],
        answer: "b) Mocha"
    },
    {
        question: "JavaScript and Java are basically the same.",
        choices: ["a) Yes","b) No"],
        answer: "b) No"
    },
    {
        question: "Is JavaScript a front-end, back-end, or full-stack programming language?",
        choices: ["a) Front-end","b) Back-end","c) Full-stack"],
        answer: "c) Full-stack"
    },
    {
        question: "Is JavaScript dynamically typed or statically typed?",
        choices: ["a) Dynamic","b) Static"],
        answer: "a) Dynamic"
    },
    {
        question: "Null is an object, yes or no?",
        choices: ["a) Yes","b) No"],
        answer: "a) Yes"
    },
    {
        question: "Which of the following is not a reserved word in JavaScript?",
        choices: ["a) default","b) finally","c) throw","d) undefined"],
        answer: "d) undefined"
    }

]

var questions2 = [
    {
        question: "What is a potential pitfall with using ' typeof bar === \"object\" ' to determine if bar is an object?",
        choices: ["a) Null is an object","b) A function is not an object","c) An array is an object","d) All of the above"],
        answer: "d) All of the above"
    },
    {
        question: "What is the significance of wrapping the entire content of a JavaScript source file in a function block",
        choices: ["a) It creates a closure","b) It creates a private namespace","c) It creates a field","d) Both A and B","e) None of the above"],
        answer: "d) Both A and B"
    },
    {
        question: "What does the .reverse() method of an array do?",
        choices: ["a) Reverses the array","b) Returns the reversed value of the array","c) Returns a reference to the array","d) Both A and C","e) None of the above"],
        answer: "d) Both A and C"
    },
    {
        question: "What does ( 1 && 2 ) return?",
        choices: ["a) false","b) true","c) 1","d) 2","e) 3","f) B and D"],
        answer: "d) 2"
    },
    {
        question: "What does ( 0 || 1 ) return?",
        choices: ["a) false","b) true","c) 0","d) 1"],
        answer: "d) 1"
    },
    {
        question: "What will the following display? <small><div class=\"text-left\"><br>var length = 10\;<br>function fn() {<br>&emsp;console.log(this.length)\;<br>\}<br><br>var obj = \{<br>&emsp;length: 5\,<br>&emsp;method: function(fn) \{<br>&emsp;&emsp;arguments[0]()\;<br>\&emsp;}<br>}\;<br><br>obj.method(fn, 1)\;</div><small>",
        choices: ["a) 10","b) 5","c) 2","d) 0"],
        answer: "c) 2"
    },


]