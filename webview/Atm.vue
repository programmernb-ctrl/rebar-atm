<template>
    <div
        class="carousel-container fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 scale-95 transform rounded-3xl bg-gray-900 bg-opacity-70 p-8 text-white shadow-2xl ring-4 ring-white ring-opacity-30 transition-transform duration-700 ease-in-out hover:scale-100"
        :class="{ 'slide-in': hasLoaded }"
    >
        <div class="zone-selector mb-5 w-full">
            <input
                type="number"
                id="number-input"
                min="0"
                v-model="amount"
                class="w-full appearance-none rounded border-2 border-white px-3 py-2 leading-tight text-gray-700 shadow transition-colors duration-300 focus:border-green-500 focus:outline-none"
                placeholder="0"
            />
            <p v-if="errorMessage" class="mt-2 text-sm text-red-500">{{ errorMessage }}</p>
        </div>

        <div class="carousel-content flex w-full items-center justify-between border-b border-t border-gray-600 py-4">
            <div class="tattoo-details mx-4 w-full text-center">
                <p class="text-lg font-semibold">
                    <strong>{{ t('cash') }}</strong> {{ '$' + cash }}
                </p>
                <p class="text-lg font-semibold">
                    <strong>{{ t('bank') }}</strong> {{ '$' + bank }}
                </p>
            </div>
        </div>

        <div class="actions mt-5 flex justify-between">
            <button
                class="close-button rounded-md bg-red-600 p-3 text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
                @click="close"
            >
                {{ t('exit') }}
            </button>
            <button
                class="close-button rounded-md bg-red-600 p-3 text-white transition-all duration-300 hover:bg-red-700 hover:shadow-lg"
                @click="deposit"
            >
                {{ t('deposit') }}
            </button>
            <button
                class="buy-button rounded-md bg-green-600 p-3 text-white transition-all duration-300 hover:bg-green-700 hover:shadow-lg"
                @click="withdraw"
            >
                {{ t('withdraw') }}
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useEvents } from '@Composables/useEvents';

import { useTranslate } from '@Shared/translate';
import '../translate/index';
const { t } = useTranslate('en');

const events = useEvents();
const hasLoaded = ref(false);

const cash = ref<number>(2000);
const bank = ref<number>(3000);
const amount = ref<number | null>(null);
const errorMessage = ref<string>('');
const succesMessage = ref<string>('');

events.on('atm:update', (var1: number, var2: number) => {
    cash.value = var2;
    bank.value = var1;
});

const deposit = () => {
    if (amount.value === null || amount.value <= 0) {
        setErrorMessage(t('justpositiv'));
    } else if (amount.value > cash.value) {
        setErrorMessage(t('lessmoney'));
    } else {
        events.emitServer(`Atm:deposit`, amount.value);
        setsuccesMessage(t('succesmsg'));
    }
};

const withdraw = () => {
    if (amount.value === null || amount.value <= 0) {
        setErrorMessage(t('justpositiv'));
    } else if (amount.value > bank.value) {
        setErrorMessage(t('lessbank'));
    } else {
        events.emitServer(`Atm:withdraw`, amount.value);
        setsuccesMessage(t('succesmsg'));
    }
};

const setErrorMessage = (message: string) => {
    errorMessage.value = message;
    setTimeout(() => {
        errorMessage.value = '';
    }, 5000);
};

const setsuccesMessage = (message: string) => {
    succesMessage.value = message;
    setTimeout(() => {
        succesMessage.value = '';
    }, 5000);
};

const close = () => {
    events.emitServer(`Atm:Close`);
};
</script>

<style scoped>
.carousel-container {
    user-select: auto;
}

.carousel-container.slide-in {
    transform: translate(-50%, -50%) scale(1);
}
</style>
