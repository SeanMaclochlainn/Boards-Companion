import { AutomaticPageLoader } from "../../../src/automatic-pageloading/AutomaticPageLoader.js";
import { TestPageManipulator } from "../test-environment/TestPageManipulator.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { TestForumPageBuilder } from "../test-environment/html-builders/TestForumPageBuilder.js";

let automaticPageLoader;
let testPageManipulator = new TestPageManipulator();
let testThreadPageBuilder = null;
let testForumPageBuilder = null;

let xhrOpenMock;
beforeEach(() => {
    mockXmlHttpRequest();
    automaticPageLoader = new AutomaticPageLoader();
    testThreadPageBuilder = new TestThreadPageBuilder();
    testForumPageBuilder = new TestForumPageBuilder();
});

it('test page 2 url loaded', () => {
    testPageManipulator.loadThreadUrl();
    document.body.innerHTML = testThreadPageBuilder.buildPage();

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=2");
})

it('test starting on page 2', () => {
    testPageManipulator.loadNthThreadUrl(2);
    document.body.innerHTML = testThreadPageBuilder.specificPage(2, 3).buildPage();

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=3");
})

it('test next page isnt loaded when on last page', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(2, 2).buildPage();

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0]).toBe(undefined);
})

it('test previous page isnt loaded when on first page', () => {
    document.body.innerHTML = testThreadPageBuilder.specificPage(1, 1).buildPage();

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0]).toBe(undefined);
})

it('get next page url from nnth page', () => {
    testPageManipulator.loadNthThreadUrl(2);
    document.body.innerHTML = testThreadPageBuilder.specificPage(11, 20).buildPage();

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=12");
})

it('test previous page url loaded', () => {
    testPageManipulator.loadThreadUrl();
    document.body.innerHTML = testThreadPageBuilder.specificPage(5, 5).buildPage();

    triggerPreviousPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/showthread.php?t=1111&page=4");
})

it('test next page in forum page loaded', () => {
    testPageManipulator.loadForumPageUrl();
    document.body.innerHTML = testForumPageBuilder.buildPage();

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/forumdisplay.php?f=7&order=desc&page=2");
})

it('test previous page in forum page loaded', () => {
    testPageManipulator.loadForumPageUrl();
    document.body.innerHTML = testForumPageBuilder.specificPage(2, 2).buildPage();

    triggerPreviousPageLoad();

    expect(xhrOpenMock.mock.calls[0][1]).toBe("https://www.boards.ie/vbulletin/forumdisplay.php?f=7&order=desc&page=1");
})


it('ensure no autoscrolling on non autoscrolling page', () => {
    testPageManipulator.loadNonAutoscrollPage();

    triggerNextPageLoad();

    expect(xhrOpenMock.mock.calls.length).toBe(0);
})

function triggerNextPageLoad() {
    testPageManipulator.setScrollPosition(10);
    automaticPageLoader.autoScrollPages(true);
    testPageManipulator.triggerScrollEvent();
}

function triggerPreviousPageLoad() {
    testPageManipulator.setScrollPosition(0);
    automaticPageLoader.autoScrollPages();
}

function mockXmlHttpRequest() {
    xhrOpenMock = jest.fn();
    const xhrMock = () => ({
        open: xhrOpenMock,
        send: jest.fn()
    })
    window.XMLHttpRequest = jest.fn().mockImplementation(xhrMock);
}