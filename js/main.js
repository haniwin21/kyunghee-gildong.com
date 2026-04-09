/* ============================================
   경희길동한의원 메인 JavaScript
   페이지 전환 및 공통 동작 담당
   ============================================ */

// 페이지 목록 (pages/ 폴더의 파일명)
const PAGES = ['home', 'about', 'treatments', 'blog', 'blog-insomnia'];

// 페이지 HTML 캐시
const pageCache = {};

// 현재 페이지
let currentPage = 'home';

/**
 * 페이지 전환 함수
 * 사용: showPage('home') / showPage('about') 등
 */
async function showPage(name) {
  const container = document.getElementById('page-container');

  // 캐시에 없으면 fetch로 불러오기
  if (!pageCache[name]) {
    try {
      const res = await fetch(`pages/${name}.html`);
      pageCache[name] = await res.text();
    } catch (e) {
      console.error('페이지 로드 실패:', name, e);
      return;
    }
  }

  container.innerHTML = pageCache[name];
  currentPage = name;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

/**
 * 홈 페이지의 특정 섹션으로 이동
 * 사용: goToSection('visit')
 */
async function goToSection(id) {
  await showPage('home');
  setTimeout(() => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, 150);
}

// 스크롤 시 네비게이션 그림자
window.addEventListener('scroll', function () {
  const nav = document.getElementById('mainNav');
  if (nav) nav.style.boxShadow = window.scrollY > 40 ? '0 4px 20px rgba(30,58,47,.1)' : 'none';
});

// 첫 로드 시 홈 페이지 표시
document.addEventListener('DOMContentLoaded', () => {
  showPage('home');
});
