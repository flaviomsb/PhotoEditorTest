import Realm from 'realm';
import { Inspection } from './Inspection';

export class Defect extends Realm.Object<Defect> {
  id!: Realm.BSON.UUID;
  description!: string;
  inspection!: Inspection;
  photoPath?: string;

  static schema: Realm.ObjectSchema = {
    name: 'Defect',
    primaryKey: 'id',
    properties: {
      id: 'uuid',
      description: 'string',
      inspection: {
        type: 'linkingObjects',
        objectType: 'Inspection',
        property: 'defects',
      },
      photoPath: 'string?',
    },
  };
}
