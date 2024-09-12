import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { baseSepolia } from "thirdweb/chains";
import { useState } from "react";

export default function Navbar() {
  const { isLoggedIn, auth, logout } = useAuth();
  const [isConnected, setIsConnected] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-red-100 ">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <span className="text-orange-600 font-extrabold">
                <img
                  src="/blocktrain.webp"
                  className="bg-transparent w-16 h-18 border-2 p-0 "
                />
              </span>
              <span
                className="text-2xl font-bold ml-1"
                style={{ fontFamily: "Montserrat, sans-serif" }}
              >
                locktrain
              </span>
            </Link>

            <div className="flex justify-center items-center gap-8">
              <div className="hidden md:flex items-center space-x-4">
                {isLoggedIn && auth?.accessToken ? (
                  <>
                    <Link to="/dashboard" className="text-black font-bold">
                      Profile
                    </Link>
                    <Button onClick={logout} variant="secondary">
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link to="/login" className="text-black font-bold">
                      Login
                    </Link>
                    <Link to="/register" className="text-black font-bold">
                      Register
                    </Link>
                  </>
                )}
                <ConnectButton
                  client={createThirdwebClient({
                    clientId: "e9900fc3e52a13708fbee51ea40eea9f",
                  })}
                  wallets={[
                    createWallet("com.coinbase.wallet", {
                      walletConfig: {
                        options: "smartWalletOnly",
                      },
                      chains: [baseSepolia],
                    }),
                  ]}
                  onConnect={() => {
                    setIsConnected(true);
                  }}
                  style={{
                    backgroundColor: "#007bff",
                    color: "#ffffff",
                    padding: "10px 20px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    fontSize: "16px",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
