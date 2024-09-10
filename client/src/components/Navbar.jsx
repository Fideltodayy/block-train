import { Link } from "react-router-dom";
import useAuth from "@/hooks/useAuth";
import { Button } from "./ui/button";
import { ConnectButton } from "thirdweb/react";
// import { ConnectEmbed } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet } from "thirdweb/wallets";

const client = createThirdwebClient({
  clientId: "e9900fc3e52a13708fbee51ea40eea9f",
});

const wallets = [
  inAppWallet(),
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
];

export default function Navbar() {
  const { isLoggedIn, auth, logout } = useAuth();
  return (
    <>
      <header className="sticky top-0 z-50 bg-red-100 ">
        <div className="container mx-auto p-4">
          <div className="flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold">
              <img src="chesed-logo.png" alt="Logo" width="150" height="37" />
            </Link>
            <div className="flex justify-center items-center gap-8">
              <div className="hidden md:flex space-x-4 ">
                <Link
                  to="/"
                  className="text-black  font-bold hover:text-orange-600"
                >
                  Home
                </Link>
                <Link
                  to="/courses"
                  className="text-black  font-bold hover:text-orange-600"
                >
                  Courses
                </Link>
                <Link
                  to="/blogs"
                  className="text-black  font-bold hover:text-orange-600"
                >
                  Blogs
                </Link>
              </div>
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
                    <div className=" bg-black">
                      <ConnectButton client={client} wallets={wallets} />
                    </div>
                    <Link to="/login" className="text-black font-bold">
                      Login
                    </Link>
                    <Link to="/register" className="text-black font-bold">
                      Register
                    </Link>
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
