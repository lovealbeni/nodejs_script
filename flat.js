var a = [[1,2],3,[4,[5,6]]];
function flat(arr){
    if(!(a instanceof Array)){
        throw new Error('need error');
    }
    let result = [];
    for(let i =0;i<arr.length;i++){
        let item = arr[i];
        if(typeof item == 'object'){
            result = result.concat(flat(item));
        }else{
            result.push(item);
        }
    }
    return result;
}

var result = flat(a);
console.log(result);

function stackFlat(arr){
    if(!(a instanceof Array)){
        throw new Error('need error');
    }
    let result = [];
    let stack = [];
    let index = arr.length - 1;
    while(index>=0){
        let item = arr[index];
        stack.push(item);
        --index;
    }
    while(stack.length>0){
        let item = stack.pop();
        if(item instanceof Array){
            for(let i=item.length-1;i>=0;i--){
                stack.push(item[i]);
            }
        } else {
            result.push(item);
        }
    }
    return result;
}

var flatResult = stackFlat(a);
console.log('stack',flatResult);