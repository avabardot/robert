import React from 'react'

export default function ParticleSystem() {
    // Without an explicit texture the dust preset pulls one from cdn.rawgit.com,
    // which shut down in 2019, so the dust came up untextured.
    return (
        <a-entity id="Dust" position="0 2.25 -15" particle-system="color: #EF0000,#44CC00; preset: dust; texture: /vendor/particles/smokeparticle.png"></a-entity>
    )
}
