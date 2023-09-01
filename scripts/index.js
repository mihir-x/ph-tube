console.log('Yea Allah, Save My Mom');
//load all category and show the list of category
const loadAllCategory = async () => {
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const allCategory = await response.json();
    const categoryList = allCategory.data;
    const categoryListContainer = document.getElementById('category-list-container');
    categoryList.forEach(element => {
        const categoryBtn = document.createElement('button');
        categoryBtn.setAttribute('onclick', `handleCategoryClick(${element.category_id})`)
        categoryBtn.classList = 'px-3 py-2 bg-[#25252526] rounded-lg font-medium text-sm md:text-lg focus:bg-[#FF1F3D] focus:text-white';
        categoryBtn.innerText = `${element.category}`;
        categoryListContainer.appendChild(categoryBtn);
    })
}

//handle click on category and show all the data card related to the category
const handleCategoryClick = async (id) => {
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    const videoList = data.data;
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = '';
    if (videoList.length === 0) {
        cardContainer.classList = '';
        cardContainer.innerHTML = `
            <div id="oops" class="flex flex-col justify-center items-center mt-8 md:mt-16 gap-2 md:gap-6">
                <img src="./images/Icon.png" alt="">
                <h1 class="font-bold text-lg md:text-2xl text-center">Oops!! Sorry, There is no <br> content here</h1>
            </div>
        `
    }
    else {
        cardContainer.classList = 'p-2 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mt-2 md:mt-4 lg:mt-10 gap-4';
        videoList.forEach(element => {
            console.log(element.authors[0].verified);
            const div = document.createElement('div');
            div.setAttribute('views', `${element.others.views}`)
            div.classList = 'card bg-base-100 gap-5';
            div.innerHTML = `
                <figure class=" h-[12rem] relative">
                <img src="${element.thumbnail}" alt="Shoes" class="rounded-xl w-full h-full" />
                <p class="absolute right-2 bottom-2 p-1 bg-black rounded-lg text-white">${element.others.posted_date?(parseInt(parseInt(element.others.posted_date)/3600)+'hrs '+parseInt((parseInt(element.others.posted_date)%3600)/60)+'min ago'):''}</p>
                </figure>
                <div class="flex gap-4">
                    <div class="h-10 w-10">
                        <img src="${element.authors[0].profile_picture}" alt="" class="h-full w-full rounded-full">
                    </div>
                    <div>
                        <h2 class="card-title">${element.title}</h2>
                        <p>${element.authors[0].profile_name} ${element.authors[0].verified?'<span id="verification" class="rounded-full bg-blue-600 p-1 px-2 text-white"><i class="fa-solid fa-check"></i></span>':''}</p>
                        <p>${element.others.views}</p>
                    </div>
                </div>
            `
            
            cardContainer.appendChild(div);
        })

    }
}

//sort by views
const sortByViews = () => {
    const cardContainer = document.getElementById('card-container');
    const cardCollection = document.querySelectorAll('.card');
    const cardArray = Array.from(cardCollection);
    cardArray.sort((first, second) => {
        const a = parseFloat(first.getAttribute('views'));
        const b = parseFloat(second.getAttribute('views'));
        return b - a;
    });
    if (document.getElementById('oops') === null) {
        cardContainer.innerHTML = '';
        cardArray.forEach(card => {
            cardContainer.appendChild(card);
        })
    }
}
loadAllCategory();
handleCategoryClick('1000');