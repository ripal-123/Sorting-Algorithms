const merge = (arr1, arr2) => {
    let i=0;
    let j=0;
    let k = 0;
    let temp = [];
    for(;i<arr1.length && j<arr2.length;k++) {
        if(arr1[i] < arr2[j]) {
            temp[k] = (arr1[i]);
            i++;
        } else {
            temp[k] = (arr2[j]);
            j++;
        }
    }
    if(i<arr1.length) 
    {
        for(;i<arr1.length;) temp[k++] = (arr1[i++]);
    }
    if(j<arr2.length) 
    {
        for(;j<arr2.length;) temp[k++] = (arr2[j++]);
    }
    return temp;
}

const mergeSort = (array, l, r) => {
    if(l>=r) return;
    let mid = Math.floor((l+r)/2);
    mergeSort(array, l, mid);
    mergeSort(array, mid+1, r);
    let leftarr = array.slice(l, mid+1);
    let rightarr = array.slice(mid+1, r+1);
    let temp = [];
    temp = merge(leftarr, rightarr);

    for (let i = 0; i < temp.length; i++) {
        array[l + i] = temp[i];
        //let bar = document.querySelector(`#id${l + i}`);
        //bar.style.height = `${array[l+i]}px`
    }
}

export{mergeSort, merge};