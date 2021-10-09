import './App.css';
import Todos from './Components/Todos/Todos.js'
import Navigation from './Components/Navigation';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Categories from './Components/Categories/Categories.js'
import Login from './Components/Auth/Login.js'
import NotFound from './Components/NotFound';
import { AuthProvider } from './Contexts/AuthContext'
import PrivateRoute from './Components/PrivateRoute';
import Footer from './Components/Footer';
import LogOut from './Components/Auth/LogOut';

function App() {
  return (
    <div >
      <AuthProvider>
        <Navigation />
        <Router>
          <Switch>
            <PrivateRoute exact path="/" component={Todos} />
            <Route path="/todos" component={Todos} />
            <Route path="/categories" component={Categories} />
            <Route path="/login" component={Login} />
            <Route path="/logout" component={LogOut} />
            <Route component={NotFound} />
          </Switch>
        </Router>
        <Footer />
      </AuthProvider>
    </div>
  );
}

export default App;

