import {AuthProviders, AuthMethods} from "angularfire2";
export const AppSettings = Object.freeze({
  MEN_API_ENDPOINT: 'https://cp2rest.herokuapp.com/api/v1/'
  //... more of your variables
});

export const firebaseConfig = {
  apiKey: "AIzaSyCnLMPbw7RLqpVSUj_o-6ibQuGAEvfyqac",
  authDomain: "cp2rest.firebaseapp.com",
  databaseURL: "https://cp2rest.firebaseio.com",
  storageBucket: "cp2rest.appspot.com",
  messagingSenderId: "646091707432"
};

export const firebarebaseLoginConfig =  {
  provider: AuthProviders.Password,
  method: AuthMethods.Password
};
