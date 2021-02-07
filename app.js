// Book Class : represents a book
class Book {
    // book object 생성하기
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
// UI Class : Handle UI Tasks
class UI {
    static displayBooks() {
        // 테스트용 데이터
        const StoredBooks = [{
                title: 'Book One',
                author: 'John Doe',
                isbn: '3434434'
            },
            {
                title: 'Book Two',
                author: 'Jane Doe',
                isbn: '45545'
            }
        ];
        //  
        const books = StoredBooks;

        // book의 내용을 차례로 실행하기
        books.forEach((book) => UI.addBookToList(book));
    }


    static addBookToList(book) {
        // book-list아이디를 가진 것을 list로 저장
        const list = document.querySelector('#book-list');
        // tr 생성하는 것을 row로 저장
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class = "btn btn-danger btn-sm delete">X</a></td>
        `;

        // 생성한 td들을 tbody에 추가하기
        list.appendChild(row);
    }

    // 리스트 지우기
    static deleteBook(el) {
        // 엘리먼트 클래스 리스트에 delete가 들어 있으면
        if (el.classList.contains('delete')) {
            // 엘리먼트의 상위 상위를 삭제함.
            el.parentElement.parentElement.remove();
        }
    }

    //  입력값 비우기
    static clearFields() {
        document.querySelector('#title').value = ""
        document.querySelector('#author').value = ""
        document.querySelector('#isbn').value = ""
    }
}
// Store Class

// Event : display books
document.addEventListener('DOMContentLoaded', UI.displayBooks);
// Event : Add a book
document.querySelector('#book-form').addEventListener('submit', (e) => {
    // 입력후 사라짐 방지 텍스트값 유지
    e.preventDefault();

    // 입력된 값을 변수로 저장하기
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    // book오브젝트 생성하기
    const book = new Book(title, author, isbn);

    // 웹페이지에 넣기
    UI.addBookToList(book);

    // 입력폼 비우기
    UI.clearFields();
});
// Event : Remove a book
// (e)는 익명함수 
document.querySelector('#book-list').addEventListener('click', (e) => {
    // e 만 사용할 경우 윈도우의 좌표를 표시
    // e.target는 html의 엘리먼트를 반환
    UI.deleteBook(e.target)
});