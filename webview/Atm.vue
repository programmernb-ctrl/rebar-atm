<template>
  <div id="atm">
    <div class="modal">
      <div class="money-group">
        <div class="cash">
        <h2>{{ t('cash') }} :</h2>
        <h2>{{ cash }} $</h2>
      </div>
      <div class="money-spacing"></div>
      <div class="balance">
        <h2>{{ t('bank') }} :</h2>
        <h2>{{ bank }} $</h2>
      </div>
      </div>
      <div class="actions">
        <div v-if="errorMessage" class="error-message">
          <FONT COLOR="#ff0000"> {{ errorMessage }} </FONT>
        </div>
        <div v-if="succesMessage" class="succes-message">
          <FONT COLOR="#04B404"> {{ succesMessage }} </FONT>
        </div>
        <input type="number" v-model="amount" min="0" placeholder='0'>
        <div class="button-group">
          <button @click="deposit">{{  t('deposit') }}</button>
          <div class="button-spacing"></div>
          <button @click="withdraw">{{  t('withdraw') }}</button>
        </div>
      </div>
      <button @click="exit">{{  t('exit') }}</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEvents } from '../../../../webview/composables/useEvents';
const events = useEvents();
import { ref, computed } from 'vue';

import '../translate/index'; 
import { useTranslate } from '@Shared/translate';
const { t } = useTranslate('hu');


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
  if (amount.value <= 0) {
    setErrorMessage(t('justpositiv'))
  } else if (amount.value > cash.value) {
    setErrorMessage(t('lessmoney'))
  } else (
    events.emitServer(`Atm:deposit`, amount.value),
    setsuccesMessage(t('succesmsg'))
  )
};

const withdraw = () => {
  if (amount.value <= 0) {
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


const exit = () => {
  events.emitServer(`Atm:Close`);
};
</script>

<style>
#atm {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.modal {
  width: 400px;
  height: 300px;
  background-color: #f0f0f0;
  border: 2px solid #333;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.cash, .balance {
  margin-bottom: 20px;
}

.actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

input {
  width: 150px;
  margin-bottom: 10px;
  text-align: center
}

.button-spacing {
  width: 10px; /* Itt állíthatod be a részt a gombok között */
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.money-spacing {
  width: 10px; /* Itt állíthatod be a részt a gombok között */
}

.money-group {
  display: flex;
  justify-content: space-between;
}

button {
  width: 150px;
  background-color: #ffffff;
  margin: 0 auto;
  margin-bottom: 10px;
}
</style>
