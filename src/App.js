import { useEffect } from "react";
import { fetchAccount, Field, isReady, Mina, PublicKey, setGraphqlEndpoint } from "snarkyjs";
// import { SimpleZkapp_ } from "zkapp-snarkyjs";
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
      const zkAppAddress = 'B62qosyTfXPG88qRH3K6MYAvevaQt8GcXsG4m9BwQEjNDf4KRazjv89'
      let {account,error} = await fetchAccount({ publicKey: PublicKey.fromBase58(zkAppAddress)})
      console.log(account);
      console.log(error)
      await Add.compile()
      // await SimpleZkapp_.compile()
      try{
        console.log("in try");
        const contract = new Add(Field(3))
      //contract.init()
      console.log(contract);
      console.log("after contract");
        console.log(contract.num)
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
