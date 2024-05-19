import { useTranslate } from '@Shared/translate.js';
const { setBulk } = useTranslate();

setBulk({
    en: {
        'cash': 'Cash',
        'bank': 'Bank',
        'deposit': 'Deposit',
        'withdraw': 'Withdraw',
        'exit': 'Exit',
        'justpositiv': 'Value must be positiv',
        'lessmoney': 'Value must be less than cash',
        'lessbank': 'Value must be less than bank',
        'succestitle': 'Succes',
        'succesmsg': 'Transaction succes.',
        'openatm': 'ATM - Press E button',
        'sucdep': 'You have deposited:',
        'sucwit': 'You have withdrawed:',
    },
    hu: {
        'cash': 'Készpénz',
        'bank': 'Bank',
        'deposit': 'Befizetés',
        'withdraw': 'Kifizetés',
        'exit': 'Kilépés',
        'justpositiv': 'Pozitív egész számot adj meg!',
        'lessmoney': 'Nincs nálad ennyi pénz',
        'lessbank': 'Nincs a számládon ennyi pénz',
        'succestitle': 'Siker',
        'succesmsg': 'Sikeres tranzakció',
        'openatm': 'ATM - Nyomj E gombot',
    },
});