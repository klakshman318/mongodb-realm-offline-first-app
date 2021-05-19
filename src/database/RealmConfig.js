import Realm from 'realm';
import { BookSchema } from '../schemas';

// Place Your RealmApp ID Here
const app = new Realm.App({ id: "REALM-APP-ID", timeout: 10000 });

// can implement inBuilt JWT, Google, Facebook, Apple Authentication Flow.
const credentials = Realm.Credentials.anonymous(); // LoggingIn as Anonymous User. 

getRealm = async () => {

  // loggedIn as anonymous user
  const loggedInUser = await app.logIn(credentials);
  
  // MongoDB RealmConfiguration
  const configuration = {
    schema: [BookSchema], // add multiple schemas, comma seperated.
    sync: {
      user: app.currentUser, // loggedIn User
      partitionValue: "2F6092d4c594587f582ef165a0", // should be userId(Unique) so it can manage particular user related documents in DB by userId
    }
  };

  return Realm.open(configuration);
}

export default getRealm;