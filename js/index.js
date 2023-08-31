const handleCategory= async() =>{
    const res= await fetch("https://openapi.programming-hero.com/api/videos/categories");
    const data= await res.json();

    const listCategory= document.getElementById('list-category');
    data.data.forEach((category) => {
        const div = document.createElement("div");
        div.innerHTML=`
        <a onclick="handleLoadCategory('${category.category_id}')" class="tab bg-gray-300 text-black rounded">${category.category}</a> 
        `;
        listCategory.appendChild(div);
        console.log(data);
    });
};

    //loading category
    const handleLoadCategory= async (categoryId) =>{
        const res= await fetch(`https://openapi.programming-hero.com/api/videos/category/${categoryId}`);
        const data= await res.json();
        console.log(data);

        const cardContainer=document.getElementById('card-container');
        const cardSection=document.getElementById('card-section');
        cardContainer.innerHTML="";
        if (data.status) {
        cardContainer.classList.remove("grid");
        cardContainer.classList.add("grid");
        data.data.forEach((video)=>{

            const div=document.createElement('div');
            const time= video.others.posted_date;
            const second=time%60;
            const time1=(time-second)/60;
            const min= time1%60;
            const time2=(time1-min)/60;
            const hour= time2%60;
    
            div.innerHTML=`
            <div class="card bg-base-100 h-78">
            <figure><img class="rounded-xl h-40 w-full relative" src=${video.thumbnail}/></figure>
            ${time !== ''? 
                `<div class="absolute bottom-40 right-2 bg-black rounded ">
                <h1 class="text-white px-1 text-xs">${hour}hrs ${min} min ago</h1>
                </div>`
                : ' '}
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
    }
    else{
        cardContainer.classList.remove("grid");
        cardContainer.innerHTML = 
            `<div class="flex flex-col justify-center mt-28">
            <img class="w-64 m-auto" src="images/Icon.png">
            <h1 class="text-6xl font-bold my-2 text-center w-78">Oops!! Sorry, There is no content here</h1>
            </div>
            `;
    }
    };


handleCategory();
handleLoadCategory(1000);
