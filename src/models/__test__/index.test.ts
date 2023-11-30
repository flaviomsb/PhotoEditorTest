import Realm from 'realm';
import { test, expect, beforeEach, afterEach } from '@jest/globals';
import { realmConfig } from '..';

let realm: Realm;

beforeEach(async () => {
  realm = await Realm.open(realmConfig);
});

afterEach(() => {
  if (!realm.isClosed) {
    realm.close();
  }
  if (realmConfig) {
    Realm.deleteFile(realmConfig);
  }
});

test("Close a Realm", async () => {
  expect(realm.isClosed).toBe(false);
  realm.close();
  expect(realm.isClosed).toBe(true);
});
