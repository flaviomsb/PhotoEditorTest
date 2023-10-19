import Realm from 'realm';
import { realmConfig } from '../../models';
import { users, inspections } from './data';

export default async function populateDb() {
  const realm = await Realm.open(realmConfig);

  if (realm.objects('User').length > 0) {
    return;
  }

  function id() {
    return new Realm.BSON.UUID();
  }

  try {
    realm.write(() => {
      users.forEach((rawUser, index) => {
        const user = realm.create('User', rawUser, Realm.UpdateMode.Modified);
        realm.create(
          'Inspection',
          { id: id(), ...inspections[index], user },
          Realm.UpdateMode.Modified,
        );
      });
    });
  } catch (error) {
    console.log(error);
  }
}
