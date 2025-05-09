import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { BrowserRouter } from 'react-router-dom'; // Added BrowserRouter
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/admin/adminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ViewRequests from './pages/admin/ViewRequest';
import AddProducts from './pages/admin/AddProducts';
import ViewFeedbacks from './pages/admin/ViewFeedbacks';
import Login from './pages/users/Login';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => (
  <IonApp>
    <BrowserRouter basename="/Siaproject"> {/* Set the basename */}
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home" component={Home} />
          <Route exact path="/adminlogin" component={AdminLogin} />
          <Route path="/admindashboard" component={AdminDashboard} exact />
          <Route path="/manageusers" component={ManageUsers} exact />
          <Route path="/viewrequests" component={ViewRequests} />
          <Route path="/products" component={AddProducts} exact />
          <Route path="/viewfeedbacks" component={ViewFeedbacks} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </BrowserRouter>
  </IonApp>
);

export default App;
