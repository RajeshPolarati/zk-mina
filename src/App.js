import { useEffect } from "react";
import { fetchAccount, isReady, Mina, PublicKey, setGraphqlEndpoint } from "snarkyjs";
import { SimpleZkapp_ } from "zkapp-snarkyjs";

function App() {
  useEffect(()=>{
    (async()=>{
      await isReady
      console.log("inside async");
      const graphqlEndpoint = 'https://proxy.berkeley.minaexplorer.com/graphql';
      setGraphqlEndpoint(graphqlEndpoint);
      let Berkeley = Mina.BerkeleyQANet(graphqlEndpoint);
      Mina.setActiveInstance(Berkeley);
      const zkAppAddress = 'B62qiY3PVYcjdDfQehgSJDgKUsGbg5WwkEeD26Jb9ZxExRQ4xjW1AMg'
      let {account,error} = await fetchAccount({ publicKey: PublicKey.fromBase58(zkAppAddress)})
      console.log(account);
      await SimpleZkapp_.compile()
      try{
        const contract = new SimpleZkapp_(PublicKey.fromBase58(zkAppAddress))
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
