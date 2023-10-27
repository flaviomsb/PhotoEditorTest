import React from 'react';
//import RNFS from 'react-native-fs';
//import ReactNativeBlobUtil from 'react-native-blob-util';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import SignatureScreen, {
  type SignatureViewRef,
} from 'react-native-signature-canvas';
import { Button, Icon, Snackbar, Text } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import useInspection from '../hooks/useInspection';
import { useRealm } from '../models';
import type { RootParamList } from '../Routes';
import ScreenContainer from '../components/ScreenContainer';
import GoBackButton from '../components/GoBackButton';

interface Props
  extends NativeStackScreenProps<RootParamList, 'InspectionSignature'> {}

const webStyle = '.m-signature-pad--footer {display: none; margin: 0px;}';

export default function InspectionSignature({ navigation, route }: Props) {
  const realm = useRealm();
  const [message, setMessage] = React.useState('Test');
  const [showMessage, setShowMessage] = React.useState(false);
  //const signatureFilePath = [route.params.id, 'signature.png'].join('/');
  const inspection = useInspection(route.params.id);
  const ref = React.useRef<SignatureViewRef>(null);

  const onDismissMessage = () => {
    setShowMessage(false);
  };

  const confirm = () => {
    if (ref.current) {
      ref.current.readSignature();
    }
  };

  const clear = () => {
    if (ref.current) {
      ref.current.clearSignature();
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  const validate = () => {
    setShowMessage(true);
    setMessage('Please draw your signature!');
  };

  const saveSignature = (signature: string) => {
    if (!signature) {
      return;
    }
    realm.write(() => {
      inspection.signaturePath = signature;
    });

    goBack();
    // This is how base64 is saved to a png
    //   ReactNativeBlobUtil.fs
    //     .writeFile(
    //       [RNFS.DocumentDirectoryPath, signatureFilePath].join('/'),
    //       ReactNativeBlobUtil.base64.encode(signature),
    //       'base64',
    //     )
    //     .then(() => {
    //       realm.write(() => {
    //         inspection.signaturePath = signatureFilePath;
    //       });
    //     })
    //     .catch(err => {
    //       console.log(err);
    //     });
  };

  return (
    <ScreenContainer>
      <View style={styles.root}>
        <View style={styles.topBar}>
          <GoBackButton onPress={goBack} />
          <Text variant="titleMedium">{inspection.title}</Text>
        </View>
        <View style={styles.signatureContainer}>
          <SignatureScreen
            ref={ref}
            onOK={saveSignature}
            onEmpty={validate}
            dataURL={inspection.signaturePath}
            webStyle={webStyle}
            // penColor="pink"
          />
          {/* <View style={styles.preview}>
            {inspection.signaturePath ? (
              <Image
                resizeMode={'contain'}
                style={{ width: 335, height: 114 }}
                source={{ uri: inspection.signaturePath }}
              />
            ) : null}
          </View> */}
        </View>
        <View style={styles.actions}>
          <Button
            mode="outlined"
            icon="arrow-u-left-top"
            onPress={clear}
            uppercase>
            Clear
          </Button>
          <Button mode="outlined" icon="check" onPress={confirm} uppercase>
            Confirm
          </Button>
        </View>
        <Snackbar
          visible={showMessage}
          onDismiss={onDismissMessage}
          style={styles.snackbar}>
          <View style={styles.snackbarContent}>
            <Icon source="alert-outline" size={24} color="white" />
            <Text variant="titleMedium" style={styles.snackbarText}>
              {message}
            </Text>
          </View>
        </Snackbar>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  root: {
    justifyContent: 'flex-start',
    flex: 1,
  },
  topBar: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  signatureContainer: {
    flex: 0.5,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  snackbar: {
    backgroundColor: '#e91e63',
  },
  snackbarContent: {
    flexDirection: 'row',
    gap: 10,
  },
  snackbarText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  preview: {
    width: '100%',
    height: 290,
    backgroundColor: '#F8F8F8',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
    paddingHorizontal: 15,
  },
});
