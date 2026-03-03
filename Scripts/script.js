const loadAllLevels = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then(res => res.json()
            .then(json => displayAllLevels(json.data)));
}


const loadLevelWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
        .then(res => res.json()
            .then(json => displayLevelWord(json.data)))
}

const displayLevelWord = (levelWords) => {

    const levelWordContainer = document.getElementById("word-container");
    levelWordContainer.innerHTML = "";

    // {
    //     "id": 74,
    //      "level": 1,
    //             "word": "Dog",
    //                 "meaning": "কুকুর",
    //                     "pronunciation": "ডগ"
    // }

    levelWords.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
                 <div class="bg-white text-center shadow-sm py-12 px-8 rounded-xl">
                    <h3 class="text-3xl font-bold">${word.word}</h3>
                    <p class="text-[16px] font-medium mt-4">Meaning /Pronounciation</p>
                    <p class="text-2xl font-semibold text-[#18181B] bangla-shiliguri mt-6">"${word.meaning} / ${word.pronunciation}"</p>
                    <div class="flex justify-between items-center mt-12">
                        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] text-[#374957]"><i class="fa-solid fa-circle-info"></i></button>
                        <button class="btn bg-[#1A91FF10] hover:bg-[#1A91FF80] text-[#374957]"><i class="fa-solid fa-volume-high"></i></button>
                    </div>
                </div>

        `
        levelWordContainer.appendChild(card);

    })
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
                    <button onclick = loadLevelWord(${lesson.level_no}) class="btn btn-outline btn-primary">
                        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                    </button>
    
    `
        // step 4: append created element
        levelContainer.appendChild(btnDiv);
    });

}
loadAllLevels();