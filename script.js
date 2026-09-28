/* ============================================
   1. DỮ LIỆU TÀI LIỆU
   ── Thêm link shopee và drive thật của bạn vào đây
============================================= */
const documentData = [
  {
    id: 1,
    icon: "🇬🇧",
    tag: "IELTS",
    title: "lộ trình chinh phục tiếng anh toàn diện",
    description: "Trọn bộ file PDF + Audio kèm giải chi tiết từ Cam 1 đến Cam 18.",
    shopeeLink: "https://s.shopee.vn/80BYeyef0W",
    driveLink: "https://drive.google.com/drive/folders/1lUrJaSzeAIziWK0b3TrHRNlGZdzdQvh2"
  },
  {
    id: 2,
    icon: "🎯",
    tag: "TOEIC",
    title: "khóa học ielts toeic free",
    description: "Bộ đề thi thử ETS định dạng mới nhất kèm đáp án và script nghe.",
    shopeeLink: "https://s.shopee.vn/2LXBue1J5D",
    driveLink: "https://docs.google.com/spreadsheets/d/1fc2eKrk431PPKtebbHNv8s0X3jMzKQaTOxEw1PxM9PY/edit?usp=drivesdk"
  },
  {
    id: 3,
    icon: "🇨🇳",
    tag: "Tiếng anh",
    title: "21 ngày xây nền tảng tiếng anh",
    description: "Trọn bộ sách giáo khoa",
    shopeeLink: "https://s.shopee.vn/8AUyrSuPcN",
    driveLink: "https://drive.google.com/file/d/12yiykeroQH-hjkN4O0823nDwxJGv-tSy/view?usp=drivesdk"
  },
  {
    id: 4,
    icon: "✍️",
    tag: "IELTS",
    title: "tài liệu ôn thi B1,B2",
    description: "Tổng hợp bài mẫu band 9.0 và mẹo làm bài từ cựu giám khảo Simon.",
    shopeeLink: "https://s.shopee.vn/20uLWDpp4U",
    driveLink: "https://drive.google.com/drive/folders/1W9C1w8Ag2j5u20suxXxqBfvlOYtsELOG"
  },
  {
    id: 5,
    icon: "⛩️",
    tag: "HSK",
    title: "Tổng hợp 5000 Từ Vựng HSK 1",
    description: "File Excel/PDF 5000 từ vựng HSK có ví dụ, phiên âm (Pinyin) chi tiết.",
    shopeeLink: "https://s.shopee.vn/50Xx4e0qrc",
    driveLink: "https://docs.google.com/spreadsheets/d/13uLlJ2_70EVzZR0A8krXuCObpWZ2mhNu/edit?gid=1523521821#gid=1523521821"
  },
  {
    id: 6,
    icon: "🗣️",
    tag: "HSK",
    title: "Bộ đề dự đoán Speaking Quý mới",
    description: "Bộ đề dự đoán IELTS Speaking Part 1, 2, 3 mới nhất kèm câu trả lời mẫu.",
    shopeeLink: "https://s.shopee.vn/2Vqc6BjqD6",
    driveLink: "https://docs.google.com/spreadsheets/d/1gCC0_cm_dAUnEExKXg0jhhBRHvx1ymuB/edit?gid=943091278#gid=943091278"
  },
  {
    id: 7,
    icon: "🎧",
    tag: "HSK",
    title: "Từ vựng HSK 3",
    description: "Sách ôn luyện chuyên sâu Hacker TOEIC đầy đủ Reading và Listening.",
    shopeeLink: "https://s.shopee.vn/3qLzgjlgty",
    driveLink: "https://docs.google.com/spreadsheets/d/10ByW67avQu2MBAKK64NzisESUAyVL1or/edit?gid=1424247076#gid=1424247076"
  },
  {
    id: 8,
    icon: "📝",
    tag: "HSK",
    title: "Bộ Đề Thi Thử HSK 4, 5, 6",
    description: "Tổng hợp đề thi thật và thi thử các kỳ thi HSK cấp cao kèm đáp án.",
    shopeeLink: "https://s.shopee.vn/6L4FNcKSfR",
    driveLink: "https://drive.google.com/link-cua-ban"
  },
    {
    id: 9,
    icon: "🇬🇧",
    tag: "Lấy gốc cô Mai Phuong",
    title: "lộ trình chinh phục tiếng anh toàn diện",
    description: "Trọn bộ file PDF + Audio kèm giải chi tiết từ .",
    shopeeLink: "https://s.shopee.vn/80BYeyef0W",
    driveLink: "https://drive.google.com/drive/folders/1zcY0krZaWtb7LQM20bLE_PJzqFHaJJCa?usp=drive_link"
  },
   id: 10,
    icon: "🇬🇧",
    tag: "4000 từ vựng trọng tâm",
    title: "lộ trình chinh phục tiếng anh toàn diện",
    description: "Trọn bộ file PDF + Audio kèm giải chi tiết từ .",
    shopeeLink: "https://s.shopee.vn/80BYeyef0W",
    driveLink: "https://drive.google.com/drive/folders/1zcY0krZaWtb7LQM20bLE_PJzqFHaJJCa?usp=drive_link"
  }
];

