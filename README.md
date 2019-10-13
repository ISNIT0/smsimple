# SMSimple 😖🤳
Sending SMS messages is easy, but all the different providers have different APIs.<br />
SMSimple makes it easy to use any provider without installing countless libraries, in a type-safe way.

## Usage
```typescript
import { SMSimple } from 'smsimple';

const smSimple = new SMSimple({ // All provider credentials are optional
    simwood: {
        account: string,
        username: string,
        password: string,
    },
    twilio: {
        accountSid: string,
        authToken: string,
    },
    telesign: {
        customerId: string,
        apiKey: string,
        rest_endpoint?: string,
        timeout?: number,
    },
});

const normalisedNumber: ValidPhoneNumber = smSimple.normalise('07472955629');

smSimple.simwood(fromNumber, toNumber, messageBody);
smSimple.twilio(fromNumber, toNumber, messageBody);
smSimple.telesign(fromNumber, toNumber, messageBody);

```

[./LICENSE](./LICENSE) - MIT

💖 Built by [Joe](https://simmsreeve.com) at [TADHack London 2019](https://tadhack.com/2019/) 💖