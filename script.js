/* ============================================
   1. DỮ LIỆU TÀI LIỆU
   ⚠️ Kiểm tra lại các dòng có ghi chú "KHÔNG KHỚP":
   tiêu đề / mô tả / tag / icon đang nói về các thứ khác nhau.
============================================= */
const documentData = [
  {
    id: 1,
    icon: "🇬🇧",
    tag: "IELTS",
    title: "Lộ trình chinh phục tiếng Anh toàn diện", // KHÔNG KHỚP: mô tả nói về Cam 1-18
    description: "Trọn bộ file PDF + Audio kèm giải chi tiết từ Cam 1 đến Cam 18.",
    shopeeLink: "https://s.shopee.vn/80BYeyef0W",
    driveLink: "https://drive.google.com/drive/folders/1lUrJaSzeAIziWK0b3TrHRNlGZdzdQvh2"
  },
  {
    id: 2,
    icon: "🎯",
    tag: "TOEIC",
    title: "Khóa học IELTS TOEIC free", // KHÔNG KHỚP: mô tả nói về đề ETS
    description: "Bộ đề thi thử ETS định dạng mới nhất kèm đáp án và script nghe.",
    shopeeLink: "https://s.shopee.vn/2LXBue1J5D",
    driveLink: "https://docs.google.com/spreadsheets/d/1fc2eKrk431PPKtebbHNv8s0X3jMzKQaTOxEw1PxM9PY/edit?usp=drivesdk"
  },
  {
    id: 3,
    icon: "🇬🇧", // đã đổi từ 🇨🇳 vì đây là tiếng Anh
    tag: "Tiếng Anh",
    title: "21 ngày xây nền tảng tiếng Anh",
    description: "Trọn bộ sách giáo khoa",
    shopeeLink: "https://s.shopee.vn/8AUyrSuPcN",
    driveLink: "https://drive.google.com/file/d/12yiykeroQH-hjkN4O0823nDwxJGv-tSy/view?usp=drivesdk"
  },
  {
    id: 4,
    icon: "✍️",
    tag: "IELTS",
    title: "Tài liệu ôn thi B1, B2", // KHÔNG KHỚP: mô tả nói về Writing band 9.0 / Simon
    description: "Tổng hợp bài mẫu band 9.0 và mẹo làm bài từ cựu giám khảo Simon.",
    shopeeLink: "https://s.shopee.vn/20uLWDpp4U",
    driveLink: "https://drive.google.com/drive/folders/1W9C1w8Ag2j5u20suxXxqBfvlOYtsELOG"
  },
  {
    id: 5,
    icon: "⛩️",
    tag: "HSK",
    title: "Tổng hợp 5000 từ vựng HSK 1", // KHÔNG KHỚP: HSK 1 không có 5000 từ
    description: "File Excel/PDF 5000 từ vựng HSK có ví dụ, phiên âm (Pinyin) chi tiết.",
    shopeeLink: "https://s.shopee.vn/50Xx4e0qrc",
    driveLink: "https://docs.google.com/spreadsheets/d/13uLlJ2_70EVzZR0A8krXuCObpWZ2mhNu/edit?gid=1523521821#gid=1523521821"
  },
  {
    id: 6,
    icon: "🗣️",
    tag: "IELTS", // đã sửa từ HSK vì mô tả là IELTS Speaking
    title: "Bộ đề dự đoán Speaking quý mới",
    description: "Bộ đề dự đoán IELTS Speaking Part 1, 2, 3 mới nhất kèm câu trả lời mẫu.",
    shopeeLink: "https://s.shopee.vn/2Vqc6BjqD6",
    driveLink: "https://docs.google.com/spreadsheets/d/1gCC0_cm_dAUnEExKXg0jhhBRHvx1ymuB/edit?gid=943091278#gid=943091278"
  },
  {
    id: 7,
    icon: "🎧",
    tag: "HSK",
    title: "Từ vựng HSK 3", // KHÔNG KHỚP: mô tả nói về sách Hacker TOEIC
    description: "Sách ôn luyện chuyên sâu Hacker TOEIC đầy đủ Reading và Listening.",
    shopeeLink: "https://s.shopee.vn/3qLzgjlgty",
    driveLink: "https://docs.google.com/spreadsheets/d/10ByW67avQu2MBAKK64NzisESUAyVL1or/edit?gid=1424247076#gid=1424247076"
  },
  {
    id: 8,
    icon: "📝",
    tag: "HSK",
    title: "Bộ đề thi thử HSK 4, 5, 6",
    description: "Tổng hợp đề thi thật và thi thử các kỳ thi HSK cấp cao kèm đáp án.",
    shopeeLink: "https://s.shopee.vn/6L4FNcKSfR",
    driveLink: "https://drive.google.com/link-cua-ban" // ⚠️ CHƯA THAY LINK THẬT
  }
];

/* ============================================
   TIỆN ÍCH
============================================= */
// Bỏ dấu tiếng Việt để tìm "toeic", "tu vung" vẫn ra kết quả
function normalize(str) {
  return String(str)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .trim();
}

