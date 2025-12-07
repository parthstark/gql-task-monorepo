import { Platform } from 'react-native';
import IconNative from 'react-native-vector-icons/MaterialCommunityIcons';
import IconWeb from './Icon.web';

const Icon = Platform.OS === 'web' ? IconWeb : IconNative;

export default Icon;
