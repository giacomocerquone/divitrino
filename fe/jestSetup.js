/* eslint-disable no-undef */
import mockAsyncStorage from '@react-native-community/async-storage/jest/async-storage-mock';
import {NativeModules} from 'react-native';

jest.mock('@react-native-community/async-storage', () => mockAsyncStorage);

jest.mock('@react-native-firebase/crashlytics', () => {
  return () => ({
    setAttributes: jest.fn(),
  });
});

// Mock the ImagePickerManager native module to allow us to unit test the JavaScript code
NativeModules.ImagePickerManager = {
  showImagePicker: jest.fn(),
  launchCamera: jest.fn(),
  launchImageLibrary: jest.fn(),
};
