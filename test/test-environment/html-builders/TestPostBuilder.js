export { TestPostBuilder }
import { TestCommonHtmlGenerator } from "../html-generators/TestCommonHtmlGenerator.js";
import { TestPostHtmlGenerator } from "../html-generators/TestPostHtmlGenerator.js";

class TestPostBuilder {

    constructor() {
        this.testCommonHtmlGenerator = new TestCommonHtmlGenerator();
        this.testPostHtmlGenerator = new TestPostHtmlGenerator();
        this._hasAvatarPicture = true;
        this._isModerator = false;
        this._isSignedIn = true;
    }

    withoutAvatarPicture() {
        this._hasAvatarPicture = false;
        return this;
    }

    isModerator() {
        this._isModerator = true;
        return this;
    }

    isSignedOut() {
        this._isSignedIn = false;
        return this;
    }

    build() {
        let avatarInfoFooter = this._getAvatarInfoFooter();
        let avatarInfoHeader = this._getAvatarInfoHeader();
        let postElements = avatarInfoHeader + avatarInfoFooter;
        let postContent = this.testPostHtmlGenerator.wrapPostElements(postElements);
        if (this._isSignedIn) {
            postContent = this.testPostHtmlGenerator.wrapSignedInUserPost(postContent);
        } else {
            postContent = this.testPostHtmlGenerator.wrapUnsignedInUserPost(postContent);
        }
        return postContent;
    }

    _getAvatarInfoFooter() {
        let avatarInfoFooterElements = this.testPostHtmlGenerator.getJoinDateElement();
        avatarInfoFooterElements += this.testPostHtmlGenerator.getPostsElement();
        avatarInfoFooterElements += this.testPostHtmlGenerator.getRegularLinksSection();
        if (this._isModerator) {
            avatarInfoFooterElements += this.testPostHtmlGenerator.getModLinkSection();
        }
        let avatarInfoFooter = this.testPostHtmlGenerator.wrapAvatarInfoFooterElements(avatarInfoFooterElements);
        return avatarInfoFooter;
    }

    _getAvatarInfoHeader() {
        let avatarInfoHeader = this.testPostHtmlGenerator.getUsernameElement();
        avatarInfoHeader += this.testPostHtmlGenerator.getRegisteredUserElement();
        avatarInfoHeader += this.testPostHtmlGenerator.getStarsElement();
        if (this._hasAvatarPicture) {
            avatarInfoHeader += this.testPostHtmlGenerator.getAvatarPictureElement();
        }
        return avatarInfoHeader;
    }
}