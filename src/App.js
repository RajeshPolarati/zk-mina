import { useEffect } from "react";
import { isReady } from "snarkyjs";
import { SimpleZkapp_ } from "zkapp-snarkyjs";
function App() {
  useEffect(()=>{
    (async()=>{
      await isReady
      await SimpleZkapp_.compile()
    })()
  },[])
  return (
    <div className="App">
      <h1>React app helo</h1>
    </div>
  );
}

export default App;
