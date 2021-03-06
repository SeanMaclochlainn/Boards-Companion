import { StorageUpdater } from "../../../src/storage/StorageUpdater.js";
import { ChromeStorageMocker } from "../test-environment/ChromeStorageMocker.js";

let storageUpdater = new StorageUpdater();
let chromeStorageMocker = new ChromeStorageMocker();

beforeEach(() => {
    chromeStorageMocker.MockAllValues();
});

it('test add item to storage', () => {
    storageUpdater.addItemToStorage('taggedUser', "testuser");

    expect(chromeStorageMocker.chromeMock.storage.sync.set.mock.calls.length).toBe(1);
})