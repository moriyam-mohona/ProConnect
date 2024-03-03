const loadPosts = async function () {
    const res1 = await fetch('https://openapi.programming-hero.com/api/retro-forum/posts')
    const { posts } = await res1.json();
    // const posts = data.posts;
    // console.log(posts);
    displayPosts(posts);
}
function displayPosts(posts) {
    const postContainer = document.getElementById('post-container');
    // console.log(postContainer);
    posts.forEach(posts => {
        // console.log(posts);
        const postCard = document.createElement('div');
        postCard.classList = `flex gap-5 mb-5 bg-[#F3F3F5] p-10 py-14 rounded-3xl`;
        postCard.innerHTML = `
                        <div class="avatar indicator">
                            <span class="indicator-item badge ${posts.isActive ? 'badge-success' : 'badge-error'}"></span>
                            <div class="w-16 h-16 rounded-lg">
                                <img src="${posts.image}" />
                            </div>
                        </div>
                   
                        <div>
                          
                            <div class="flex flex-row gap-5 mb-5">
                                <p>#${posts.category}</p>
                                <p>Author : ${posts.author.name}</p>
                            </div>
                            <h3 class="card-title mb-5">${posts.title}</h3>
                            <p class="mb-5">${posts.description}</p>
                            <hr class="border-dashed border-gray-400 mb-5">
                          
                            <div class="flex justify-between">
                                <!-- Icons  -->
                                <div class="flex gap-5">
                                    <div class="flex gap-2">
                                        <img src="images/msg.png" alt="">
                                        <p>${posts.comment_count}</p>
                                    </div>
                                    <div class="flex gap-2">
                                        <img src="images/eye.png" alt="">
                                        <p>${posts.view_count}</p>
                                    </div>
                                    <div class="flex gap-2">
                                        <img src="images/time.png" alt="">
                                        <p>${posts.posted_time} min</p>
                                    </div>
                                </div>
                                <div><img src="images/email 1.png" alt=""></div>
                            </div>
                        </div>
        `;
        postContainer.appendChild(postCard);
    });
}
loadPosts();

// const latestPosts = async function () {
//     const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
//     const data = await res.json();
//     for (data in )
//         console.log(data);
// }


// latestPosts();


const latestPosts = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    displayLatestPosts(data);

};

const displayLatestPosts = posts => {
    const latestPostContainer = document.getElementById('latest-post-container');

    posts.forEach(post => {
        const latestPostCard = document.createElement('div');
        latestPostCard.classList = 'card w-auto bg-base-100 shadow-xl border-solid border-2';
        latestPostCard.innerHTML = `
            <figure class="px-7 pt-7">
                <img src="${post.cover_image}" alt="Post Cover" class="rounded-xl" />
            </figure>
            <div class="card-body items-start text-start">
                <div class="flex gap-4">
                    <img src="images/calender_icon.png" alt="Calendar Icon">
                    <p>${post.author.posted_date || 'No publish date'}</p>
                </div>
                <h2 class="card-title my-3">${post.title}</h2>
                <p class="mb-3">${post.description}</p>

                <div class="card-actions">
                    <div class="avatar">
                        <div class="w-14 rounded-full">
                            <img src="${post.profile_image}" alt="Profile Image" />
                        </div>
                    </div>
                    <div>
                        <h1 class="card-title">${post.author.name}</h1>
                        ${post.author.designation ? `<p>${post.author.designation}</p>` : 'undefined'}
                    </div>
                </div>
            </div>
        `;
        latestPostContainer.appendChild(latestPostCard);
    });
};

latestPosts();
