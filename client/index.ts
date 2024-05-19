import * as alt from 'alt-client';

function handleToggleControls(value: boolean) {
    alt.toggleGameControls(value);
    alt.setConfigFlag('DISABLE_IDLE_CAMERA', !value);

}

alt.onServer('toggle:controls', handleToggleControls);
