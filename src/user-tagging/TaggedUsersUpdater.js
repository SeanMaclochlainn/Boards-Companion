export { TaggedUsersUpdater }
import { StorageUpdater } from "../storage/StorageUpdater.js";
import { ApplicationSettings } from "../ApplicationSettings.js";
import { StorageKeyGenerator } from "../storage/StorageKeyGenerator.js";

class TaggedUsersUpdater {
    constructor() {
        this.storageUpdater = new StorageUpdater();
        this.storageKeyGenerator = new StorageKeyGenerator();
    }

    tagUser(taggedUserDetail) {
        this.storageUpdater.addItemToStorage((taggedUserDetail.userId + '.' + ApplicationSettings.StorageConstants.TagDetail), taggedUserDetail);
    }

    unTagUser(userId) {
        this.storageUpdater.removeItemFromStorage(this.storageKeyGenerator.generateTagDetailKey(userId));
    }
}