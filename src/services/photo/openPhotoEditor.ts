import { PESDK } from 'react-native-photoeditorsdk';
import { launchImageLibrary } from 'react-native-image-picker';

export default async function openPhotoEditor(
  photoUri?: string,
): Promise<string | undefined> {
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

    const uri = photoUri ? photoUri : await openImageLibrary();

    if (!uri) {
      console.log('no photo available');
      return;
    }

    // Open the photo editor and handle the export as well as any occuring errors.
    const result = await PESDK.openEditor(uri);

    if (!result) {
      return;
    }

    return result.image;
  } catch (error) {
    console.log(error);
    return;
  }
}
