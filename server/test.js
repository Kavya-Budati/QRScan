const dns = require("dns");

dns.resolveSrv(
  "_mongodb._tcp.cluster0.wmnq3kw.mongodb.net",
  (err, addresses) => {
    if (err) {
      console.error("DNS ERROR:", err);
      return;
    }

    console.log("SRV Records:");
    console.log(addresses);
  }
);