import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
   container: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  authContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#79b8c9',
    },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    height: 50,
    width: '100%',
    borderColor: '#45828a',
    backgroundColor: '#45828a',
    borderWidth: 1,
    marginTop: 20,
    padding: 8,
    borderRadius: 4,
    marginBottom: 16,
    },
  buttonContainer: {
     marginVertical: 10,
     paddingBottom: 10,
  },
  toggleText: {
    color: '#115b53',
    textAlign: 'center',
  },
  bottomContainer: {
    marginTop: 10,
  },
  errorMessageContainer: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  errorMessageText: {
    color: '#721c24',
    fontSize: 14,
  },
  emailText: {
    fontSize: 16,
    marginBottom: 8,
  },
  balanceText: {
    fontSize: 16,
    marginBottom: 16,
  },
  logo: {
    width: 220,
    height: 300,
  },
  logo2: {
    width: 50,
    height: 50,
    marginBottom: 20,
    marginTop: 250,
  },
  list: {
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
     homeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#79b8c9',
    },
    balanceContainer: {
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
  },
  topUpContainer: {
    flex: 1,
    marginTop: 20,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 100,
  },
});