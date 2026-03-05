const createElement = (arr) => {
    const htmlElement = arr.map(el => `<span class="btn">${el}</span>`);
    return (htmlElement.join(" "));
}

function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}

const manageSpinner = (status) => {
    if (status === true) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    } else {
        document.getElementById("word-container").classList.remove("hidden");
        document.getElementById("spinner").classList.add("hidden");
    }
}

const loadAllLevels = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then(res => res.json())
        .then(json => displayAllLevels(json.data));
}


const removeActive = () => {
    const lessonBtns = document.querySelectorAll(".active");
    lessonBtns.forEach(btn => {
        btn.classList.remove("active")
    })
}

const loadLevelWord = (id) => {
    manageSpinner(true);
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json())
        .then(json => {
            const clilckBtn = document.getElementById(`level-btn-${id}`);
            removeActive();
            clilckBtn.classList.add("active"); //add active class on clickbtn
            displayLevelWord(json.data);
        })
}

const loadWordDetails = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const details = await res.json();
    displayWordDetails(details.data);
}

// {word: 'Eager', meaning: 'আগ্রহী', pronunciation: 'ইগার', level: 1, sentence: 'The kids were eager to open their gifts.', …}
// id
// : 
// 5
// level
// : 
// 1
// meaning
// : 
// "আগ্রহী"
// partsOfSpeech
// : 
// "adjective"
// points
// : 
// 1
// pronunciation
// : 
// "ইগার"
// sentence
// : 
// "The kids were eager to open their gifts."
// synonyms
// : 
// (3) ['enthusiastic', 'excited', 'keen']
// word
// : 
// "Eager"
// [[Prototype]]
// : 
// Object

const displayWordDetails = (word) => {
    console.log(word);
    const detailsContainer = document.getElementById("details-container");
    detailsContainer.innerHTML = `
                    <div class="">
                        <h2 class="font-bold text-3xl">${word.word} (<i class="fa-solid fa-microphone-lines"></i>:${word.pronunciation})
                        </h2>
                    </div>
                    <div class="">
                        <h3 class="font-bold text-xl">Meaning</h3>
                        <p class="font-medium text-2xl bangla-shiliguri mt-2.5">${word.meaning}</p>
                    </div>
                    <div class="">
                        <h3 class="font-bold text-xl">Example</h3>
                        <p class="text-xl mt-2">${word.sentence}</p>
                    </div>
                    <div class="">
                        <h3 class="font-bold text-xl mb-2">Synonym</h3>
                        ${createElement(word.synonyms)}
                    </div>
    
    `

    document.getElementById("details_modal").showModal();
}

const displayLevelWord = (levelWords) => {

    const levelWordContainer = document.getElementById("word-container");
    levelWordContainer.innerHTML = "";

    if (levelWords.length === 0) {
        const card = document.createElement("div");
        card.classList = "col-span-full";
        card.innerHTML = `
                 <div class="text-center py-10 space-y-5 rounded-xl">
                    <img src="./assets/alert-error.png" class="mx-auto">
                    <p class="text-[1.25rem] text-[#79716B] bangla-shiliguri">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <p class="text-4xl text-[#292524] font-bold bangla-shiliguri">নেক্সট Lesson এ যান</p>
                 </div>

        `
        levelWordContainer.appendChild(card);
    }
    else {
        levelWords.forEach(word => {
            const card = document.createElement("div");
            card.innerHTML = `
                 <div class="bg-white text-center shadow-sm py-12 px-8 rounded-xl">
                    <h3 class="text-3xl font-bold">${word.word ? word.word : "শব্দ পাওয়া যায়নি"}</h3>
                    <p class="text-[16px] font-medium mt-4">Meaning /Pronounciation</p>
                    <p class="text-2xl font-semibold text-[#18181B] bangla-shiliguri mt-6">"${word.meaning ? word.meaning : "অর্থ পাওয়া যায়নি"} / ${word.pronunciation ? word.pronunciation : "pronunciation পাওয়া যায়নি"}"</p>
                    <div class="flex justify-between items-center mt-12">
                        <button onclick="loadWordDetails(${word.id})" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] text-[#374957]">
                            <i class="fa-solid fa-circle-info"></i>
                        </button>
                        <button onclick="pronounceWord('${word.word}')" class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] text-[#374957]">
                            <i class="fa-solid fa-volume-high"></i>
                        </button>
                    </div>
                </div>

        `
            levelWordContainer.appendChild(card);

        })
    }
    manageSpinner(false);
}



const displayAllLevels = (lessons) => {

    // step 1: get the container & empty
    const levelContainer = document.getElementById("level-container");
    levelContainer.innerHTML = "";

    // step:2 get every lessons
    lessons.forEach(lesson => {
        // step 3: create element
        const btnDiv = document.createElement("div");
        btnDiv.innerHTML = `
                    <button id="level-btn-${lesson.level_no}" onclick = loadLevelWord(${lesson.level_no}) class="btn btn-outline btn-primary">
                        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                    </button>
    
    `
        // step 4: append created element
        levelContainer.appendChild(btnDiv);
    });

}
loadAllLevels();


document.getElementById("btn-search")
    .addEventListener("click", () => {

        removeActive();
        const inputFiled = document.getElementById("input-search");
        const searchValue = inputFiled.value.trim().toLowerCase();

        const url = "https://openapi.programming-hero.com/api/words/all";
        fetch(url)
            .then(res => res.json())
            .then(data => {

                const allWords = data.data;
                const filterWords = allWords.filter((word) => word.word.toLowerCase().includes(searchValue));
                displayLevelWord(filterWords);
            });

    })