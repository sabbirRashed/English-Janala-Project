
const createElement = (arr)=>{
    const htmlElement = arr.map(el => `<span class="btn">${el}</span>`);
    console.log(htmlElement);
}

const array =["dahvi", "havu", "slk"]
createElement(array)