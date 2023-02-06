import { BrowserRouter, Link, Route } from "react-router-dom";
import Demo1 from "./demo-1";

function App() {
  return <BrowserRouter>
    <div>
      <Link to='/demo1'>demo1</Link>
    </div>
    <div>
      <Route path='/demo1'><Demo1 /></Route>
      <Route path='/'><div>Try out three.js, click on a link above to see.</div></Route>
    </div>
  </BrowserRouter>;
}

export default App;
