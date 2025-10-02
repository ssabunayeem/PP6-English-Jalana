// --------------------------------- helper functions ---------------------------------
const dynamicSynonym = (array) => {
    const elements = array.map(word => `<span class ="btn bg-sky-100">${word}</span>`);
    console.log(elements.join(""));
    return elements.join("");
};

const removeBtnBackground = () => {
    const lessonBtns = document.querySelectorAll(".lesson-btn");
    lessonBtns.forEach(btn => btn.classList.add("btn-outline"));
};


const spinner = (active) => {
    if (active) {
        document.getElementById("spinner").classList.remove("hidden");
        document.getElementById("word-container").classList.add("hidden");
    }
    else {
        document.getElementById("spinner").classList.add("hidden");
        document.getElementById("word-container").classList.remove("hidden");
    }
}

// word sound / Speech speak
function pronounceWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = "en-EN"; // English
    window.speechSynthesis.speak(utterance);
}



// --------------------------------- display functions ---------------------------------

// __________________________load Lesson buttons__________________________

const displayLessonBtns = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    lessonContainer.innerHTML = "";
    for (let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
            <button id="lesson-btn-${lesson.level_no}" onclick="loadWord(${lesson.level_no})" class="btn btn-outline btn-primary lesson-btn">
                <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}
            </button>
        `;
        lessonContainer.appendChild(btnDiv);
    }
};


// __________________________load words__________________________

const displayWord = (words) => {
    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";
    if (words.length == 0) {
        wordContainer.innerHTML = `
            <div class="card text-center py-10 space-y-3 font-bangla col-span-full">
                <img class="w-fit mx-auto" src="assets/alert-error.png" alt="">
                <small class="font-bangla text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</small>
                <h3 class="text-3xl font-semibold font-bangla">নেক্সট Lesson এ যান</h3>
            </div>
        `;

        spinner(false);

        return;
    }

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
            <div class="card bg-base-100 shadow-md py-5">
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
                    <button onclick="loadModalDetail(${word.id})" class="btn bg-blue-50 hover:bg-blue-200">
                        <i class="fa-solid text-xl fa-circle-info"></i>
                    </button>
                    <button onclick="pronounceWord('${word.word}')" class="btn bg-blue-50 hover:bg-blue-200">
                        <i class="fa-solid text-xl fa-volume-high"></i>
                    </button>
                </div>
            </div>
        `;
        wordContainer.append(card);
    });

    spinner(false);
};


// __________________________load words Detail in modal__________________________

const displayWordModal = (data) => {
    document.getElementById("details-container").innerHTML = `
        <div>
            <h2 class="text-3xl font-bold text-blue-700">${data.word} (<i class="fa-solid fa-microphone-lines"></i>) : ${data.pronunciation}</h2>
        </div>
        <div class="space-y-2">
            <h2 class="text-xl font-bold">Meaning</h2>
            <p class="text-3xl text-blue-600 font-bold">${data.meaning ? data.meaning : `<span class="text-red-300">⚠️ not found</span>`}</p>
        </div>
        <div class="space-y-2">
            <h2 class="text-xl font-bold">Example</h2>
            <p>${data.sentence}</p>
        </div>
        <div>
            <h2 class="text-xl font-bold mb-2">সমার্থক শব্দ গুলো</h2>
            <div class="space-x-2" >${dynamicSynonym(data.synonyms)}</div>
        </div>
    `;
    document.getElementById("word_modal").showModal();
};






// --------------------------------- API loading - main functions ---------------------------------
const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLessonBtns(data.data));
};

const loadWord = (id) => {
    spinner(true);

    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeBtnBackground();
            document.getElementById(`lesson-btn-${id}`).classList.remove("btn-outline");
            displayWord(data.data);
        });

};

const loadModalDetail = async (id) => {
    const url = `https://openapi.programming-hero.com/api/word/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayWordModal(data.data);
};





// --------------------------------- initial call ---------------------------------
loadLesson();




// ------------------------------others function---------------------------

//  ------search section------




document.getElementById("btn-search").addEventListener("click", () => {
    let input = document.getElementById("input-search").value;
    input = input.trim().toLowerCase();
    // console.log(input);

    fetch("https://openapi.programming-hero.com/api/words/all")
        .then(res => res.json())
        .then(json => {
            const wordslist = json.data;
            // console.log(wordslist);

            const results = wordslist.filter(wordObject =>
                wordObject.word.toLowerCase().includes(input)
            );

            removeBtnBackground();
            displayWord(results);
        })


})