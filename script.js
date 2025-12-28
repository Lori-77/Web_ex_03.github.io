// 使用 let 允许后续添加新帖子
let postsData = [
    {
        id: 1,
        title: "一袋米要康几楼",
        image: "./img/img1.jpg",
        avatar: "./img/head1.jpg",
        author: "俄罗斯雯雯",
        likes: 520
    },
    {
        id: 2,
        title: "如何高效整理房间？告别囤积症！",
        image: "./img/img2.jpg",
        avatar: "./img/head2.jpg",
        author: "星屑漫游者",
        likes: 99
    },
    {
        id: 3,
        title: "好米！好米！好米！",
        image: "./img/img3.jpg",
        avatar: "./img/head3.jpg",
        author: "菠萝披萨辩论家",
        likes: 256
    },
    {
        id: 4,
        title: "闪耀暖暖穆夏联名~",
        image: "./img/img4.jpg",
        avatar: "./img/head4.jpg",
        author: "雾港守夜人",
        likes: 1206
    },
    {
        id: 5,
        title: "git学习链接",
        image: "./img/img5.jpg",
        avatar: "./img/head5.jpg",
        author: "量子猫罐头",
        likes: 205
    },
    {
        id: 6,
        title: "无暖！！",
        image: "./img/img6.jpg",
        avatar: "./img/head6.jpg",
        author: "午后故障集",
        likes: 124
    },
    {
        id: 7,
        title: "论我的一天",
        image: "./img/img7.jpg",
        avatar: "./img/head7.jpg",
        author: "盐焗小行星",
        likes: 56
    },
    {
        id: 8,
        title: "如果我命中真的要有一儿，我希望是香奈儿",
        image: "./img/img8.jpg",
        avatar: "./img/head8.jpg",
        author: "404notfound",
        likes: 521
    },
    {
        id: 9,
        title: "咪的天",
        image: "./img/img9.jpg",
        avatar: "./img/head9.jpg",
        author: "回声折叠处",
        likes: 42
    },
    {
        id: 10,
        title: "考试我就这样",
        image: "./img/img10.jpg",
        avatar: "./img/head10.jpg",
        author: "三十二倍速蒲公英",
        likes: 51
    },
    {
        id: 11,
        title: "我不会出轨，因为这需要两个人同时爱我",
        image: "./img/img11.jpg",
        avatar: "./img/head11.jpg",
        author: "匿名云饲养员",
        likes: 250
    },
    {
        id: 12,
        title: "漫步漫步",
        image: "./img/img12.jpg",
        avatar: "./img/head12.jpg",
        author: "离线情绪回收站",
        likes: 53
    },
    {
        id: 13,
        title: "幻梦都破碎🤜🏻🥴🤛🏻",
        image: "./img/img13.jpg",
        avatar: "./img/head13.jpg",
        author: "午夜的电路板苔藓",
        likes: 10
    },
    {
        id: 14,
        title: "是贝儿呀！",
        image: "./img/img14.jpg",
        avatar: "./img/head14.jpg",
        author: "Ctrl+Z诗人",
        likes: 66
    },
];

// 轮播图数据
const carouselData = [
    { image: './img/car1.jpg', alt: '暖暖' },
    { image: './img/car2.jpg', alt: '迪士尼' },
    { image: './img/car3.jpg', alt: '疯狂动物城' }
];

// 获取HTML
const postGrid = document.getElementById('post-grid');
const searchInput = document.querySelector('.header input[type="text"]');
// 轮播图
const track = document.getElementById('carousel-track');
const dotsContainer = document.getElementById('carousel-dots');
// 发布模态框
const publishBtn = document.querySelector('.publish-btn');
const modal = document.getElementById('publish-modal');
const closeBtn = document.querySelector('.close-btn');
const submitPostBtn = document.getElementById('submit-post-btn');
// 输入框
const titleInput = document.getElementById('post-title-input');
const authorInput = document.getElementById('post-author-input');
const imageInput = document.getElementById('post-image-input');


// 单个帖子页面
function createPostCard(post) {
    const card = document.createElement('div');
    card.classList.add('post-card');
    card.dataset.postId = post.id;

    card.innerHTML = `
        <img class="post-image" src="${post.image}" alt="${post.title}">
        
        <div class="post-content">
            <p class="post-title">${post.title}</p>
            
            <div class="post-footer">
                <div class="author-info">
                    <img class="author-avatar" src="${post.avatar}" alt="${post.author}头像">
                    <span>${post.author}</span>
                </div>
                <div class="likes">
                    <span class="like-icon" data-post-id="${post.id}">♥</span>
                    <span class="like-count" id="likes-count-${post.id}">${post.likes}</span>
                </div>
            </div>
        </div>
    `;

    // 点赞
    const likeButton = card.querySelector(`.like-icon`);

    likeButton.addEventListener('click', () => {
        const postId = parseInt(likeButton.dataset.postId);
        // 找到数据中的对应帖子
        let targetPost = postsData.find(p => p.id === postId);

        // 只允许点赞一次
        if (!likeButton.classList.contains('liked')) {
            targetPost.likes++;
            likeButton.classList.add('liked');

            // 更新视图中的点赞数
            const likeCountElement = document.getElementById(`likes-count-${postId}`);
            if (likeCountElement) {
                likeCountElement.innerHTML = targetPost.likes;
            }
        }
    });

    return card;
}

