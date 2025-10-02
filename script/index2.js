// ---------------------------------- load Lesson buttons ---------------------------------------
const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLesson(data.data));
}

const displayLesson = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button id="lesson-btn-${lesson.level_no}" 
                onclick="loadWord(${lesson.level_no}, '${lesson.lessonName}')"  
                class="btn btn-outline btn-primary lesson-btn">
            <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
        </button>
        `;
        lessonContainer.appendChild(btnDiv);
    }
}

loadLesson();


// ---------------------------------- load words ---------------------------------------

// highlight selected lesson button
const removeBtnBackground = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(btn => {
        btn.classList.add("btn-outline")
    });
}

// load word
const loadWord = (id, lessonName) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeBtnBackground();
            document.getElementById(`lesson-btn-${id}`).classList.remove("btn-outline");

            // word grid এর মধ্যে lesson title সহ words দেখানো
            displayWord(data.data, lessonName);
        })
}

// display words + lesson title
const displayWord = (words, lessonName) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    // শিরোনাম দেখাও
    const titleDiv = document.createElement("div");
    titleDiv.classList.add("col-span-full", "text-center", "mb-5");
    titleDiv.innerHTML = `<h2 class="text-2xl font-bold text-purple-700">${lessonName}</h2>`;
    wordContainer.appendChild(titleDiv);

    if (words.length == 0) {
        wordContainer.innerHTML += `
            <div class="card text-center py-10 space-y-3 font-bangla col-span-full">
                <img class="w-fit mx-auto" src="assets/alert-error.png" alt="">
                <small class="font-bangla text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</small>
                <h3 class="text-3xl font-semibold font-bangla">নেক্সট Lesson এ যান</h3>
            </div>
        `;
        return;
    }

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="card bg-base-100 shadow-sm py-5">
                <div class="card-body items-center space-y-5">
                    <h2 class="card-title text-3xl text-green-800 mb-2">
                        ${word.word ? word.word : `<span class="text-red-300">⚠️ not found</span>`}
                    </h2>
                    <p class="m-2">Meaning / Pronunciation</p>
                    <h2 class="card-title text-xl text-sky-600 font-bangla">
                        ${word.meaning ? word.meaning : `<span class="text-red-300">⚠️ not found</span>`} /
                        ${word.pronunciation ? word.pronunciation : `<span class="text-red-300">⚠️ not found</span>`}
                    </h2>
                </div>
                <div class="card-actions justify-between mx-10 my-5">
                    <button class="btn bg-blue-50 hover:bg-blue-200"><i class="fa-solid text-xl fa-circle-info"></i></button>
                    <button class="btn bg-blue-50 hover:bg-blue-200"><i class="fa-solid text-xl fa-volume-high"></i></button>
                </div>
            </div>
        `;
        wordContainer.appendChild(card);
    });
}
