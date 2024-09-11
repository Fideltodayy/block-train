import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { createThirdwebClient } from "thirdweb";
import { ConnectButton } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { base, sepolia } from "thirdweb/chains";

export default function Navbar() {
  const { isLoggedIn, auth, logout } = useAuth();
  return (
    <>
      <header className="sticky top-0 z-50 bg-red-100 ">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold flex items-center">
              <span className=" text-orange-600">B</span>
              <span>locktrain</span>
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
                    />
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
