/// general styles
import colors from '../variables/colors';
import spacing from '../variables/spacing';
import typography from '../variables/typography';

import { StyleSheet } from 'react-native';

const layoutStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.medium,
  },
});

export default layoutStyles;
