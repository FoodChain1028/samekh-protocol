pragma circom 2.1.0;
include "../../../node_modules/circomlib/circuits/poseidon.circom";
include "./utils.circom";

// 

template Samekh (DEPTH) {
    
    // private inputs
    signal input identitySecret;
    signal input pathElements[DEPTH];
    signal input identityPathIndex[DEPTH];
    
    // output
    signal output root;

    signal identityCommitment <== Poseidon(1)([ identitySecret ]);

    root <== MerkleTreeInclusionProof(DEPTH)(
        identityCommitment,
        identityPathIndex,
        pathElements
    );
}

component main = Samekh(20);

