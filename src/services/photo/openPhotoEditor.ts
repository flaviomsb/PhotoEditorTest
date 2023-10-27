import {
  ImageExportType,
  ImageFormat,
  PESDK,
  // Tool,
} from 'react-native-photoeditorsdk';
import { launchImageLibrary } from 'react-native-image-picker';
import { v4 as uuid } from 'uuid';
import RNFS from 'react-native-fs';

export default async function openPhotoEditor({
  defectId,
  photoUri,
}: {
  defectId: string;
  photoUri?: string;
}): Promise<string | undefined> {
  try {
    async function openImageLibrary() {
      // Select a photo from the camera roll.
      let pickerResult = await launchImageLibrary({
        mediaType: 'photo',
      });

      // Return if the image selection has been cancelled.
      if (pickerResult.didCancel) {
        return;
      }

      return pickerResult && pickerResult.assets
        ? pickerResult.assets[0].uri
        : null;
    }

    const photoExists = photoUri ? await RNFS.exists(photoUri) : false;

    const uri = photoExists ? photoUri : await openImageLibrary();

    if (!uri) {
      console.log('no photo available');
      return;
    }

    const photoId = [defectId, uuid()].join('/');

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(uri, {
      export: {
        filename: [RNFS.DocumentDirectoryPath, photoId].join('/'),
        image: {
          format: ImageFormat.PNG,
          exportType: ImageExportType.FILE_URL,
        },
      },

      // tools: [
      // Tool.ADJUSTMENT,
      // Tool.AUDIO,
      // Tool.BRUSH,
      // Tool.COMPOSITION,
      // Tool.FILTER,
      // Tool.FOCUS,
      // Tool.FRAME,
      // Tool.OVERLAY,
      // Tool.STICKER,
      // Tool.TEXT,
      // Tool.TEXT_DESIGN,
      // Tool.TRANSFORM,
      // Tool.TRIM,
      // ],
    });

    if (result) {
      if (photoExists && photoUri) {
        try {
          await RNFS.unlink(photoUri);
        } catch (error) {
          console.log(`failed to delete ${photoUri}`);
        }
      }
      return [photoId, 'png'].join('.');
    }
  } catch (error) {
    console.log(error);
  }
}
