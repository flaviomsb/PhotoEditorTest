import RNFS from 'react-native-fs';
import type Realm from 'realm';
import { useRealm } from '../models';
import { Defect } from '../models/Defect';
import openPhotoEditor from '../services/photo/openPhotoEditor';

export default function useDefectPhotos(defect: Defect) {
  const realm = useRealm();

  const getFullPhotoPath = (photoPath: string): string =>
    [RNFS.DocumentDirectoryPath, photoPath].join('/');

  const addPhoto = async (): Promise<void> => {
    const photoPath = await openPhotoEditor({
      defectId: defect.id.toString(),
    });

    if (photoPath) {
      realm.write(() => {
        defect.photos?.push(photoPath);
      });
    }
  };

  const editPhoto = async (photoPath: string, index: number): Promise<void> => {
    const newPhotoPath = await openPhotoEditor({
      defectId: defect.id.toString(),
      photoUri: getFullPhotoPath(photoPath),
    });

    const currentPhotos = defect.photos;

    if (newPhotoPath) {
      realm.write(() => {
        if (currentPhotos) {
          currentPhotos[index] = newPhotoPath;
          defect.photos = currentPhotos;
        }
      });
    }
  };

  const deletePhoto = (photo: string): Promise<void> => {
    const fullPhotoPath = getFullPhotoPath(photo);

    return RNFS.unlink(fullPhotoPath).then(() => {
      realm.write(() => {
        defect.photos = defect.photos?.filter(
          p => p !== photo,
        ) as unknown as Realm.List<string>;
      });
    });
  };

  const deleteAll = (): Promise<void> => {
    const photosDir = [RNFS.DocumentDirectoryPath, defect.id.toString()].join(
      '/',
    );

    return RNFS.unlink(photosDir).then(() => {
      realm.write(() => {
        defect.photos = [] as unknown as Realm.List<string>;
      });
    });
  };

  return { addPhoto, editPhoto, deletePhoto, deleteAll, getFullPhotoPath };
}
