import React from 'react';
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButton, IonText, IonFooter, IonPage, IonButtons } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  const goToLogin = () => {
    history.push('/login');
  };

  const goToSignup = () => {
    history.push('/sign-up');
  };

  const goToAdminLogin = () => {
    history.push('/adminlogin');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>NBSC</IonTitle>
          <IonButtons slot="end" className="nav-links">
          <IonButton routerLink="/login" routerDirection="forward">Login</IonButton>
          <IonButton routerLink="/sign-up" routerDirection="forward">Sign Up</IonButton>
          <IonButton routerLink="/adminlogin" routerDirection="forward">Admin</IonButton>


          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div className="hero-section">
          <h1 className="hero-title">Processing Request System</h1>
          <p className="hero-subtitle">Streamlining Your Requests</p>
          <p className="hero-text">
            At NBSC, we make the process of handling your requests fast, easy, and efficient.
            Your satisfaction is our priority, and we are here to help you at every step!
          </p>
        </div>
      </IonContent>

      <IonFooter>
        <IonToolbar>
          <IonText className="ion-text-center">
            <p>© 2024 Northern Bukidnon State College. All Rights Reserved.</p>
          </IonText>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default Home;
