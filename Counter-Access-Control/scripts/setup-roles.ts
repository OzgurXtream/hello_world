import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { makeContractCall, broadcastTransaction, TxOptions } from '@stacks/transactions';
import { getAccount } from '@stacks/auth';
import { Buffer } from 'buffer';

const network = new StacksTestnet(); // Change to StacksMainnet for mainnet deployment
const contractAddress = 'YOUR_CONTRACT_ADDRESS'; // Replace with your contract address
const contractName = 'counter-access-control';
const adminAddress = 'YOUR_ADMIN_ADDRESS'; // Replace with the admin address

async function setupRoles() {
  const account = await getAccount();
  
  const txOptions: TxOptions = {
    contractAddress,
    contractName,
    functionName: 'set-admin',
    functionArgs: [adminAddress],
    senderKey: account.stxPrivateKey,
    network,
  };

  const transaction = await makeContractCall(txOptions);
  const result = await broadcastTransaction(transaction, network);

  console.log('Transaction result:', result);
}

setupRoles().catch(console.error);