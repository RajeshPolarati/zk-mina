import { useEffect } from "react";
import { Add } from "sample-zk";
import { fetchAccount, Field, isReady, Mina, PrivateKey, PublicKey, setGraphqlEndpoint } from "snarkyjs";

function App() {
  const initalize = async() =>{
    await isReady
    const graphqlEndpoint = 'https://proxy.berkeley.minaexplorer.com/graphql';
    setGraphqlEndpoint(graphqlEndpoint);
    let Berkeley = Mina.BerkeleyQANet(graphqlEndpoint);
    Mina.setActiveInstance(Berkeley);
    console.log("Connected to MINA");
  }
  // const createTransaction = async(contract) =>{
  //   let feePayerKey = PrivateKey.fromBase58('EKEeaxiDz6utkQBKApPXLd6z3XsY9Nz1kgygKLcDVb9tN4HbY89U')
  //       let txn = await Mina.transaction({feePayerKey,fee: "300_000_000"}, () => {
  //         console.log('inside transaction');
  //         contract.init();
  //       });
  //       await txn.prove()
  //       await txn.send().wait()
  // }
  useEffect(()=>{
    (async()=>{
      await initalize();
      const zkAppAddress = 'B62qrUvYLt7aTtPMQJJvQA7ho8vzGfiwL2r9KjJogFAV3fNfm8uQcnp'
      console.log("Fetching account details");
      let {account,error} = await fetchAccount({ publicKey: PublicKey.fromBase58(zkAppAddress)})
      console.log("Account details : ");
      console.log(JSON.stringify(account, null, 2));
      await Add.compile()
      const contract = new Add(PublicKey.fromBase58(zkAppAddress))
        
      try{
      let val = contract.key.get()
      console.log(`Found deployed zkapp, with state ${val.toBase58()}`);
      }catch(error){
        console.log(error);
      }
      
    })()
  },[])
  return (
    <div className="App">
      <h1>React app</h1>
    </div>
  );
}

export default App;
