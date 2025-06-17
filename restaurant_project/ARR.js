const arr = [1,2,3,1];

let temp = new Set();
let elem = 0

for(let  i =0;i<arr.length;i++){
    if(temp.has(arr[i])){
        elem = temp;
        console.log("its duplicated");
        break;

    }
    temp.add(arr[i])
    
   


}
console.log(temp)
console.log(elem)