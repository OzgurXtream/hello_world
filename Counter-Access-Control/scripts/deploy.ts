import { StacksTestnet, StacksMainnet } from '@stacks/network';
import { deployContract } from '@stacks/transactions';
import { getAccount } from './utils';

const network = process.env.NETWORK === 'mainnet' ? StacksMainnet : StacksTestnet;

async function deploy() {
  const account = await getAccount();
  
  const contractName = 'counter-access-control';
  const contractSource = await fetch(`./contracts/${contractName}.clar`).then(res => res.text());

  const transaction = await deployContract({
    contractName,
    contractSource,
    network,
    senderKey: account.secretKey,
  });

  console.log(`Contract deployed at: ${transaction.contractAddress}`);
}

deploy().catch(console.error);