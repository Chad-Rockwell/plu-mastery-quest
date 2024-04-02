import 'react-native-url-polyfill/auto';
import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { supabase } from './utils/supabase.js';
import Auth from './components/LoginPage.js';
import Account from './components/Account.js';
import ProduceList from './components/ProduceList.js'
import { Session } from '@supabase/supabase-js';

export default function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const unsubscribe = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    // <View>
    //   {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />}
    // </View>
    <View><ProduceList/></View>
  );
}
