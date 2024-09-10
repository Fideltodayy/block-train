import { Core } from "@walletconnect/core";

// import the builder util
import { Web3Wallet } from "@walletconnect/web3wallet";
import { buildApprovedNamespaces, getSdkError } from "@walletconnect/utils";
const core = new Core({
  projectId: "3973b79d64a45c7f734b0a9532b7bcab",
});

export const web3wallet = await Web3Wallet.init({
  core, // <- pass the shared `core` instance
  metadata: {
    name: "Demo app",
    description: "Demo Client as Wallet/Peer",
    url: "www.walletconnect.com",
    icons: [],
  },
});
export async function onSessionProposal({ id, params }) {
  try {
    // ------- namespaces builder util ------------ //
    const approvedNamespaces = buildApprovedNamespaces({
      proposal: params,
      supportedNamespaces: {
        eip155: {
          chains: ["eip155:1", "eip155:137"],
          methods: ["eth_sendTransaction", "personal_sign"],
          events: ["accountsChanged", "chainChanged"],
          accounts: [
            "eip155:1:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
            "eip155:137:0xab16a96d359ec26a11e2c2b3d8f8b8942d5bfcdb",
          ],
        },
      },
    });
    // ------- end namespaces builder util ------------ //

    const session = await web3wallet.approveSession({
      id,
      namespaces: approvedNamespaces,
    });
    console.log("Session approved", session);
  } catch (error) {
    await web3wallet.rejectSession({
      id: params.id,
      reason: getSdkError("USER_REJECTED"),
    });
  }
}
web3wallet.on("session_proposal", onSessionProposal);
