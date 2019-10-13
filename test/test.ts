import { SMSimple } from '../src/index';
import test from 'blue-tape';

test(`phoneNumber normalisation works`, async (t) => {
    const smSimple = new SMSimple({});
    t.equal(smSimple.normalise('+447392055826'), '+447392055826');
    t.equal(smSimple.normalise('07392055826'), '+447392055826');
    t.equal(smSimple.normalise('5392059386', '1'), '+15392059386');
});

test(`Throws errors when keys are missing`, async (t) => {
    const smSimple = new SMSimple({});
    try {
        await smSimple.twilio('', '', 'Test');
    } catch (err) {
        t.ok('Throws when missing Twilio keys');
    }
    try {
        await smSimple.simwood('', '', 'Test');
    } catch (err) {
        t.ok('Throws when missing Simwood keys')
    }
    try {
    } catch (err) {
        await smSimple.telesign('', '');
    }
    t.ok('Throws when missing Telesign keys');
});

// test(`Runs when keys are present`, async (t) => {
//     const smSimple = new SMSimple({
//         twilio: {} as any,
//         simwood: {} as any,
//         telesign: {} as any,
//     });
//     try {
//         await smSimple.twilio('', '', 'Test');
//     } catch (err) {
//     }
//     try {
//         await smSimple.simwood('', '', 'Test');
//     } catch (err) {
//     }
//     try {
//     } catch (err) {
//         await smSimple.telesign('', '');
//     }
// });
