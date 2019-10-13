
interface SMSimpleKeys {
    twilio?: {
        accountSid: string;
        authToken: string;
    };
    telesign?: {
        customerId: string;
        apiKey: string;
        rest_endpoint?: string;
        timeout?: number;
    };
    simwood?: {
        account: string;
        username: string;
        password: string;
    };
}

type ValidPhoneNumber = string;

export class SMSimple {
    private keys: SMSimpleKeys;
    constructor(keys: SMSimpleKeys) {
        this.keys = keys;
    }

    public normalise(phoneNumber: string, countryCode: string = '44'): ValidPhoneNumber {
        let _phoneNumber = phoneNumber.slice().replace(/[^0-9]/g, '');
        if (_phoneNumber.startsWith('07')) {
            _phoneNumber = countryCode + _phoneNumber.slice(1); // TODO: Understand phone numbers better
        }
        if (_phoneNumber.length <= 10) {
            _phoneNumber = countryCode + _phoneNumber;
        }
        return '+' + _phoneNumber as ValidPhoneNumber;
    }

    public twilio(from: ValidPhoneNumber, to: ValidPhoneNumber, body: string) {
        if (!this.keys.twilio) {
            return Promise.reject(new Error(`Could not find Twilio keys (required: accountSid, authToken)`));
        }
        const tClient = require('twilio')(this.keys.twilio.accountSid, this.keys.twilio.authToken);
        return tClient.messages
            .create({
                body,
                from,
                to,
            });
    }

    public telesign(to: ValidPhoneNumber, body: string) {
        if (!this.keys.telesign) {
            return Promise.reject(new Error(`Could not find Telesign keys (required: customerId, apiKey)`));
        }
        const TeleSignSDK = require('telesignsdk');
        const { customerId, apiKey, rest_endpoint, timeout } = this.keys.telesign;
        const tsClient = new TeleSignSDK(
            customerId,
            apiKey,
            rest_endpoint || 'https://rest-api.telesign.com',
            timeout,
        );

        return new Promise((resolve, reject) => {
            tsClient.sms.message((err: any) => {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            }, to, body, 'ARN');
        });
    }

    public simwood(from: ValidPhoneNumber, to: ValidPhoneNumber, body: string) {
        if (!this.keys.simwood) {
            return Promise.reject(new Error(`Could not find Simwood keys (required: customerId, apiKey)`));
        }

        const simwood = require('simwood-api-node').init(
            this.keys.simwood,
        );

        return simwood.messagingSmsSend(from, to, body);
    }
}
