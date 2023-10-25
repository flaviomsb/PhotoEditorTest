import React from 'react';
import { StyleSheet } from 'react-native';
import { Badge, Button, Divider, Menu } from 'react-native-paper';
import RNFS from 'react-native-fs';
import { useRealm } from '../models';
import { Defect } from '../models/Defect';
import openPhotoEditor from '../services/photo/openPhotoEditor';

export default function DefectPhotos({ defect }: { defect: Defect }) {
  const realm = useRealm();
  const [showMenu, setShowMenu] = React.useState(false);
  const openMenu = () => {
    setShowMenu(true);
  };
  const closeMenu = () => {
    setShowMenu(false);
  };
  const photosCount = defect.photos?.length;

  const addPhoto = React.useCallback(async () => {
    setShowMenu(false);
    const photoPath = await openPhotoEditor({
      defectId: defect.id.toString(),
    });

    if (photoPath) {
      realm.write(() => {
        defect.photos?.push(photoPath);
      });
    }
  }, [defect, realm]);

  const editPhoto = React.useCallback(
    async (photoPath: string, index: number) => {
      setShowMenu(false);
      const newPhotoPath = await openPhotoEditor({
        defectId: defect.id.toString(),
        photoUri: [RNFS.DocumentDirectoryPath, photoPath].join('/'),
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
    },
    [defect, realm],
  );

  return photosCount ? (
    <Menu
      visible={showMenu}
      style={styles.menu}
      onDismiss={closeMenu}
      anchor={
        <>
          <Button icon="camera" onPress={openMenu} uppercase>
            Photos
          </Button>
          <Badge style={[styles.badge, !photosCount && styles.noPhotos]}>
            {photosCount}
          </Badge>
        </>
      }>
      {defect.photos?.map((path, index) => (
        <Menu.Item
          key={path}
          leadingIcon="image"
          onPress={async () => {
            await editPhoto(path, index);
          }}
          title={`Photo #${index + 1}`}
        />
      ))}
      <Divider />
      <Menu.Item
        onPress={addPhoto}
        leadingIcon="image-plus"
        title="Add Photo"
        disabled={defect.photos?.length === 5}
      />
    </Menu>
  ) : (
    <Button icon="camera" onPress={addPhoto} uppercase>
      Add Photo
    </Button>
  );
}

const styles = StyleSheet.create({
  badge: {
    position: 'absolute',
    top: -4,
    right: -2,
  },
  noPhotos: {
    backgroundColor: '#f2f2f2',
    color: '#263238',
  },
  menu: {
    backgroundColor: '#ffffff',
  },
});
