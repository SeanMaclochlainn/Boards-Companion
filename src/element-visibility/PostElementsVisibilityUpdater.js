export { PostElementsVisibilityUpdater }

import { ElementFinder } from "../finders/ElementFinder.js";
import { AvatarElementFinder } from "../finders/AvatarElementFinder.js";
import { ElementVisibilityUpdater } from "./ElementVisibilityUpdater.js";
import { ElementRemover } from "../ElementRemover.js";

class PostElementsVisibilityUpdater {

    constructor() {
        this.elementFinder = new ElementFinder();
        this.avatarElementFinder = new AvatarElementFinder();
        this.elementVisibilityUpdater = new ElementVisibilityUpdater();
        this.elementRemover = new ElementRemover();
    }

    hideEachPostsElements() {
        this._hideEachPostsAvatarInfo();
        this._hideEachPostsFooter();
    }

    hidePostElements(post) {
        this._hidePostAvatarInfo(post);
        this._hidePostFooter(post);
    }

    showPostElements(post) {
        this._showPostAvatarInfo(post);
        this._showPostFooter(post);
    }

    _hideEachPostsAvatarInfo() {
        for (let post of this.elementFinder.getAllPosts()) {
            this._hidePostAvatarInfo(post);
        }
    }

    _hidePostAvatarInfo(post) {
        this._removeAvatarInfoElements(post);
        this.elementVisibilityUpdater.hideElements(this.avatarElementFinder.getHideableElements(post));
    }

    _removeAvatarInfoElements(post) {
        let elementsForRemoval = this.avatarElementFinder.getElementsForRemoval(post);
        this.elementRemover.removeElements(elementsForRemoval);
    }

    _showPostAvatarInfo(post) {
        this.elementVisibilityUpdater.showElements(this.avatarElementFinder.getHideableElements(post));
    }

    _hideEachPostsFooter() {
        for (let post of this.elementFinder.getAllPosts()) {
            this.elementVisibilityUpdater.hideElement(this.elementFinder.getFooterElementFromPost(post));
        }
    }

    _hidePostFooter(post) {
        this.elementVisibilityUpdater.hideElement(this.elementFinder.getFooterElementFromPost(post));
    }

    _showPostFooter(post) {
        this.elementVisibilityUpdater.showElement(this.elementFinder.getFooterElementFromPost(post));
    }
}