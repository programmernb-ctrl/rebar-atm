<template>
  <div
    class="carousel-container fixed left-5 top-1/2 transform -translate-y-1/2 bg-opacity-70 bg-gray-900 text-white p-6 rounded-lg shadow-lg transition-transform duration-500 ease-in-out"
    :class="{ 'slide-in': hasLoaded }">
    <div class="zone-selector mb-5 w-full">
      <input type="number" id="number-input" min="0" v-model="amount" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="0">
      <p v-if="errorMessage" class="text-red-500 text-sm mt-2">{{ errorMessage }}</p>
    </div>

    <div class="carousel-content flex items-center justify-between w-full">
      <div class="tattoo-details mx-4 w-full text-center">
        <p><strong>{{ t('cash') }}</strong> {{ '$' + cash }}</p>
        <p><strong>{{ t('bank') }}</strong> {{ '$' + bank }}</p>
      </div>
    </div>

    <div class="actions mt-5 flex justify-between">
      <button class="close-button p-2 bg-red-600 text-white rounded-md hover:bg-red-700" @click="close">{{  t('exit') }}</button>
      <button class="close-button p-2 bg-red-600 text-white rounded-md hover:bg-red-700" @click="deposit">{{  t('deposit') }}</button>
      <button class="buy-button p-2 bg-green-600 text-white rounded-md hover:bg-green-700" @click="withdraw">{{ t('withdraw') }}</button>
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
    setErrorMessage(t('justpositiv'))
  } else if (amount.value > cash.value) {
    setErrorMessage(t('lessmoney'))
  } else (
    events.emitServer(`Atm:deposit`, amount.value),
    setsuccesMessage(t('succesmsg'))
  )
};

const withdraw = () => {
  if (amount.value === null ||amount.value <= 0) {
    setErrorMessage(t('justpositiv'))
  } else if (amount.value > bank.value) {
    setErrorMessage(t('lessbank'))
  } else (
    events.emitServer(`Atm:withdraw`, amount.value),
    setsuccesMessage(t('succesmsg'))
  )
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
  user-select: none;
}

.carousel-container.slide-in {
  transform: translateY(-50%) translateX(0);
}
</style>