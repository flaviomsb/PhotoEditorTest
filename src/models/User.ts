import Realm from 'realm';

export class User extends Realm.Object<User> {
  id!: number;
  name!: string;

  static schema: Realm.ObjectSchema = {
    name: 'User',
    primaryKey: 'id',
    properties: {
      id: 'int',
      name: 'string',
    },
  };
}
