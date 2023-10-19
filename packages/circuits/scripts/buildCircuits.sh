#!/bin/bash
set -e

cd "$(dirname "$0")"

mkdir -p ../build/contracts
mkdir -p ../build/setup

# Build context
# installing power of Tau
cd ../build
echo -e "\033[36m----------------------\033[0m"
echo -e "\033[36mSETTING UP ENVIRONMENT\033[0m"
echo -e "\033[36m----------------------\033[0m"
if [ -f ./powersOfTau28_hez_final_16.ptau ]; then
    echo -e "\033[33mpowersOfTau28_hez_final_16.ptau already exists. Skipping.\033[0m"
else
    echo -e "\033[33mDownloading powersOfTau28_hez_final_16.ptau\033[0m"
    wget https://hermez.s3-eu-west-1.amazonaws.com/powersOfTau28_hez_final_16.ptau
fi

circuit_dir="../circuits"

circuit_name="samekh"
circuit_path="$circuit_dir/$circuit_name.circom"
# zkeypath="$build/$circuit_name"

if ! [ -x "$(command -v circom)" ]; then
    echo -e '\033[31mError: circom is not installed.\033[0m' >&2
    echo -e '\033[31mError: please install circom: https://docs.circom.io/getting-started/installation/.\033[0m' >&2
    exit 1
fi

echo -e "Circuit path: $circuit_path"
echo -e "\033[36m-----------------\033[0m"
echo -e "\033[36mCOMPILING CIRCUIT\033[0m"
echo -e "\033[36m-----------------\033[0m"

echo -e "\033[36mBuild Path: $PWD\033[0m"

circom --version
circom $circuit_path --r1cs --wasm --sym
npx snarkjs r1cs export json build/$circuit_name.r1cs

cp ${circuit_name}_js/${circuit_name}.wasm ../build

echo -e "\033[36mRunning groth16 trusted setup\033[0m"

npx snarkjs groth16 setup build/$circuit_name.r1cs build/powersOfTau28_hez_final_16.ptau build/setup/circuit_00000.zkey

# for the circuits-based trusted setup (phase 2)
npx snarkjs zkey contribute build/setup/circuit_00000.zkey build/setup/circuit_00001.zkey --name="First contribution" -v -e="Random entropy"
npx snarkjs zkey contribute build/setup/circuit_00001.zkey build/setup/circuit_00002.zkey --name="Second contribution" -v -e="Another random entropy"
npx snarkjs zkey beacon build/setup/circuit_00002.zkey build/$circuit_name.zkey 0102030405060708090a0b0c0d0e0f101112131415161718191a1b1c1d1e1f 10 -n="Final Beacon phase2"

echo -e "Exporting artifacts to zkeyFiles and contracts directory"

npx snarkjs zkey export verificationkey build/$circuit_name.zkey build/${circuit_name}_vkey.json
npx snarkjs zkey export solidityverifier build/$circuit_name.zkey build/contracts/verifier.sol