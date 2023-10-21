import Realm from 'realm';
import { useObject } from '../models';
import { Inspection } from '../models/Inspection';

export default function useInspection(id: string) {
  const inspection = useObject(Inspection, new Realm.BSON.UUID(id));

  if (!inspection) {
    throw new Error(`No inspection found with id: ${id}`);
  }

  return inspection;
}
