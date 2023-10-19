import Realm from 'realm';
import { Inspection } from './Inspection';

export class Defect extends Realm.Object<Defect> {
  id!: Realm.BSON.UUID;
  photoPath!: string;
  inspection!: Inspection;

  static schema: Realm.ObjectSchema = {
    name: 'Defect',
    primaryKey: 'id',
    properties: {
      id: 'uuid',
      inspection: {
        type: 'linkingObjects',
        objectType: 'Inspection',
        property: 'defects',
      },
      photoPath: 'string',
    },
  };
}
