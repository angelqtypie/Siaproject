import React from 'react';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonText,
  IonFooter,
  IonPage,
  IonButtons,
} from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      {/* Navbar */}
      <IonHeader>
        <IonToolbar>
          <IonTitle>NBSC</IonTitle>
          <IonButtons slot="end" className="nav-links">
            <IonButton color="black" routerLink="/login">Login</IonButton>
            <IonButton color="black" routerLink="/signup">Sign Up</IonButton>
            <IonButton color="black" routerLink="/adminlogin">Admin</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      {/* Hero Section */}
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

      {/* Footer */}
      <IonFooter >
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
