var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    librarySearchBtn: document.querySelector('.library-search__btn'),
    librarySearchInput: document.getElementById('library-search__input')
};
function start() {
    return __awaiter(this, void 0, void 0, function* () {
        const booksData = yield getBooks();
        const booksDataResult = booksData.map((book) => {
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
    `;
        });
        if (allEl.bookListEl) {
            allEl.bookListEl.innerHTML = booksDataResult.join('');
        }
        addEventListeners();
    });
}
function addEventListeners() {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        const booksData = yield getBooks();
        const allBookEl = document.querySelectorAll('.book');
        allBookEl.forEach(book => {
            book.addEventListener('click', showMoreInfo);
        });
        (_a = allEl.bookInfoCloseBtn) === null || _a === void 0 ? void 0 : _a.addEventListener('click', () => {
            var _a;
            (_a = allEl.bookInfoOverlayEl) === null || _a === void 0 ? void 0 : _a.classList.toggle('show');
        });
        allEl.librarySearchBtn.addEventListener('click', () => {
            if (!allEl.librarySearchInput.value || allEl.librarySearchInput.value.length < 3) {
                alert('Type at least 3 characters to search!');
                return;
            }
            const searchInput = allEl.librarySearchInput.value;
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
    });
}
function showMoreInfo(e, id) {
    return __awaiter(this, void 0, void 0, function* () {
        const booksData = yield getBooks();
        if (id) {
            booksData.forEach(book => {
                var _a;
                if (book.id === id) {
                    allEl.bookInfoTitleEl.textContent = `${book.title}`;
                    allEl.bookInfoAuthorEl.textContent = `${book.author}`;
                    allEl.bookInfoDescEl.textContent = `${book.plot}`;
                    allEl.bookInfoRatingEl.textContent = `Audience: ${book.audience}`;
                    allEl.bookInfoYearEl.textContent = `First Published: ${book.year.toString()}`;
                    allEl.bookInfoPagesEl.textContent = `Pages: ${(_a = book.pages) === null || _a === void 0 ? void 0 : _a.toString()}`;
                    if (!book.pages)
                        allEl.bookInfoPagesEl.textContent = `Pages: Missing Data`;
                    allEl.bookInfoPublisherEl.textContent = `Publisher: ${book.publisher}`;
                }
            });
            allEl.bookInfoOverlayEl.classList.toggle('show');
            return;
        }
        const book = e.target;
        let bookId = 0;
        if (book.parentNode.nodeName === 'LI') {
            bookId = parseInt(book.parentElement.dataset.id);
        }
        else {
            bookId = parseInt(book.dataset.id);
        }
        booksData.forEach(book => {
            var _a;
            if (book.id === bookId) {
                allEl.bookInfoTitleEl.textContent = `${book.title}`;
                allEl.bookInfoAuthorEl.textContent = `${book.author}`;
                allEl.bookInfoDescEl.textContent = `${book.plot}`;
                allEl.bookInfoRatingEl.textContent = `Audience: ${book.audience}`;
                allEl.bookInfoYearEl.textContent = `First Published: ${book.year.toString()}`;
                allEl.bookInfoPagesEl.textContent = `Pages: ${(_a = book.pages) === null || _a === void 0 ? void 0 : _a.toString()}`;
                if (!book.pages)
                    allEl.bookInfoPagesEl.textContent = `Pages: Missing Data`;
                allEl.bookInfoPublisherEl.textContent = `Publisher: ${book.publisher}`;
            }
        });
        allEl.bookInfoOverlayEl.classList.toggle('show');
    });
}
export { start };
