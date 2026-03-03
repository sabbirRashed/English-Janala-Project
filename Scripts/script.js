const loadAllLevels = () => {
    const url = "https://openapi.programming-hero.com/api/levels/all";
    fetch(url)
        .then(res => res.json()
            .then(json => displayAllLevels(json.data)));
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
                    <button class="btn btn-outline btn-primary">
                        <i class="fa-solid fa-book-open"></i>Lesson - ${lesson.level_no}
                    </button>
    
    `
        // step 4: append created element
        levelContainer.appendChild(btnDiv);
    });


}
loadAllLevels();