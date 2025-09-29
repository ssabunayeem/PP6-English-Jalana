// ---------------------------------- load Lesson buttons ---------------------------------------

const loadLesson = () => {
    fetch("https://openapi.programming-hero.com/api/levels/all")
        .then(res => res.json())
        .then(data => displayLesson(data.data));  // 1st data is variable .data is form json file  
}

const displayLesson = (lessons) => {
    const lessonContainer = document.getElementById("lesson-container");
    console.log(lessons);
    lessonContainer.innerHTML = "";

    for (let lesson of lessons) {
        const btnDiv = document.createElement('div');
        btnDiv.innerHTML = `
        <button onclick = "loadWord(${lesson.level_no})"  class="btn btn-outline btn-primary">
        <i class="fa-solid fa-book-open"></i> Lesson - ${lesson.level_no}</button>
        `
        lessonContainer.appendChild(btnDiv);
    }

}

loadLesson();


// ---------------------------------- load Lesson words ---------------------------------------

const loadWord = (id) => {
    const url = `https://openapi.programming-hero.com/api/level/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayWord(data.data))
}


const displayWord = (words) => {

    const wordContainer = document.getElementById("word-container");
    wordContainer.innerHTML = "";

    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `

        <div class="card bg-base-100  shadow-sm  py-5">
                <div class="card-body items-center space-y-5">
                    <h2 class="card-title text-3xl text-green-800 mb-2">${word.word}</h2>
                    <p class="m-2">Meaning / Pronunciation</p>
                    <h2 class="card-title text-xl text-sky-600 font-bangla">${word.meaning} / ${word.pronunciation}</h2 >

            <div class="card-actions justify-between gap-80 mt-5">
                <button class="btn bg-blue-50"><i class="fa-solid text-xl fa-circle-info"></i></button>
                <button class="btn bg-blue-50"><i class="fa-solid text-xl fa-volume-high"></i></button>
            </div>
                </div >
            </div >


        `;
        wordContainer.append(card);
    });
}