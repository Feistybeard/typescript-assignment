var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { getBooks } from "./modules/api.js";
import { allEl } from "./index";
// const bookListEl:HTMLElement | null = document.querySelector('.book-list');
export function showMoreInfo(e) {
    return __awaiter(this, void 0, void 0, function* () {
        const booksData = yield getBooks();
        const book = e.target;
        let bookId = 0;
        if (book.parentNode.nodeName === 'LI') {
            bookId = parseInt(book.parentElement.dataset.id);
        }
        else {
            bookId = parseInt(book.dataset.id);
        }
        booksData.forEach(e => {
            var _a;
            if (e.id === bookId) {
                allEl.bookInfoTitleEl.textContent = `${e.title}`;
                allEl.bookInfoAuthorEl.textContent = `${e.author}`;
                allEl.bookInfoDescEl.textContent = `${e.plot}`;
                allEl.bookInfoRatingEl.textContent = `Audience: ${e.audience}`;
                allEl.bookInfoYearEl.textContent = `First Published: ${e.year.toString()}`;
                allEl.bookInfoPagesEl.textContent = `Pages: ${(_a = e.pages) === null || _a === void 0 ? void 0 : _a.toString()}`;
                if (!e.pages) {
                    allEl.bookInfoPagesEl.textContent = `Pages: Missing Data`;
                }
                allEl.bookInfoPublisherEl.textContent = `Publisher: ${e.publisher}`;
            }
        });
        allEl.bookInfoOverlayEl.classList.toggle('show');
    });
}
