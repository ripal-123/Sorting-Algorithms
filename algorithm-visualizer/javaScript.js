const bars = document.querySelector(".bars");
const algorithm = document.querySelector(".algorithnm");
const msort = document.querySelector("#mergeSort");
const slider = document.querySelector(".slider");
let array = [];
let map = new Map();

const styleBar = (element, height, width, w) =>{
    element.style.alignText =  "vertical-center";
    //element.style.padding = "1px";
    element.style.height = `${height}px`;
    element.style.width = `${(80/width - 100/w)}%`;
    element.style.display = "inline-block";
    element.style.backgroundColor = "blue";
    element.style.margin = "1px";
}

const resetBars = (array, size) => {
    bars.innerHTML = '';
    const width = window.screen.availWidth - 20;
    for(let i = 0;i<size;i++)
    {
        array[i] = Math.floor((Math.random() * 100000)%490);
        let element = document.createElement("p");
        map[i]=array[i];
        element.setAttribute("id", `id${i}`);
        styleBar(element, array[i], size, width);
        bars.appendChild(element)
    }
}
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
        let bar = document.querySelector(`#id${l + i}`);
        bar.style.height = `${array[l+i]}px`
    }
}

resetBars(array, slider.value);

msort.addEventListener("click", function(){mergeSort(array, 0, slider.value - 1)});
slider.addEventListener("input", function(){resetBars(array, slider.value)});
console.log(array);