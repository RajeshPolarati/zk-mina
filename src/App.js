import { useEffect } from "react";
import { isReady, PublicKey } from "snarkyjs";
import { SimpleZkapp_ } from "zkapp-snarkyjs";
function App() {
  useEffect(()=>{
    (async()=>{
      await isReady
      await SimpleZkapp_.compile()
      const contract = new SimpleZkapp_(PublicKey.fromBase58('B62qkz3eEeD5XHDEMLubSo4YQ6Xejs6tnh6sx3CYtGCXEEA1DaNc4cq'))
      let val = contract.value.get()
      console.log(`Found deployed zkapp, with state ${val.toBase58()}`);
    })()
  },[])
  return (
    <div className="App">
      <h1>React app helo</h1>
    </div>
  );
}

export default App;
