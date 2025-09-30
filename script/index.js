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

    if (words.length == 0) {

        wordContainer.innerHTML = `
            <div class="card text-center py-10 space-y-3 font-bangla col-span-full">
                <img class="w-fit mx-auto" src="assets/alert-error.png" alt="">
                <small class="font-bangla  text-gray-500">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</small>
                <h3 class="text-3xl font-semibold font-bangla">নেক্সট Lesson এ যান</h3>
            </div>
        `
        return;
    }


    words.forEach(word => {
        const card = document.createElement("div");
        card.innerHTML = `
 
         <div class="card bg-base-100  shadow-sm  py-5">

                 <div class="card-body items-center space-y-5">

                     <h2 class="card-title text-3xl text-green-800 mb-2">
                     ${word.word ? word.word : `<span class="text-red-300">⚠️ not found</span>`}</h2>

                     <p class="m-2">Meaning / Pronunciation</p>

                     <h2 class="card-title text-xl text-sky-600 font-bangla">
                     ${word.meaning ? word.meaning : `<span class="text-red-300">⚠️ not found</span>`} / 
                     ${word.pronunciation ? word.pronunciation : `<span class="text-red-300">⚠️ not found</span>`}</h2 >
                    
                 </div>

                 <div class="card-actions justify-between mx-10 my-5">
                         <button class="btn bg-blue-50 hover:bg-blue-200"><i class="fa-solid text-xl fa-circle-info"></i>
                         </button>
                      <button class="btn bg-blue-50 hover:bg-blue-200"><i class="fa-solid text-xl fa-volume-high"></i>
                      </button>
                 </div>
 
         </div >
 
         `;
        wordContainer.append(card);
    });



}