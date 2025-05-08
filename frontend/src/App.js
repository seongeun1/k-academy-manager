import AddStudent from './components/AddStudent';
import SearchStudent from './components/SearchStudent';
import UpdStudent from './components/UpdStudent';
import RemoveStudent from './components/RemoveStudent';

import "./App.css";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>K-Academy Manager</h1>
      <AddStudent/> 
      <SearchStudent/>
      <UpdStudent/>
      <RemoveStudent/>
    </div>
  );
}

export default App;
