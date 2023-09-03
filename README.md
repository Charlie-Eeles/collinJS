# collinJS
 
Collect and inject javascript (collinJS) is a small package that is used to build a javascript function object that represents javascript helper functions in a folder structure.\
These functions are then intended to be injected into other functions through arguments.\
The idea is:\
(a) There will be a significant reduction in imports as the importing is done in the parent-most function.\
(b) Its folder structure enforces a framework of how helpers should be organised in the codebase.\
(c) Because objects are passed as pointers through arguments rather than new instances like imports, the same function object (and therefore same memory usage for that function object) is used for a whole service.

You can use it with:\
```npm install collinjs```
