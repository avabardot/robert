import React from 'react'

export default function StartPanel(props) {
    console.log(props)
    if (props.show === false)
    return (
        null
    )
    return(
        <>
            <a-entity id="instructionpanel" position="0 3 1" geometry="height: 3; width: 3" material="opacity: 0.4; color: #e17a7a"><a-entity id="instructionslook" position="0 1 0" text__look_text="height: 3; value: TO LOOK; width: 3; align: center; zOffset: 0; color: #999999"></a-entity><a-entity id="instructionshowtolook" position="0 0.85 0" text__howtolook_text="height: 3; value: left-click + move mouse; width: 2; align: center; zOffset: 0; color: white; wrapCount: 25"></a-entity><a-entity id="instructionsClick" position="0 0.55 0" text__click_text="height: 3; value: TO ACTIVATE; width: 3; align: center; zOffset: 0; color: #999999"></a-entity><a-entity id="instructionsclickhowto" position="0 0.3 0" text__clickhowto_text="height: 3; value: center activation circle over object + wait; width: 2; align: center; zOffset: 0; wrapCount: 25"></a-entity><a-entity id="instructionscursor" position="0 -0.75 0" text__cursor_text="height: 3; value: ACTIVATION CIRCLE; width: 3; align: center; zOffset: 0; color: #999999"></a-entity><a-entity id="instructionscursorhowto" position="0 -0.95 0" text__cursorhowto_text="height: 3; value: white circle in middle of screen; width: 2; align: center; zOffset: 0; color: #fff; wrapCount: 28"></a-entity></a-entity>
            <a-entity id="backpanel" position="0 3 0" geometry="height: 2.8; width: 2" material="color: #101e28; emissive: #030e17; roughness: 1"></a-entity>

        </>
    )
}
