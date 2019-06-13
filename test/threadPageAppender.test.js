import { TestHtmlGenerator } from "./TestHtmlGenerator.js";
import { ThreadPageAppender } from "../src/ThreadPageAppender.js";
import { ElementFinder } from "../src/ElementFinder.js";
import { ChromeStorageMocker } from "./ChromeStorageMocker.js";
import { TestEnvironmentArranger } from "./TestEnvironmentArranger.js";
import { UserTagger } from "../src/UserTagger.js";
import { TestThreadPageBuilder } from "./TestThreadPageBuilder.js";

let testHtmlGenerator = new TestHtmlGenerator();
let threadPageAppender = new ThreadPageAppender();
let elementFinder = new ElementFinder();
let chromeStorageMocker = new ChromeStorageMocker();
let testEnvironmentArranger = new TestEnvironmentArranger();
let userTagger = new UserTagger();
let testThreadPageBuilder = null;

beforeAll(() => {
    testEnvironmentArranger.InitializeEnvironment();
    chromeStorageMocker.MockGetter(true);
});

beforeEach(() => {
    testThreadPageBuilder = new TestThreadPageBuilder();
});

it('add next page successfully', () => {
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(elementFinder.getAllPosts().length).toBe(2);
})

it('insert correct page no', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.indexOf("page 2")).not.toBe(-1);
})

it('update navigator', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.outerHTML.indexOf("Page 2 of 2")).not.toBe(-1);
})

it('next page posts have compression toggling', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());
    let post = elementFinder.getAllPosts()[1];
    post.click();

    post = elementFinder.getAllPosts()[1];
    expect(elementFinder.getAvatarInfoElementsFromPost(post)[0].style.display).toBe('');
})

it('next page contains custom boards script', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(document.body.innerHTML.indexOf("Boards.load('thread')")).not.toBe(-1);
})

it('test tagging applied to next page posts', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 2).buildPage();

    userTagger.applyTagging();
    appendNextPage(testThreadPageBuilder.specificPage(2, 2).buildPage());

    expect(elementFinder.getAllTagElements().length).toBe(2);
})

function appendNextPage(pageHtml) {
    let htmlDocument = testHtmlGenerator.convertToDocument(pageHtml);
    threadPageAppender.appendNextPage(htmlDocument, true);
}

