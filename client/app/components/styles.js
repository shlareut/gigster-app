import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  card: {
    flex: 1,
    flexDirection: 'column',
    marginVertical: 25,
    borderColor: 'grey',
    borderWidth: 1,
    borderStyle: 'solid',
    width: '90%',
    height: 300,
    borderRadius: '25',
    alignSelf: 'center',
  },
  imageWrapper: {
    borderTopLeftRadius: '25',
    borderTopRightRadius: '25',
    width: '100%',
    height: '50%',
  },
  image: {
    borderTopLeftRadius: '25',
    borderTopRightRadius: '25',
    resizeMode: 'cover',
    height: '100%',
    overflow: 'hidden',
  },
  dealWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    marginRight: '5%',
    marginTop: '5%',
    borderColor: 'grey',
    borderWidth: '1',
    borderStyle: 'solid',
    borderRadius: '10',
    backgroundColor: 'white',
  },
  dealLabel: {
    margin: '3%',
    fontWeight: 'bold',
  },
  title: {
    marginVertical: 12,
    fontWeight: 'bold',
    fontSize: 24,
  },
});
