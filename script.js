const connectBtn = document.getElementById("connectBtn");
const walletAddress = document.getElementById("walletAddress");

const SEPOLIA_CHAIN_ID = "0xaa36a7";

connectBtn.onclick = async () => {
  if (typeof window.ethereum === "undefined") {
    alert("MetaMask is not installed!");
    return;
  }

  try {
    // 1. Request wallet connection
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    // 2. Get current chain
    const currentChainId = await window.ethereum.request({
      method: "eth_chainId",
    });

    // 3. Force switch to Sepolia if needed
    if (currentChainId !== SEPOLIA_CHAIN_ID) {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: SEPOLIA_CHAIN_ID }],
      });
    }

    walletAddress.innerText = `Connected: ${accounts[0]}`;
  } catch (error) {
    console.error(error);
    walletAddress.innerText = "Connection failed ❌";
  }
};
