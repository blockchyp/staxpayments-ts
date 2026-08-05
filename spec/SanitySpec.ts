import { StaxPaymentsClient } from '../src/staxpaymentsclient';
import { StaxApiCredentials } from '../src/client';

describe("SanityTest", () => {
  const client = new StaxPaymentsClient(new StaxApiCredentials('<your-stax-bearer-token>'));

  it("Should Exist", () => {
    expect(client).toBeDefined();
    expect(client.payments).toBeDefined();
    expect(client.terminals).toBeDefined();
  });

  it("Should Fetch Heartbeat", (done) => {
    client.setGatewayHost('https://api.blockchyp.com/');
    client.heartbeat()
      .then((response: any) => {
        const hb = response.data;
        expect(hb.success).toBe(true);
        expect(hb.timestamp).toBeDefined();
        expect(hb.latestTick).toBeDefined();
        done();
      })
      .catch((error: any) => {
        console.log("Error:", error);
        done();
      });
  });
});
