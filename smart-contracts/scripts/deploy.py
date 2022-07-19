from brownie import VerifyNftOwnership, network, accounts, config

def get_account(id = None):
  if network.show_active() in ["development", "ganache-local"]:
    if id == None:
      return accounts[0]
    else:
      return accounts[id]
  else:
    return accounts.add(config["wallets"]["from_key"])

def deploy_VerifyNftOwnership(account):
  print(f'Deploying from account {account} ...')
  verifyNftOwnership = VerifyNftOwnership.deploy({"from": account})
  print(f"Contract deployed to {verifyNftOwnership.address}")
  return verifyNftOwnership

def main():
  if network.show_active() != "polygon-test":
    print(network.show_active())
    sys.exit("Only polygon-test network is supported.")
  account = get_account()
  verifyNftOwnership = deploy_VerifyNftOwnership(account)