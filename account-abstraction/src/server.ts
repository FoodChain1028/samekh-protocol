import express, {Express, Request, Response} from 'express';
import path from 'path';

import address from "../scripts/simpleAccount/address";
import transfer from "../scripts/simpleAccount/transfer";

const app: Express = express();
const port = 5000;

app.use(express.static(path.join(__dirname, 'demo')));
app.use(express.json());

app.post('/getAddress', (req: Request, res: Response) => {
    const { signingKey } = req.body;
    console.log(`signingKey: ${signingKey}`);

    const getAddress = address(signingKey).then((userAddress) => {
        res.status(200).send({address: userAddress});
    });
});

app.post('/postTransfer', (req: Request, res: Response) => {
    const { toAddress, amount, signingKey } = req.body;
    console.log(`toAddress: ${toAddress}, amount: ${amount}`);
    if (!toAddress) {
        return res.status(400).send({ status: "failed" });
    }

    const mimcCLIopts = {
        withPM: false,
        dryRun: false,
        overrideBundlerRpc: undefined
    }
    const postTransfer = transfer(toAddress, amount, signingKey, mimcCLIopts).then(() => {
        res.status(200).send({status: "success"});
    });
});


app.listen(port, () => {
    console.log(`Server has started on http://localhost:${port}`)
});
