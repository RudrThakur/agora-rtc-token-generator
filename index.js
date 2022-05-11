const express = require("express");
const Agora = require("agora-access-token")
const app = express();


app.use(express.json());

app.get("/", (req, res) => res.send("Agora Auth Token Server"));


app.post("/rtctoken", (req, res) => {
    const appID = "xxxxxxxxxxxxxxxxxxxx";
    const appCertificate = "xxxxxxxxxxxxxxxxxxxxx";
    const expirationTimeInSeconds = 3600;
    const uid = Math.floor(Math.random() * 100000);
    const role = req.body.isPublisher ? Agora.RtcRole.PUBLISHER : Agora.RtcRole.SUBSCRIBER;
    const channel = req.body.channel;
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const expirationTimestamp = currentTimestamp + expirationTimeInSeconds;
  
    const token = Agora.RtcTokenBuilder.buildTokenWithUid(appID, appCertificate, channel, uid, role, expirationTimestamp);
    res.send({ uid, token });
  });


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Agora Auth Token Server listening at Port ${port}`));
