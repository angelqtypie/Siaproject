import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonInput, IonItem, IonLabel, IonText } from '@ionic/react';
import { supabase } from '../../utils/supabaseClient';
import { Session } from '@supabase/supabase-js';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [loginError, setLoginError] = useState<string>('');
  const history = useHistory();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setLoginError('Please fill in all fields');
      return;
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoginError(error.message);
      return;
    }

    if (data.session) {
      const session: Session = data.session;
      localStorage.setItem('access_token', session.access_token);

      const { data: user, error: userError } = await supabase
        .from('users')
        .select('*')
        .eq('email', email)
        .single();

      if (userError) {
        setLoginError('User profile not found.');
        return;
      }

      if (!user.full_name || !user.course) {
        history.push('/profile-update');
      } else {
        history.push('/dashboard');
      }
    } else {
      setLoginError('No session returned.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <form onSubmit={handleSubmit}>
          {loginError && <IonText color="danger">{loginError}</IonText>}

          <IonItem>
            <IonLabel position="stacked">Email</IonLabel>
<IonInput
  type="email"
  value={email}
  onIonChange={(e) => setEmail(e.detail.value!)}
  required
/>
          </IonItem>

          <IonItem>
            <IonLabel position="stacked">Password</IonLabel>
<IonInput
  type="password"
  value={password}
  onIonChange={(e) => setPassword(e.detail.value!)}
  required
/>

          </IonItem>

          <IonButton expand="block" type="submit" className="ion-margin-top">
            Login
          </IonButton>

          <p className="ion-text-center ion-margin-top">
            Don't have an account? <a href="/sign-up">Sign up now</a>
          </p>
        </form>
      </IonContent>
    </IonPage>
  );
};

export default Login;
