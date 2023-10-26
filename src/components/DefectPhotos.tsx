import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import {
  Badge,
  Button,
  Dialog,
  Divider,
  Icon,
  IconButton,
  Modal,
  Portal,
  Text,
} from 'react-native-paper';
import { Defect } from '../models/Defect';
import useDefectPhotos from '../hooks/useDefectPhotos';

export default function DefectPhotos({ defect }: { defect: Defect }) {
  const photosCount = defect.photos?.length;
  const { addPhoto, editPhoto, deletePhoto, deleteAll } =
    useDefectPhotos(defect);
  const [showGallery, setShowGallery] = React.useState(false);
  const [deletable, setDeletable] = React.useState<string[]>([]);
  const [confirmDeleteAll, setConfirmDeleteAll] = React.useState(false);

  const hideDeleteAllConfirm = () => {
    setConfirmDeleteAll(false);
  };

  const deleteAllPhotos = async () => {
    await deleteAll();
    hideGallery();
    hideDeleteAllConfirm();
  };

  const openGallery = async () => {
    if (photosCount) {
      setShowGallery(true);
    } else {
      await addPhoto();
    }
  };

  const hideGallery = () => {
    setShowGallery(false);
  };

  const removeFromDeletable = (photo: string) => {
    setDeletable(currentDeletable => currentDeletable.filter(d => d !== photo));
  };

  const PhotoItem = React.useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <View style={styles.galleryPhoto}>
        <TouchableOpacity
          style={styles.galleryPhotoTitle}
          onPress={async () => {
            await editPhoto(item, index);
          }}>
          <Icon source="image" size={24} />
          <Text variant="titleMedium">{`Photo #${index + 1}`}</Text>
        </TouchableOpacity>
        <View>
          {deletable.includes(item) ? (
            <View style={styles.galleryPhotoDeleteActions}>
              <IconButton
                icon="arrow-u-left-top"
                size={24}
                onPress={() => {
                  removeFromDeletable(item);
                }}
              />
              <IconButton
                icon="delete-forever"
                size={24}
                onPress={async () => {
                  await deletePhoto(item);
                  removeFromDeletable(item);
                }}
              />
            </View>
          ) : (
            <IconButton
              icon="delete"
              size={24}
              onPress={() => {
                setDeletable(currentDeletable => [...currentDeletable, item]);
              }}
            />
          )}
        </View>
      </View>
    ),
    [deletable, deletePhoto, editPhoto],
  );

  return (
    <>
      <>
        <Button icon="camera" onPress={openGallery} uppercase>
          Photos
        </Button>
        <Badge style={[styles.badge, !photosCount && styles.noPhotos]}>
          {photosCount}
        </Badge>
      </>
      <Portal>
        <Modal
          visible={showGallery}
          onDismiss={hideGallery}
          contentContainerStyle={styles.gallery}>
          <View style={styles.galleryContent}>
            {defect.photos?.map((item, index) => (
              <PhotoItem key={`${item}-${index}`} item={item} index={index} />
            ))}
            <Divider />
            <View style={styles.galleryActions}>
              <Button
                icon="delete-variant"
                textColor="red"
                uppercase
                onPress={() => {
                  setConfirmDeleteAll(true);
                }}>
                Delete all photos
              </Button>
              <Button icon="image-plus" onPress={addPhoto} uppercase>
                Add photo
              </Button>
            </View>
          </View>
        </Modal>
      </Portal>
      <Portal>
        <Dialog
          style={styles.confirmDialog}
          visible={confirmDeleteAll}
          dismissable={false}>
          <Dialog.Title>Confirm Action</Dialog.Title>
          <Dialog.Content>
            <Text variant="titleMedium">
              You are about to delete all photos and this action cannot be
              undone
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button icon="arrow-u-left-top" onPress={hideDeleteAllConfirm}>
              <Text style={styles.confirmButtonLabel}>Cancel</Text>
            </Button>
            <Button icon="delete-forever" onPress={deleteAllPhotos}>
              <Text style={styles.confirmButtonLabel}>Delete All</Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </>
  );
}

const styles = StyleSheet.create({
  badge: {
    top: -11,
    right: 8,
  },
  noPhotos: {
    backgroundColor: '#f2f2f2',
    color: '#263238',
  },
  gallery: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    paddingHorizontal: 50,
    marginHorizontal: 20,
  },
  galleryContent: {
    flexDirection: 'column',
  },
  galleryPhoto: {
    marginLeft: 10,
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  galleryPhotoTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  galleryPhotoDeleteActions: {
    flexDirection: 'row',
  },
  galleryActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  confirmDialog: {
    borderRadius: 2,
  },
  confirmButtonLabel: {
    textTransform: 'uppercase',
  },
});
