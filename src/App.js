import { useEffect } from "react";
import { fetchAccount, isReady, PublicKey } from "snarkyjs";
import { SimpleZkapp_ } from "zkapp-snarkyjs";
function App() {
  useEffect(()=>{
    (async()=>{
      await isReady
      console.log("inside async");
      let {account,error} = await fetchAccount({ publicKey: PublicKey.fromBase58('B62qoD7GZfMURQSpEF98HBTCuuchzgiw43dNsZXanMg8w6AYKLCuVfc')})
      console.log(account);
      await SimpleZkapp_.compile()
      try{
        const contract = new SimpleZkapp_(PublicKey.fromBase58('B62qoD7GZfMURQSpEF98HBTCuuchzgiw43dNsZXanMg8w6AYKLCuVfc'))
      let val = contract.value.get()
      console.log(`Found deployed zkapp, with state ${val.toBase58()}`);
      }catch(error){
        console.log(error);
      }
      
    })()
  },[])
  return (
    <div className="App">
      <h1>React app helo</h1>
    </div>
  );
}

export default App;
