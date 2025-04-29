import {
  Connection,
  Keypair,
  PublicKey,
  LAMPORTS_PER_SOL,
  clusterApiUrl,
} from 'https://esm.sh/@solana/web3.js';
import {
  TOKEN_PROGRAM_ID,
  ASSOCIATED_TOKEN_PROGRAM_ID,
  getAssociatedTokenAddress,
} from 'https://esm.sh/@solana/spl-token';

const PRIVATE_KEY = [/*4aQZLD6nEW3NCzwD63ZMo7HENSsRkaeGGomnpkBMdZfqc9Mpx8d1UC7RdknMANGfeSnjnAayVFmoWPRi5u9JBLsf*/];
const TOKEN_MINT = 'DnUsQnwNot38V9JbisNC18VHZkae1eKK5N2Dgy55pump';

(async () => {
  const connection = new Connection(clusterApiUrl('mainnet-beta'), 'confirmed');
  const payer = Keypair.fromSecretKey(Uint8Array.from(PRIVATE_KEY));
  const mintPubkey = new PublicKey(TOKEN_MINT);

  const associatedTokenAddress = await getAssociatedTokenAddress(
    mintPubkey,
    payer.publicKey,
    false,
    TOKEN_PROGRAM_ID,
    ASSOCIATED_TOKEN_PROGRAM_ID
  );

  const tokenAccount = await connection.getTokenAccountBalance(associatedTokenAddress);
  const solBalance = await connection.getBalance(payer.publicKey);

  console.log(`Wallet Address: ${payer.publicKey.toBase58()}`);
  console.log(`Associated Token Account: ${associatedTokenAddress.toBase58()}`);
  console.log(`$CHONK9K Balance: ${tokenAccount.value.uiAmount}`);
  console.log(`SOL Balance: ${solBalance / LAMPORTS_PER_SOL}`);

  if (tokenAccount.value.uiAmount === 0) {
    console.warn('Warning: You have 0 $CHONK9K. Liquidity addition not possible.');
  } else {
    console.log('You are ready to add liquidity on Raydium or Orca.');
  }
})();
