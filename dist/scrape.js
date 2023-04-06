"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PORT = 8000;
const axios = require('axios');
const cheerio = require('cheerio');
const express = require('express');
const app = express();
const path = require("path");
const cors = require('cors');
app.use(cors());
app.use(express.json());
const fs_1 = __importDefault(require("fs"));
const url = 'https://www.bookswagon.com/lifestyle-books';
const category = "Lifestyle";
app.get('/', function (req, res) {
    res.json('This is my webscraper');
});
app.get('/results', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const html = yield axios.get(url);
        const $ = cheerio.load(html.data);
        const books = [];
        const bookLinks = $(".cover>a");
        for (const bookLink of bookLinks) {
            const href = $(bookLink).attr('href');
            const bookHtml = yield axios.get(href);
            const $book = cheerio.load(bookHtml.data);
            const book = {
                title: "", authors: [], imgUrl: "", summary: "", category: "",
                details: {
                    isbn10: "",
                    isbn13: "",
                    weight: "",
                    width: "",
                    height: "",
                    pages: 0,
                },
                publisher: "", releaseDate: new Date, price: 0
            };
            book.title = $book(".productbrief>h1").text();
            const authors = [];
            for (let i = 1; i <= 5; ++i) {
                const authorLabel = $book('label#ctl00_phBody_ProductDetail_lblAuthor' + i + '>a');
                const author = authorLabel.text();
                if (author)
                    authors.push(author);
            }
            book.authors = authors;
            book.summary = $book("#aboutbook").text().replace("About the Book", "").trim();
            book.category = category;
            book.details = {
                isbn10: $book('li:contains("ISBN-10: ")').text().replace("ISBN-10: ", "").trim(),
                isbn13: $book('li:contains("ISBN-13: ")').text().replace("ISBN-13: ", "").trim(),
                weight: $book('li:contains("Weight: ")').text().replace("Weight: ", "").trim(),
                width: $book('li:contains("Width: "):not(:contains("Spine Width:"))').text().replace("Width: ", "").trim(),
                height: $book('li:contains("Height: ")').text().replace("Height: ", "").trim(),
                pages: parseInt($book('li:contains("No of Pages: ")').text().replace("No of Pages: ", "").trim())
            };
            book.publisher = $book("#ctl00_phBody_ProductDetail_lblPublisher").text().replace(" | Publisher: ", "").trim();
            book.releaseDate = $book("#ctl00_phBody_ProductDetail_lblRelease").text().replace(" | Released: ", "").trim();
            const exchangeRateFromINRToUSD = 0.12;
            book.price = Math.floor(parseInt($book(".actualprice>label").text().replace(/[^0-9]/g, "").trim()) * exchangeRateFromINRToUSD);
            const imgUrl = $book("#ctl00_phBody_ProductDetail_imgProduct").attr("src");
            book.imgUrl = imgUrl;
            // const imageResponse = await axios.get(imgUrl, { responseType: 'arraybuffer' })
            //     // .then((response: any) => {
            //     // })
            //     .catch((error: any) => {
            //        console.log(book.imageName, imgUrl, error.message);
            //     });
            // const extension = imgUrl.split('.').pop();
            // book.imageName += `.${extension}`;
            // const filePath = `book-images/${book.imageName}`;
            // fs.writeFileSync(filePath, imageResponse.data);
            books.push(book);
            console.log(books.length, bookLinks.length);
        }
        ;
        fs_1.default.appendFile('books.json', JSON.stringify(books) + '\n', (err) => {
            if (err)
                throw err;
            res.json(books);
        });
    }
    catch (err) {
        console.log(err);
    }
}));
app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
