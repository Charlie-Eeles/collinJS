import { MethodObject } from "./create-method-object";

interface MethodsToInclude {
    [key: string]: boolean | string[] | MethodsToInclude;
}

function createMethodSubset(methodObject: MethodObject | any, methodsToInclude: MethodsToInclude | any): MethodObject {
    return Object.keys(methodsToInclude).reduce((subset: any, key) => {
        if (methodsToInclude[key] === true) {
            subset[key] = methodObject[key];
        } 
        else if (Array.isArray(methodsToInclude[key])) {
            subset[key] = {};
            methodsToInclude[key].forEach((method: string) => {
                subset[key][method] = methodObject[key][method];
            });
        } 
        else if (typeof methodsToInclude[key] === 'object') {
            subset[key] = createMethodSubset(methodObject[key], methodsToInclude[key]);
        }
        return subset;
    }, {});
}

export { createMethodSubset };