const bars = document.querySelector(".bars");
const algorithm = document.querySelector(".algorithnm");
const msort = document.querySelector("#mergeSort");
const insort = document.querySelector("#insertionSort");
const bsort = document.querySelector("#bubbleSort");
const slider = document.querySelector("#myRange");
const speed = document.querySelector("#mySpeed");
let array = [];
let map = new Map();

const styleBar = (element, height, width, w) =>{
    element.style.alignText =  "vertical-center";
    //element.style.padding = `${100/w}%`;
    element.style.height = `${height}vh`;
    element.style.width = `${(80/width) - (100/w)}%`;
    element.style.display = "inline-block";
    element.style.backgroundColor = "blue";
    element.style.margin = "0 1px";
}

const resetBars = (array, size) => {
    bars.innerHTML = '';
    const width = window.screen.availWidth - 20;
    for(let i = 0;i<size;i++)
    {
        array[i] = (Math.random() * (70-1) + 1);
        let element = document.createElement("p");
        map[i]=array[i];
        element.setAttribute("id", `id${i}`);
        styleBar(element, array[i], size, width);
        bars.appendChild(element)
    }
}

const delay = (seconds) => {
    return new Promise(
        resolve => setTimeout(resolve, seconds)
    );
};

const doAnimation = async (item) => {
    let bar1 = document.querySelector(`#id${item[0]}`);
    let bar2 = document.querySelector(`#id${item[1]}`);
    bar1.style.backgroundColor = "red";
    bar2.style.backgroundColor = "red";
    await delay(Math.floor(101 - speed.value));
    let h1 = bar1.style.height;
    let h2 = bar2.style.height;
    bar1.style.height = h2;
    bar2.style.height = h1;
    await delay(101 - speed.value);
    bar1.style.backgroundColor = "blue";
    bar2.style.backgroundColor = "blue";
}
const merge = (arr1, arr2) => {
    let i=0;
    let j=0;
    let k = 0;
    let temp = [];
    for(;i<arr1.length && j<arr2.length;k++) {
        if(arr1[i] < arr2[j]) {
            temp.push(arr1[i]);
            i++;
        } else {
            temp.push(arr2[j]);
            j++;
        }
    }
    if(i<arr1.length) temp.push(...arr1.slice(i, arr1.length)); //(...) spread operator
    if(j<arr2.length) temp.push(...arr2.slice(j, arr2.length));
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
        bar.style.height = `${array[l+i]}vh`
    }
}

const insertionSort = async(array) => {
    let animation = [];
    for(let i=1;i<array.length;i++) {
        for(let j=i;j>0;j--) {
            if(array[j] < array[j-1]) {
                let temp = array[j];
                array[j] = array[j-1];
                array[j-1] = temp;
                await doAnimation([j, j-1]);
            } else {
                break;
            }
        }
    }
    //doAnimation(animation);
}
const bubbleSort = async (array) => {
    animation = [];
    for(let i=0;i<array.length;i++) {
        for(let j=0;j<array.length-1;j++) {
            if(array[j] > array[j+1]) {
                let temp = array[j];
                array[j] = array[j+1];
                array[j+1] = temp;
                await doAnimation([j, j+1]);
            }
        }
    }
}
resetBars(array, slider.value);

msort.addEventListener("click", function(){mergeSort(array, 0, slider.value - 1)});
insort.addEventListener("click", function(){insertionSort(array)});
bsort.addEventListener("click", function(){bubbleSort(array)});
slider.addEventListener("input", function(){resetBars(array, slider.value)});
console.log(array); 