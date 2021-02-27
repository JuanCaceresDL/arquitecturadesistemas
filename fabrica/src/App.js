import { Route, Switch, Link } from 'react-router-dom'
import { TodoList } from './TodoList'
import { CreateTodo } from './CreateTodo'
import { EditTodo } from './EditTodo'
import { Delete } from './delete'
import React from 'react';

function App() {
  return (
    <div>
    <nav className="navbar bg-light navbar-expand-lg navbar-light">
      <ul className="navbar-nav mr-auto">
        <li className="navbar-item">
          <Link to="/" className="nav-link">Lista</Link>
        </li>
        <li className="navbar-item">
          <Link to="/create" className="nav-link">Crear</Link>
        </li>
      </ul>
    </nav>
  <Switch>
    <Route exact path="/" component={TodoList}/>
    <Route path="/edit/:id" component={EditTodo}/>
    <Route path="/create" component={CreateTodo}/>
    <Route path="/delete" component={Delete}/>
  </Switch>
  </div>
  );
}

export default App;
