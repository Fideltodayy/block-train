import { useState } from "react";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { base, sepolia } from "thirdweb/chains";

const PaymentUI = () => {
  const [connected, setConnected] = useState(false);
  const [payeeAddress, setPayeeAddress] = useState("");
  const [amount, setAmount] = useState(0);

  const handleConnect = () => {
    setConnected(true);
  };

  const handleSendToEscrow = () => {
    if (!payeeAddress || amount <= 0) {
      alert("Please enter a valid payee address and amount.");
      return;
    }
    // Logic to send tokens to escrow
    alert(`Sent ${amount} tokens to ${payeeAddress} in escrow!`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Pay the tutor</h1>
        <p style={styles.subtitle}>Secure payments using escrow</p>

        <div style={styles.connectSection}>
          {!connected ? (
            <ConnectButton
              client={createThirdwebClient({
                clientId: "your-thirdweb-client-id-goes-here",
              })}
              wallets={[
                createWallet("com.coinbase.wallet", {
                  walletConfig: {
                    options: "smartWalletOnly",
                  },
                  chains: [base, sepolia],
                }),
              ]}
              onConnect={handleConnect}
              style={styles.connectButton}
            />
          ) : (
            <p style={styles.connectedMessage}>Wallet Connected!</p>
          )}
        </div>

        {connected && (
          <>
            <div style={styles.inputSection}>
              <label style={styles.label}>Payee Address</label>
              <input
                style={styles.input}
                type="text"
                value={payeeAddress}
                onChange={(e) => setPayeeAddress(e.target.value)}
                placeholder="Enter recipient's wallet address"
              />
            </div>

            <div style={styles.inputSection}>
              <label style={styles.label}>Amount (in tokens)</label>
              <input
                style={styles.input}
                type="number"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
              />
            </div>

            <button style={styles.sendButton} onClick={handleSendToEscrow}>
              Send to Escrow
            </button>
          </>
        )}
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
