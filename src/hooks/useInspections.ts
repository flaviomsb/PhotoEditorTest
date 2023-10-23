import type Realm from 'realm';
import { useQuery } from '../models';
import { Inspection } from '../models/Inspection';

export default function useInspections({
  searchCriteria,
}: {
  searchCriteria?: string;
}): Realm.Results<Inspection> {
  let inspections = useQuery(Inspection);

  if (searchCriteria) {
    inspections = inspections.filtered('title TEXT $0', searchCriteria);
  }

  return inspections;
}
