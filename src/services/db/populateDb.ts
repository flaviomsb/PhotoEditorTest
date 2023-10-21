import Realm from 'realm';
import { faker } from '@faker-js/faker';
import { realmConfig } from '../../models';

function createUser() {
  return {
    id: faker.number.int({ min: 1, max: 500 }),
    name: faker.person.fullName(),
  };
}

const users = faker.helpers.multiple(createUser, { count: 30 });

function createInspection() {
  return {
    id: new Realm.BSON.UUID(),
    title: `${faker.vehicle.vehicle()} Inspection`,
  };
}

const inspections = faker.helpers.multiple(createInspection, { count: 30 });

export default async function populateDb() {
  const realm = await Realm.open(realmConfig);

  try {
    realm.write(() => {
      users.forEach((rawUser, index) => {
        const user = realm.create('User', rawUser, Realm.UpdateMode.Modified);
        realm.create(
          'Inspection',
          { ...inspections[index], user },
          Realm.UpdateMode.Modified,
        );
      });
    });
  } catch (error) {
    console.log(error);
  }
}
