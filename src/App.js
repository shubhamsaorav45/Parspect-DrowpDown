import "./App.css";
import SearchableDropdown from "./components/SearchableDropdown";
import  {userList}  from "./mock";
function App() {
  return (
    <div className="App">
      <SearchableDropdown user={userList} />
    </div>
  );
}

export default App;
