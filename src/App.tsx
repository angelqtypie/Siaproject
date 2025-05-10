import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactHashRouter } from '@ionic/react-router';  // ✅ Use hash router for GitHub Pages
import { Route, Redirect } from 'react-router-dom';

import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/admin/adminDashboard';
import ManageUsers from './pages/admin/ManageUsers';
import ViewRequests from './pages/admin/ViewRequest';
import AddProducts from './pages/admin/AddProducts';
import ViewFeedbacks from './pages/admin/ViewFeedbacks';
import Login from './pages/users/Login';
import Dashboard from './pages/users/Dashboard';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import './theme/variables.css';



const App: React.FC = () => (
  <IonApp>
    <IonReactHashRouter>  {/* ✅ Switched from IonReactRouter */}
      <IonRouterOutlet>
        <Route exact path="/home" component={Home} />
        <Route exact path="/adminlogin" component={AdminLogin} />
        <Route exact path="/admindashboard" component={AdminDashboard} />
        <Route exact path="/manageusers" component={ManageUsers} />
        <Route exact path="/viewrequests" component={ViewRequests} />
        <Route exact path="/products" component={AddProducts} />
        <Route exact path="/viewfeedbacks" component={ViewFeedbacks} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
      </IonRouterOutlet>
    </IonReactHashRouter>
  </IonApp>
);

export default App;