// Chống chèn HTML khi render bằng innerHTML
function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, c => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[c]));
}

const isPlaceholderLink = url => !url || url.includes('link-cua-ban');

/* ============================================
   2. SCROLL REVEAL (tạo observer 1 lần duy nhất)
============================================= */
const revealObserver = new IntersectionObserver(
  (entries) => {
    let i = 0;
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      // Delay bằng setTimeout thay vì transitionDelay,
      // để hiệu ứng hover về sau không bị trễ
      setTimeout(() => el.classList.add('revealed'), i * 60);
      i++;
      revealObserver.unobserve(el);
    });
  },
  { threshold: 0.1 }
);

/* ============================================
   3. RENDER CARDS
============================================= */
const grid      = document.getElementById('docGrid');
const countEl   = document.getElementById('resultCount');
const noResults = document.getElementById('noResults');

function renderCards(data) {
  grid.innerHTML = '';

  if (data.length === 0) {
    noResults.classList.remove('hidden');
    countEl.textContent = '';
    return;
  }

  noResults.classList.add('hidden');
  countEl.textContent = `Hiển thị ${data.length} tài liệu`;

  data.forEach(doc => {
    const card = document.createElement('div');
    card.className = 'doc-card';
    card.innerHTML = `
      <span class="card-icon">${escapeHTML(doc.icon)}</span>
      <span class="card-tag">${escapeHTML(doc.tag)}</span>
      <h3 class="card-title">${escapeHTML(doc.title)}</h3>
      <p class="card-desc">${escapeHTML(doc.description)}</p>
      <button type="button" class="btn btn-card">📖 Xem tài liệu</button>
    `;
    // Gắn sự kiện trực tiếp, không cần data-id + find lại
    card.querySelector('.btn-card').addEventListener('click', () => openModal(doc));
    grid.appendChild(card);
    revealObserver.observe(card);
  });
}

/* ============================================
   4. TÌM KIẾM REALTIME
============================================= */
document.getElementById('searchInput').addEventListener('input', function () {
  const q = normalize(this.value);
  const filtered = q
    ? documentData.filter(d =>
        normalize(d.title).includes(q) ||
        normalize(d.tag).includes(q) ||
        normalize(d.description).includes(q)
      )
    : documentData;
  renderCards(filtered);
});

/* ============================================
   5. TYPING EFFECT
============================================= */
const typedEl = document.getElementById('typedText');
const phrases = [
  'Luyện thi IELTS 8.0+',
  'Chinh phục TOEIC 900',
  'Ôn thi HSK cấp tốc',
  'Luôn cập nhật mới nhất!'
];
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeLoop() {
  const currentPhrase = phrases[phraseIndex];

  if (!isDeleting) {
    charIndex++;
    typedEl.textContent = currentPhrase.slice(0, charIndex);
    if (charIndex === currentPhrase.length) {
      isDeleting = true;
      setTimeout(typeLoop, 1800); // dừng lại cho người đọc
      return;
    }
  } else {
    charIndex--;
    typedEl.textContent = currentPhrase.slice(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
  }

  setTimeout(typeLoop, isDeleting ? 45 : 80);
}
if (typedEl) setTimeout(typeLoop, 800);

/* ============================================
   6. MODAL / CONTENT LOCKER
============================================= */
const overlay       = document.getElementById('modalOverlay');
const btnClose      = document.getElementById('modalClose');
const step1         = document.getElementById('step1');
const step2         = document.getElementById('step2');
const step3         = document.getElementById('step3');
const shopeeBtn     = document.getElementById('shopeeBtn');
const driveBtnFinal = document.getElementById('driveBtnFinal');
const modalDocName  = document.getElementById('modalDocName');

let shopeeClicked = false;
let unlockTimer = null; // ✅ lưu timer để huỷ khi đóng/mở lại modal

// Link mở tab mới, an toàn
[shopeeBtn, driveBtnFinal].forEach(a => {
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
});

function clearUnlockTimer() {
  if (unlockTimer) {
    clearTimeout(unlockTimer);
    unlockTimer = null;
  }
}

function openModal(doc) {
  clearUnlockTimer();
  shopeeClicked = false;
  showStep(1);
  modalDocName.textContent = doc.title;

  shopeeBtn.href = doc.shopeeLink;

  // Link Drive chưa điền thì không cho mở link giả
  if (isPlaceholderLink(doc.driveLink)) {
    driveBtnFinal.removeAttribute('href');
    driveBtnFinal.classList.add('disabled');
    driveBtnFinal.textContent = 'Tài liệu đang được cập nhật';
  } else {
    driveBtnFinal.href = doc.driveLink;
    driveBtnFinal.classList.remove('disabled');
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  clearUnlockTimer(); // ✅ tránh lỗi timer cũ nhảy sang bước 3 của lần mở sau
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
  unlockTimer = setTimeout(() => {
    unlockTimer = null;
    showStep(3);
  }, delay);
});

btnClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => {
  if (e.target === overlay) closeModal();
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && overlay.classList.contains('active')) closeModal();
});

// Khởi chạy khi load
renderCards(documentData);
