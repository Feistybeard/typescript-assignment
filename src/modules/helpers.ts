import { Book } from "./interfaces.js";
import { getBooks } from "./api.js";

const allEl = {
  bookListEl: document.querySelector('.book-list'),
  bookInfoOverlayEl: document.querySelector('.book-info__overlay'),
  bookInfoTitleEl: document.querySelector('.book-details__title'),
  bookInfoAuthorEl: document.querySelector('.book-details__author'),
  bookInfoDescEl: document.querySelector('.book-details__description'),
  bookInfoRatingEl: document.querySelector('.book-stats__rating'),
  bookInfoYearEl: document.querySelector('.book-stats__published-date'),
  bookInfoPagesEl: document.querySelector('.book-stats__page-count'),
  bookInfoPublisherEl: document.querySelector('.book-stats__publisher'),
  bookInfoCloseBtn: document.querySelector('.book-info-overlay__close-btn'),
  librarySearchBtn: document.querySelector('.library-search__btn') as HTMLButtonElement,
  librarySearchInput: document.getElementById('library-search__input')  as HTMLInputElement
};

async function start():Promise<void> {
  const booksData:Book[] = await getBooks();
  const booksDataResult = booksData.map((book:Book) => {
    return `
      <li class='book' style='
          background: linear-gradient(208.29deg, rgba(255, 255, 255, 0.5) 0%, rgba(255, 255, 255, 0) 92.13%), ${book.color};,
          border-radius: 2px;, 
          box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);,
        '
        data-id=${book.id}>
        <h2 class='book-title'>${book.title}</h2>
        <p class='book-author'>By: ${book.author}</p>
      </li>
    `
  });
  
  if(allEl.bookListEl){
    allEl.bookListEl.innerHTML = booksDataResult.join('');
  }
  
  addEventListeners();
}

async function addEventListeners():Promise<void> {
  const booksData:Book[] = await getBooks();
  const allBookEl = document.querySelectorAll('.book');
  allBookEl.forEach(book => {
    book.addEventListener('click', showMoreInfo)
  });
  
  allEl.bookInfoCloseBtn?.addEventListener('click', () => {
    allEl.bookInfoOverlayEl?.classList.toggle('show');
  });

  allEl.librarySearchBtn.addEventListener('click', () => {
    if (!allEl.librarySearchInput.value || allEl.librarySearchInput.value.length < 3) {
      alert('Type at least 3 characters to search!');
      return;
    }
    const searchInput:string = allEl.librarySearchInput.value;
    const searchResult = booksData.filter(book => {
      return book.title.toLowerCase().includes(searchInput.toLowerCase());
    });

    if (searchResult.length === 0) {
      alert('Book not found!');
      return;
    }

    showMoreInfo(null, searchResult[0].id);
    allEl.librarySearchInput.value = '';
  });
}

async function showMoreInfo(e:Event, id?:number):Promise<void> {
  const booksData:Book[] = await getBooks();
  if (id){
    booksData.forEach(book => {
      if (book.id === id) {
        allEl.bookInfoTitleEl.textContent =`${book.title}`;
        allEl.bookInfoAuthorEl.textContent = `${book.author}`;
        allEl.bookInfoDescEl.textContent = `${book.plot}`
        allEl.bookInfoRatingEl.textContent = `Audience: ${book.audience}`;
        allEl.bookInfoYearEl.textContent = `First Published: ${book.year.toString()}`;
        allEl.bookInfoPagesEl.textContent = `Pages: ${book.pages?.toString()}`;
        if (!book.pages) allEl.bookInfoPagesEl.textContent = `Pages: Missing Data`;
        allEl.bookInfoPublisherEl.textContent = `Publisher: ${book.publisher}`;
      }
    });
    allEl.bookInfoOverlayEl.classList.toggle('show');
    return;
  }

  const book:HTMLElement = e.target as HTMLElement;
  let bookId:number = 0;
  
  if (book.parentNode.nodeName === 'LI'){
    bookId = parseInt(book.parentElement.dataset.id);
  } else {
    bookId = parseInt(book.dataset.id);
  }

  booksData.forEach(book => {
    if (book.id === bookId) {
      allEl.bookInfoTitleEl.textContent =`${book.title}`;
      allEl.bookInfoAuthorEl.textContent = `${book.author}`;
      allEl.bookInfoDescEl.textContent = `${book.plot}`
      allEl.bookInfoRatingEl.textContent = `Audience: ${book.audience}`;
      allEl.bookInfoYearEl.textContent = `First Published: ${book.year.toString()}`;
      allEl.bookInfoPagesEl.textContent = `Pages: ${book.pages?.toString()}`;
      if (!book.pages) allEl.bookInfoPagesEl.textContent = `Pages: Missing Data`;
      allEl.bookInfoPublisherEl.textContent = `Publisher: ${book.publisher}`;
    }
  });
    
  allEl.bookInfoOverlayEl.classList.toggle('show');
}

export { start };