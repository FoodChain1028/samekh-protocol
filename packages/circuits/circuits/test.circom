pragma circom 2.1.0;
include "../../../node_modules/circomlib/circuits/poseidon.circom";
include "./utils.circom";

template Samekh () {
    signal input x;
}

component main { public[x] } = Samekh();

