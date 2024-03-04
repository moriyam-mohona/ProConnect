const loadPosts = async function (searchText) {
    toggleLoadingSpinner(true);
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts${searchText ? `?category=${searchText}` : ''}`);
    const { posts } = await res.json();

    setTimeout(() => {
        displayPosts(posts);
        toggleLoadingSpinner(false);
    }, 2000);
};

function displayPosts(posts) {
    const postContainer = document.getElementById('post-container');
    postContainer.textContent = ''; // Clear previous posts

    posts.forEach(post => {
        const postCard = document.createElement('div');
        postCard.classList = `flex gap-5 mb-5 bg-[#F3F3F5] p-8 py-8 rounded-3xl`;
        postCard.innerHTML = `
            <div class="avatar indicator">
                <span class="indicator-item badge ${post.isActive ? 'badge-success' : 'badge-error'}"></span>
                <div class="w-16 h-16 lg:w-24 lg:h-24 rounded-lg">
                    <img src="${post.image}" />
                </div>
            </div>           
            <div class="w-full lg:w-[75%]">       
                <div class="flex flex-col lg:flex-row gap-5 mb-5">
                    <p class="lg:w-1/2">#${post.category}</p>
                    <p class="lg:w-1/2 lg:text-right">Author : ${post.author.name}</p>
                </div>
                <h3 class="card-title mb-5">${post.title}</h3>
                <p class="mb-5">${post.description}</p>
                <hr class="border-dashed border-gray-400 mb-5">
                <div class="flex justify-between">
                    <!-- Icons  -->
                    <div class="flex gap-5">
                        <div class="flex gap-2">
                            <img src="images/msg.png" alt="">
                            <p>${post.comment_count}</p>
                        </div>
                        <div class="flex gap-2">
                            <img src="images/eye.png" alt="">
                            <p>${post.view_count}</p>
                        </div>
                        <div class="flex gap-2">
                            <img src="images/time.png" alt="">
                            <p>${post.posted_time} min</p>
                        </div>
                    </div>
                    <button onclick="loadNotification('${post.title}', ${post.view_count})" class="notification"><img src="images/email 1.png" alt=""></button>
                </div>
            </div>
        `;
        postContainer.appendChild(postCard);
    });
}

const searchItem = () => {
    const searchInput = document.getElementById('search-field');
    const searchText = searchInput.value;
    loadPosts(searchText);
};

const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner');
    if (isLoading) {
        loadingSpinner.classList.remove('hidden');
    } else {
        loadingSpinner.classList.add('hidden');
    }
};


let notificationCount = 0;
const loadNotification = function (title, viewCount) {
    notificationCount++;
    const notificationContainer = document.getElementById('notification-container');
    const notificationElement = document.createElement('div');
    notificationElement.classList = 'flex justify-between gap-2 rounded-2xl p-3 bg-white my-3';
    notificationElement.innerHTML = `
        <p class="">${title}</p>
        <div class="flex justify-between items-center mr-5">
            <img src="images/eye.png" class="" alt="">
            <p>${viewCount}</p>
        </div>
    `;
    notificationContainer.appendChild(notificationElement);
    const markAsReadText = document.getElementById('mark-as-read-text');
    markAsReadText.innerHTML = `Mark as read<span>(${notificationCount})</span>`;
};
loadPosts();


const latestPosts = async function () {
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
                        ${post.author.designation ? `<p>${post.author.designation}</p>` : 'unknown'}
                    </div>
                </div>
            </div>
        `;
        latestPostContainer.appendChild(latestPostCard);
    });
};

latestPosts();
