import type Realm from 'realm';
import { useQuery } from '../models';
import { Inspection } from '../models/Inspection';

export default function useInspections({
  searchCriteria,
}: {
  searchCriteria?: string;
}): Realm.Results<Inspection> {
  const inspections = useQuery(Inspection);

  if (searchCriteria) {
    const filtered = inspections.filtered('title TEXT $0', searchCriteria);

    if (filtered.length > 0) {
      return filtered;
    }
  }

  return inspections;
}
