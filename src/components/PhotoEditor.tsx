import React, { useState } from 'react';
import { TouchableOpacity, Image as RNImage, ViewProps } from 'react-native';
import PhotoEditor from '@baronha/react-native-photo-editor';

const Image = ({ url, imageStyle }: { url: string; imageStyle: ViewProps }) => {
  const [path, setPath] = useState<string>(url);

  const onEdit = async () => {
    try {
      const result = await PhotoEditor.open({ path, stickers: [] });
      console.log('resultEdit: ', result);
      setPath(result.toString());
    } catch (e) {
      console.log('error', e);
    } finally {
      console.log('finally');
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.9} onPress={onEdit} style={imageStyle}>
      <RNImage source={{ uri: path }} />
    </TouchableOpacity>
  );
};

export default Image;
