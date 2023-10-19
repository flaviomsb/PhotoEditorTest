import Realm from 'realm';
import { createRealmContext } from '@realm/react';
import { User } from './User';
import { Inspection } from './Inspection';
import { Defect } from './Defect';

export const realmConfig: Realm.Configuration = {
  schema: [User, Inspection, Defect],
  schemaVersion: 2,
  deleteRealmIfMigrationNeeded: true,
};

export const { RealmProvider, useQuery, useObject, useRealm } =
  createRealmContext(realmConfig);
