import Realm from 'realm';
import { User } from './User';
import { Defect } from './Defect';

export class Inspection extends Realm.Object<Inspection> {
  id!: Realm.BSON.UUID;
  title!: string;
  user!: User;
  defects?: Realm.List<Defect>;
  signaturePath?: string;

  static schema: Realm.ObjectSchema = {
    name: 'Inspection',
    primaryKey: 'id',
    properties: {
      id: 'uuid',
      title: 'string',
      user: 'User',
      defects: 'Defect[]',
      signaturePath: 'string?',
    },
  };
}
