const nextKeys = [' ', 'ArrowRight', 'Enter'];
const prevKeys = ['Backspace', 'ArrowLeft'];
const pages = ['intro.html', 'cubes.html','ace.html', 'demo.html', 'compare.html', 'thanks.html'];
const PAGE_KEY = 'page';

let curPage;

function setPage(page) {
  localStorage.setItem(PAGE_KEY, page);
}

function getPage() {
  const item = localStorage.getItem(PAGE_KEY);
  if (item) {
    return item * 1;
  }
  return 0;
}

function init() {
  curPage = getPage();

  document.addEventListener('keydown', (ev) => {
    if (nextKeys.indexOf(ev.key) >= 0) {
      nextPage();
    } else if (prevKeys.indexOf(ev.key) >= 0) {
      prevPage();
    } else if (ev.key === 'q') {
      curPage = 0;
      setPage(curPage);
      gotoPage();
    }
  });
}

function nextPage() {
  if (curPage === pages.length - 1) {
    return;
  }
  setPage(++curPage);
  gotoPage();
}

function prevPage() {
  if (curPage === 0) {
    return;
  }
  setPage(--curPage);
  gotoPage();
}
function gotoPage() {
  document.location.href = '/' + pages[curPage];
}

init();
