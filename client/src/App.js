import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/albums" component={Albums} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
