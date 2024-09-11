import { useState, useEffect } from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet, smartWallet } from "thirdweb/wallets";
import { baseSepolia } from "thirdweb/chains";
import {
  newAgreement,
  deposit,
  agree,
  releaseFunds,
} from "../../../contracts/index";

const PaymentUI = () => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [payeeAddress, setPayeeAddress] = useState("");
  const [arbitratorAddress, setArbitratorAddress] = useState(
    "0x5A883D2b78929260b8A555f3D3a187764131f9C8"
  );
  const [amount, setAmount] = useState(1);

  const client = createThirdwebClient({
    clientId: "e9900fc3e52a13708fbee51ea40eea9f",
  });

  useEffect(() => {
    if (connected) {
      fetchAccount();
    }
  }, [connected]);

  const fetchAccount = async () => {
    try {
      const accounts = await client.wallet.getAddresses();
      if (accounts.length > 0) {
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Error fetching account:", error);
    }
  };

  const handleCreateAgreement = async () => {
    if (!payeeAddress || !arbitratorAddress || amount <= 0) {
      alert(
        "Please enter valid payee address, arbitrator address, and amount."
      );
      return;
    }
    try {
      const result = await newAgreement(
        payeeAddress,
        arbitratorAddress,
        amount,
        account
      );
      console.log("Agreement created:", result);
      alert(`Agreement created successfully!`);
    } catch (error) {
      console.error("Error creating agreement:", error);
      alert("Error creating agreement. Check console for details.");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Create Escrow Agreement</h1>
        <p style={styles.subtitle}>Secure payments using escrow</p>

        <div style={styles.connectSection}>
          {!connected ? (
            <ConnectButton
              client={client}
              wallets={[
                smartWallet("com.coinbase.wallet", {
                  walletConfig: {
                    options: "smartWalletOnly",
                  },
                  chains: [baseSepolia],
                  sponsorGas: true, // enable sponsored transactions
                }),
              ]}
              onConnect={() => handleCreateAgreement()}
              style={styles.connectButton}
            />
          ) : (
            <p style={styles.connectedMessage}>Wallet Connected: {account}</p>
          )}
        </div>
      </div>
    </div>
  );
};
const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f2f5",
    fontFamily: "'Helvetica Neue', sans-serif",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    width: "400px",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    color: "#333",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "14px",
    color: "#777",
    marginBottom: "30px",
  },
  connectSection: {
    marginBottom: "20px",
  },
  connectButton: {
    backgroundColor: "#007bff",
    color: "#ffffff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
  connectedMessage: {
    color: "#28a745",
    fontSize: "16px",
    fontWeight: "bold",
  },
  inputSection: {
    marginBottom: "20px",
  },
  label: {
    display: "block",
    fontSize: "14px",
    color: "#555",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  sendButton: {
    backgroundColor: "#28a745",
    color: "#ffffff",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "16px",
  },
};

export default PaymentUI;
