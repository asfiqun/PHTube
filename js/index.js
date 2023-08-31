const handleCategory= async() =>{
    const res= await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data= await res.json();
    console.log(data.data);

    const listCategory= document.getElementById('list-category');
    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML=`
        <a onclick="handleLoadCategory('${category.category_id}')" class="tab bg-gray-300 text-black rounded">${category.category}</a> 
        `;
        listCategory.appendChild(div);
    });
};

    //loading category
    const handleLoadCategory= async (categoryId) =>{
        const res= await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
        const data= await res.json();

        const cardContainer=document.getElementById('card-container');
        data.data.forEach((video)=>{
            const div=document.createElement('div');
            div.innerHTML=`
            <div class="card bg-base-100 h-72">
            <figure><img class="rounded-xl h-full w-full" src=${video.thumbnail}/></figure>
            <div class="card-body px-0">
                <div class="flex">
                    <img id="author-img" class="rounded-full w-7 h-7 mr-2" src=${video.authors[0].profile_picture}>
                    <h2 id="video-title" class="font-bold font-black">
                        ${video.title}
                    </h2>
                </div>
                <div class="flex">
                    <h1 id="author-name" class="pl-9">${video.authors[0].profile_name}</h1>
                    <i id='verified-icon' class="fa-solid fa-circle-check m-1" style="color: #0751cf; ${!video.authors[0].verified ? 'display: none;' : ''}"></i>
                </div>
                <h1 class="ml-9">${video.others.views} views</h1>
            </div>
          </div>`;
          cardContainer.append(div);
        })
        
    
    };

handleCategory();
