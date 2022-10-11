import { useEffect } from "react";
import { fetchAccount, isReady, Mina, PublicKey, setGraphqlEndpoint } from "snarkyjs";
import { SimpleZkapp_ } from "zkapp-snarkyjs";
import { Add } from "zkproject";

function App() {
  useEffect(()=>{
    (async()=>{
      await isReady
      console.log("inside async");
      const graphqlEndpoint = 'https://proxy.berkeley.minaexplorer.com/graphql';
      setGraphqlEndpoint(graphqlEndpoint);
      let Berkeley = Mina.BerkeleyQANet(graphqlEndpoint);
      Mina.setActiveInstance(Berkeley);
      const zkAppAddress = 'B62qkz3eEeD5XHDEMLubSo4YQ6Xejs6tnh6sx3CYtGCXEEA1DaNc4cq'
      let {account,error} = await fetchAccount({ publicKey: PublicKey.fromBase58(zkAppAddress)})
      console.log(account);
      await Add.compile()
      // await SimpleZkapp_.compile()
      try{
      const contract = new Add()
      let val = contract.num.get()
      console.log("val",val);
      console.log(`Found deployed zkapp, with state ${val.toBase58()}`);
      }catch(error){
        console.log(error);
      }
      
    })()
  },[])
  return (
    <div className="App">
      <h1>React app hello</h1>
    </div>
  );
}

export default App;
