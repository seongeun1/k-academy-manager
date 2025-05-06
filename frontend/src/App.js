import AddStudent from './components/AddStudent';
import SearchStudent from './components/SearchStudent';
import "./App.css";

function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>K-Academy Manager</h1>
      <AddStudent/> 
      <SearchStudent />
    </div>
  );
}

export default App;
