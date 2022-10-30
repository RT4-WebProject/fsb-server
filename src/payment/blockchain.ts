import { address, abi } from './abi.json';
import { ethers } from 'ethers';

const provider = new ethers.providers.InfuraProvider(
  'goerli',
  '63750a373503450dbe2177ee16608f13',
);

const contract = new ethers.Contract(address, abi, provider);

export const register = async (from, to, amount) => {
  const tx = await contract
    .connect(
      new ethers.Wallet(
        'd916c7f12fd4585c3000a97249ad3559fb1fa2b1c58a638868df20c900063bb9',
        provider,
      ),
    )
    .donate(from, to, amount);
  await tx.wait();

  return tx.hash;
};
