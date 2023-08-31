console.log('Yea Allah, Save My Mom');
//load all category and show the list of category
const loadAllCategory = async ()=>{
    const response = await fetch('https://openapi.programming-hero.com/api/videos/categories');
    const allCategory = await response.json();
    const categoryList = allCategory.data;
    const categoryListContainer = document.getElementById('category-list-container');
    categoryList.forEach(element =>{
        const categoryBtn = document.createElement('button');
        categoryBtn.setAttribute('onclick', `handleCategoryClick(${element.category_id})`)
        categoryBtn.classList = 'px-3 py-2 bg-[#25252526] rounded-lg font-medium text-sm md:text-lg active:bg-[#FF1F3D] active:text-white';
        categoryBtn.innerText = `${element.category}`;
        categoryListContainer.appendChild(categoryBtn);
    })
    console.log(categoryList);
}

//handle click on category and show all the data card related to the category
const handleCategoryClick = async (id) =>{
    const response = await fetch(`https://openapi.programming-hero.com/api/videos/category/${id}`);
    const data = await response.json();
    console.log(data);
}

loadAllCategory();