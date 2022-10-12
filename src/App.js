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
  const createTransaction = async(contract) =>{
    let feePayerKey = PrivateKey.fromBase58('EKF2FcWzLgCSAEoB3YQzYq8686Edf5DKzF9k5dddj3Fyzruat88n')
        let txn = await Mina.transaction({feePayerKey,fee: "100000000"}, () => {
          contract.giveAnswer(PublicKey.fromBase58('B62qosyTfXPG88qRH3K6MYAvevaQt8GcXsG4m9BwQEjNDf4KRazjv89'))
        });
        await txn.prove()
        await txn.send().wait()
  }
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
      await createTransaction(contract)
      try{
        console.log("Fetching state value with variable name 'key' : ")
      let val = contract.key.get()
      console.log(`key : ${val.toBase58()}`);
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