// 搜索
function renderPosts(dataToRender) {
    postGrid.innerHTML = ''; // 清空容器
    const data = dataToRender || postsData;

    if (data.length === 0) {
        postGrid.innerHTML = '<p style="text-align: center; column-span: all; color: #999;">没有找到相关帖子。</p>';
        return;
    }

    data.forEach(post => {
        const cardElement = createPostCard(post);
        postGrid.appendChild(cardElement);
    });
}

// 搜索功能
function filterPosts(keyword) {
    const lowerCaseKeyword = keyword.toLowerCase();

    const filteredData = postsData.filter(post => {
        return (post.title.toLowerCase().includes(lowerCaseKeyword) || post.author.toLowerCase().includes(lowerCaseKeyword));
    });

    renderPosts(filteredData);
}

// 搜索与交互功能模块
searchInput.addEventListener('input', (e) => {
    const keyword = e.target.value;
    filterPosts(keyword);
});

// 发布
// 1. 弹窗
publishBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// 2. 关闭弹窗
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

// 3. 确认发布
submitPostBtn.addEventListener('click', () => {

    const title = titleInput.value.trim();
    const author = authorInput.value.trim() || '匿名用户';
    const image = imageInput.value.trim();

    if (title === "") {
        alert("标题不能为空！");
        return;
    }

    const newPost = {
        id: Date.now(), // 使用时间戳作为ID，保证id不会重复
        title: title,
        image: image || "./img/default.jpg", // 默认图片
        avatar: "./img/head.jpg", // 默认头像
        author: author,
        likes: 0
    };

    // 将新帖子添加到数组的最前面
    postsData.unshift(newPost);

    // 重新渲染全部帖子，展示新内容
    renderPosts();

    // 清空输入框并关闭模态框
    titleInput.value = '';
    imageInput.value = './img/default.jpg'; // 恢复默认图片
    modal.style.display = 'none';

    // 模拟登录有以及记录数据 取数据
    const user = JSON.parse(localStorage.getItem('user') || '{"nick":"刘罗慧","regAt":"2025-06-01","posts":0,"likes":0}');
    user.posts++;
    user.likes += newPost.likes;

    // 存数据
    localStorage.setItem('user', JSON.stringify(user));
});


// 轮播图
let currentSlideIndex = 0;
let slideWidth;

function renderCarousel() {
    // 循环
    carouselData.forEach((item, index) => {
        const slide = document.createElement('div');
        slide.classList.add('carousel-slide');
        slide.innerHTML = `<img src="${item.image}" alt="${item.alt}">`;
        track.appendChild(slide);

        const dot = document.createElement('span');
        dot.classList.add('dot');
        // 点击切换图片
        dot.addEventListener('click', () => moveToSlide(index));
        dotsContainer.appendChild(dot);
    });
    updateDots(0);
}

// 圆点变色
function updateDots(index) {
    const dots = Array.from(dotsContainer.children);
    dots.forEach(dot => dot.classList.remove('active'));
    if (dots[index]) {
        dots[index].classList.add('active');
    }
}

function moveToSlide(index) {
    // 循环
    if (index < 0) {
        currentSlideIndex = carouselData.length - 1;
    } else if (index >= carouselData.length) {
        currentSlideIndex = 0;
    } else {
        currentSlideIndex = index;
    }
    // 适应屏幕大小
    const containerWidth = track.parentElement.clientWidth;

    const distance = -currentSlideIndex * containerWidth;
    track.style.transform = `translateX(${distance}px)`;

    updateDots(currentSlideIndex);
}

// 自动播放
function startAutoPlay() {
    setInterval(() => {
        moveToSlide(currentSlideIndex + 1);
    }, 3000);
}

// 页面加载入口
document.addEventListener('DOMContentLoaded', () => {
    // 1. 渲染帖子
    renderPosts();

    // 2. 渲染轮播图
    renderCarousel();

    // 3. 启动自动播放
    startAutoPlay();
});

// 循环加载帖子
let loadRound = 1;
const maxRounds = 3;

window.addEventListener('scroll', () => {
    // 判断是否滚动到底部
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100) {
        if (loadRound < maxRounds) {
            loadRound++;
            // 追加原始数据
            postsData.forEach(post => {
                const cardElement = createPostCard(post);
                postGrid.appendChild(cardElement);
            });
        } else if (loadRound === maxRounds) {
            loadRound++; // 防止重复触发
            // 显示 已经到底
            const footer = document.getElementById('footer-message');
            if (footer) {
                footer.style.display = 'block';
            }
        }
    }
});