/* ============================================
   2. RENDER CARDS
============================================= */
function renderCards(data) {
  const grid = document.getElementById('docGrid');
  const countEl = document.getElementById('resultCount');
  const noResults = document.getElementById('noResults');

  grid.innerHTML = ''; 

  if (data.length === 0) {
    noResults.classList.remove('hidden');
    countEl.textContent = '';
    return;
  }

  noResults.classList.add('hidden');
  countEl.textContent = `Hiển thị ${data.length} tài liệu`;

  data.forEach((doc, index) => {
    const card = document.createElement('div');
    card.className = 'doc-card';
    card.style.transitionDelay = `${index * 60}ms`;
    card.innerHTML = `
      <span class="card-icon">${doc.icon}</span>
      <span class="card-tag">${doc.tag}</span>
      <h3 class="card-title">${doc.title}</h3>
      <p class="card-desc">${doc.description}</p>
      <button class="btn btn-card" data-id="${doc.id}">
        📖 Xem tài liệu
      </button>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('.btn-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      const doc = documentData.find(d => d.id === id);
      if (doc) openModal(doc);
    });
  });

  observeCards();
}

/* ============================================
   3. TÌM KIẾM REALTIME
============================================= */
document.getElementById('searchInput').addEventListener('input', function () {
  const q = this.value.toLowerCase().trim();
  const filtered = q
    ? documentData.filter(d =>
        d.title.toLowerCase().includes(q) ||
        d.tag.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q)
      )
    : documentData;
  renderCards(filtered);
});

/* ============================================
   4. SCROLL REVEAL 
============================================= */
function observeCards() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.doc-card').forEach(card => observer.observe(card));
}

/* ============================================
   5. TYPING EFFECT (Đã sửa phù hợp)
============================================= */
const typedEl = document.getElementById('typedText');
const phrases = [
  'Luyện thi IELTS 8.0+',
  'Chinh phục TOEIC 900',
  'Ôn thi HSK cấp tốc',
  'Luôn cập nhật mới nhất!',
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    typedEl.textContent = currentPhrase.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentPhrase.length) {
      setTimeout(() => { isDeleting = true; typeLoop(); }, 1800);
      return;
    }
  } else {
    typedEl.textContent = currentPhrase.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  const speed = isDeleting ? 45 : 80;
  setTimeout(typeLoop, speed);
}
setTimeout(typeLoop, 800);

/* ============================================
   6. MODAL / CONTENT LOCKER
============================================= */
const overlay    = document.getElementById('modalOverlay');
const btnClose   = document.getElementById('modalClose');
const step1      = document.getElementById('step1');
const step2      = document.getElementById('step2');
const step3      = document.getElementById('step3');
const shopeeBtn  = document.getElementById('shopeeBtn');
const driveBtnFinal = document.getElementById('driveBtnFinal');
const modalDocName  = document.getElementById('modalDocName');

let shopeeClicked = false;

function openModal(doc) {
  shopeeClicked = false;
  showStep(1);
  modalDocName.textContent = doc.title;
  shopeeBtn.href = doc.shopeeLink;
  driveBtnFinal.href = doc.driveLink;
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden'; 
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
}

function showStep(n) {
  step1.classList.toggle('hidden', n !== 1);
  step2.classList.toggle('hidden', n !== 2);
  step3.classList.toggle('hidden', n !== 3);
}

shopeeBtn.addEventListener('click', () => {
  if (shopeeClicked) return; 
  shopeeClicked = true;
  showStep(2);
  const delay = Math.floor(Math.random() * 2000) + 3000; 
  setTimeout(() => {
    showStep(3);
  }, delay);
});

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

renderCards(documentData);
