import { useEffect } from "react";
import { Add } from "zkproject";
function App() {
  useEffect(()=>{
    (async()=>{
      await Add.compile()
    })()
  },[])
  return (
    <div className="App">
      <h1>React app helo</h1>
    </div>
  );
}

export default App;
