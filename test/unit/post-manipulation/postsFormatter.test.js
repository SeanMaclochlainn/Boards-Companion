import { PostsFormatter } from "../../../src/post-manipulation/PostsFormatter.js";
import { TestThreadPageBuilder } from "../test-environment/html-builders/TestThreadPageBuilder.js";
import { PostElementFinder } from "../../../src/finders/PostElementFinder.js"
import { AvatarElementFinder } from "../../../src/finders/AvatarElementFinder.js"

let postsFormatter = new PostsFormatter();
let testThreadPageBuilder = new TestThreadPageBuilder();
let postElementFinder = new PostElementFinder();
let avatarElementFinder = new AvatarElementFinder();

it('test highlight users posts', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(3).buildPage();

    postsFormatter.tagUsersPosts({ username: "testusername", colour: "red" });

    let firstPost = postElementFinder.getFirstPost();
    let userTagElement = avatarElementFinder.getUserTagElementFromPost(firstPost);
    expect(userTagElement.style.backgroundColor).toBe('red');
})

it('test old tag element is removed when new tag added', () => {
    document.body.innerHTML = testThreadPageBuilder.withMultiplePosts(3).buildPage();

    postsFormatter.tagUsersPosts({ username: "testusername", colour: "red" });
    postsFormatter.tagUsersPosts({ username: "testusername", colour: "green" });

    let firstPost = postElementFinder.getFirstPost();
    let userTagElement = avatarElementFinder.getUserTagElementFromPost(firstPost);
    expect(userTagElement.style.backgroundColor).toBe('green');
})