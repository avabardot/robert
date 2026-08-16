import React, { useRef } from "react";
import * as Tone from "tone";

const SwanSong = () => {
  const playASongButton = useRef();
  const stopASongButton = useRef();

  let randomMoodScale;
  let sequence1;
  let sequence2;
  let sequence3;
  let sequence4;
  //holds string version of random songs array positions
  let rootArray = [];
  let thirdArray = [];
  let sixthArray = [];

  //Final Melody
  let rootMelody = [];
  let thirdMelody = [];
  let sixthMelody = [];

  //Defining all major and minor scales
  const scales = [
    ["C", "D", "E", "F", "G", "A", "B"],
    ["G", "A", "B", "C", "D", "E", "F#"],
    ["D", "E", "F#", "G", "A", "B", "C#"],
    ["A", "B", "C#", "D", "E", "F#", "G#"],
    ["E", "F#", "G#", "A", "B", "C#", "D#"],
    ["B", "C#", "D#", "E", "F#", "G#", "A#"],
    ["F#", "G#", "A#", "B", "C#", "D#", "E#"],
    ["C#", "D#", "E#", "F#", "G#", "A#", "B#"],
    ["Cb", "Db", "Eb", "Fb", "Gb", "Ab", "Bb"],
    ["Gb", "Ab", "Bb", "Cb", "Db", "Eb", "F"],
    ["Db", "Eb", "F", "Gb", "Ab", "Bb", "Cb"],
    ["Ab", "Bb", "C", "Db", "Eb", "F", "G"],
    ["Eb", "F", "G", "Ab", "Bb", "C", "D"],
    ["Bb", "C", "D", "Eb", "F", "G", "A"],
    ["F", "G", "A", "Bb", "C", "D", "E"],
  ];

  //Defining common chord progressions for a 3 note chord (root, third, sixth);
  const chordProgressionsRoot = [
    [0, 4, 5, 3],
    [4, 5, 3, 0],
    [5, 3, 0, 4],
    [3, 0, 4, 5],
  ];
  const chordProgressionsThird = [
    [2, 6, 0, 5],
    [6, 0, 5, 2],
    [0, 5, 2, 6],
    [5, 2, 6, 0],
  ];
  const chordProgressionsSixth = [
    [4, 1, 2, 0],
    [1, 2, 0, 4],
    [2, 0, 4, 1],
    [0, 4, 1, 2],
  ];

  //Picking random major/minor scale for song
  function pickRandomScale() {
    randomMoodScale = scales[Math.floor(Math.random() * scales.length)];
    //console.log(randomMoodScale);
  }

  //Picking 4 chord progression sequences to form song
  function pickRandomChordProgression() {
    sequence1 = Math.floor(Math.random() * 4);
    sequence2 = Math.floor(Math.random() * 4);
    sequence3 = Math.floor(Math.random() * 4);
    sequence4 = Math.floor(Math.random() * 4);
    pickRandomChordProgressionRoot();
    pickRandomChordProgressionThird();
    pickRandomChordProgressionSixth();
    //console.log(sequence1, sequence2, sequence3, sequence4);
  }

  //Function to grab scale array note placements for rooth, third and sixth
  function pickRandomChordProgressionRoot() {
    rootArray.push(
      `${chordProgressionsRoot[sequence1]},${chordProgressionsRoot[sequence2]},${chordProgressionsRoot[sequence3]},${chordProgressionsRoot[sequence4]}`.split(
        ","
      )
    );
    //console.log(rootArray);
  }

  function pickRandomChordProgressionThird() {
    thirdArray.push(
      `${chordProgressionsThird[sequence1]},${chordProgressionsThird[sequence2]},${chordProgressionsThird[sequence3]},${chordProgressionsThird[sequence4]}`.split(
        ","
      )
    );
    //console.log(thirdArray);
  }

  function pickRandomChordProgressionSixth() {
    sixthArray.push(
      `${chordProgressionsSixth[sequence1]},${chordProgressionsSixth[sequence2]},${chordProgressionsSixth[sequence3]},${chordProgressionsSixth[sequence4]}`.split(
        ","
      )
    );
  }

  //Call all root chord sequence formulas
  function defineChordSequence() {
    rootChordSequence();
    thirdChordSequence();
    sixthChordSequence();
    //console.log(thirdMelody);
  }

  //Functions to define Root Chord Sequences
  function rootChordSequence() {
    //console.log(randomMoodScale);
    //console.log(rootArray[0]);
    rootMelody = rootArray[0].map(
      (element) => randomMoodScale[parseInt(element)]
    );
    //console.log(rootMelody);
  }

  function thirdChordSequence() {
    //console.log(randomMoodScale);
    //console.log(thirdArray[0]);
    thirdMelody = thirdArray[0].map(
      (element) => randomMoodScale[parseInt(element)]
    );
  }

  function sixthChordSequence() {
    //console.log(randomMoodScale);
    //console.log(sixthArray[0]);
    sixthMelody = sixthArray[0].map(
      (element) => randomMoodScale[parseInt(element)]
    );
    //console.log(sixthMelody);
  }

  let root = [];
  let third = [];
  let sixth = [];

  //Give the root of the chord piano placement (i.e Define placement of note in variance of middle C)
  function rootSynthPlacement() {
    randomScale();
    root = rootMelody.map(
      (element) =>
        element + letterArray[Math.floor(Math.random() * letterArray.length)]
    );
    console.log(root);
  }

  function thirdSynthPlacement() {
    randomScale();
    third = thirdMelody.map(
      (element) =>
        element + letterArray[Math.floor(Math.random() * letterArray.length)]
    );
    console.log(third);
  }

  function sixthSynthPlacement() {
    randomScale();
    sixth = sixthMelody.map(
      (element) =>
        element + letterArray[Math.floor(Math.random() * letterArray.length)]
    );
    console.log(sixth);
  }

  //Call to get final arrangments for three parts
  function finalSynthCall() {
    rootSynthPlacement();
    thirdSynthPlacement();
    sixthSynthPlacement();
  }

  //Generate Random placements of notes/distance from middle C
  let x;
  let y;
  let z;
  let a;
  let b;
  let c;
  let letterArray = [];

  function randomScale() {
    for (var i = 0; i < 10; i++);
    {
      x = Math.floor(Math.random() * 4) + 2;
      y = Math.floor(Math.random() * 4) + 2;
      z = Math.floor(Math.random() * 4) + 2;
      a = Math.floor(Math.random() * 4) + 2;
      b = Math.floor(Math.random() * 4) + 2;
      c = Math.floor(Math.random() * 5) + 1;
    }
    letterArray.push(x, y, z, a, b, c);
    //console.log(letterArray);
  }

  function createSong() {
    pickRandomOscillator();
    pickRandomScale();
    pickRandomChordProgression();
    defineChordSequence();
    finalSynthCall();
  }

  randomScale();
  //Pick random oscillators
  let randomOscillator1;
  let randomOscillator2;
  let randomOscillator3;
  let randomOscillator4;
  let randomOscillator5;
  let randomOscillator6;

  const randomOscillators = [
    { randomOscillator1 },
    { randomOscillator2 },
    { randomOscillator3 },
    { randomOscillator4 },
    { randomOscillator5 },
    { randomOscillator6 },
  ];

  function pickRandomOscillator() {
    randomOscillators.forEach((element) => {
      element = oscillators[Math.floor(Math.random() * oscillators.length)];
      console.log(element);
      return element;
    });
  }
  const oscillators = [
    { type: "sine" },
    { type: "square" },
    { type: "triangle" },
    { type: "sawtooth" },
  ];

  const gain = new Tone.Gain(0.5);
  const gain1 = new Tone.Gain(0.5);
  const gain2 = new Tone.Gain(0.5);
  gain.toDestination();

  let synth2 = new Tone.DuoSynth({
    vibratoAmount: 1,
    vibartoRate: 20,
    harmonicity: 2,
    voice0: {
      oscillator: randomOscillators[0],
      envelope: {
        attack: 0.1,
        release: 4,
        releaseCurve: "linear",
      },
      filterEnvelope: {
        baseFrequency: 200,
        octaves: 2,
        attack: 0,
        decay: 0,
        release: 1000,
      },
    },
    voice1: {
      oscillator: randomOscillators[2],
      envelope: {
        attack: 0.1,
        release: 4,
        releaseCurve: "linear",
      },
      filterEnvelope: {
        baseFrequency: 200,
        octaves: 2,
        attack: 0,
        decay: 0,
        release: 1000,
      },
    },
  });
  let synth = new Tone.DuoSynth({
    voice0: {
      oscillator: randomOscillators[3],
      envelope: {
        attack: 0.1,
        release: 4,
        releaseCurve: "linear",
      },
      filterEnvelope: {
        baseFrequency: 200,
        octaves: 2,
        attack: 0,
        decay: 0,
        release: 1000,
      },
    },
    voice1: {
      oscillator: randomOscillators[4],
      envelope: {
        attack: 0.1,
        release: 4,
        releaseCurve: "linear",
      },
      filterEnvelope: {
        baseFrequency: 200,
        octaves: 2,
        attack: 0,
        decay: 0,
        release: 1000,
      },
    },
  });

  let envelope = {
    attack: 0.1,
    release: 4,
    releaseCurve: "linear",
  };
  let filterEnvelope = {
    baseFrequency: 200,
    octaves: 2,
    attack: 0,
    decay: 0,
    release: 1000,
  };

  let synth1 = new Tone.DuoSynth({
    voice0: {
      oscillator: randomOscillators[5],
      envelope,
      filterEnvelope,
    },
    voice1: {
      oscillator: randomOscillators[1],
      envelope,
      filterEnvelope,
    },
  });

  synth.connect(gain);
  synth1.connect(gain1);
  synth2.connect(gain2);

  let index = 0;
  //synth object
  
  //let thirdPartQuarter = new Tone.part(function(time, event) {
  //    const notes = root;
  //    let note = notes[index% notes.length];
  //    synth.triggerAttackRelease(note, '8n', time);
  //    index++;
  //});
  //let sixthPartEight=new Tone.part(function(time, event) {
  //    const notes = root;
  //    let note = notes[index% notes.length];
  //    synth.triggerAttackRelease(note, '8n', time);
  //    index++;
  //});
  //let sixthPartQuarter = new Tone.part(function(time, event) {
  //    const notes = root;
  //    let note = notes[index% notes.length];
  //    synth.triggerAttackRelease(note, '8n', time);
  //    index++;
  //});

  new Tone.Loop((time) => {
    const notes = root;
    let note = notes[index % notes.length];
    synth.triggerAttackRelease(note, "8n", time);
    index++;
  }, "8n").start();

  new Tone.Loop((time) => {
    const notes2 = third;
    let note2 = notes2[index % notes2.length];
    synth1.triggerAttackRelease(note2, "8n", time);
    index++;
  }, "8n").start();

  new Tone.Loop((time) => {
    const notes3 = sixth;
    let note3 = notes3[index % notes3.length];
    synth2.triggerAttackRelease(note3, "8n", time);
    index++;
  }, "8n").start();

  // Tone 15 dropped the Tone.Transport singleton in favour of getTransport(),
  // and browsers will not start an audio context until a user gesture has
  // resumed it, so wait for Tone.start() before the transport rolls.
  const playASong = async () => {
    createSong();
    await Tone.start();
    Tone.getTransport().start();
    //setTimeout(() => {
    //    Tone.getTransport().stop();
    //}, 5000);
  };

  const stopASong = () => {
    Tone.getTransport().stop();
  };

  return (
    <>
      <a-entity
        ref={playASongButton}
        onClick={playASong}
        id="stopTheSongButton"
        geometry="primitive: cone; height: 2; radiusBottom: 0.1; radiusTop: 1"
        scale=""
        position="1.2 0.859 -0.5"
        material="src: #flowers; transparent: true; color: #a3d1ab"
        id="stopSongButton"
        rotation="0 180 0"
      >
        <a-entity
          id="spheretop"
          geometry="primitive: sphere; radius: .6"
          position="0 1 0"
          material="src: #strawberry"
        ></a-entity>
      </a-entity>
      <a-entity
        ref={stopASongButton}
        onClick={stopASong}
        id="startTheSongButton"
        geometry="primitive: cone; height: 2; radiusBottom: 0.1; radiusTop: 1"
        scale=""
        position="3.4 0.859 0"
        material="src: #flowers; transparent: true; color: #a3d1ab"
        id="startSongButton"
        rotation="0 180 0"
      >
        <a-entity
          id="spheretop"
          geometry="primitive: sphere; radius: .6"
          position="0 1 0"
          material="src: #strawberry"
        ></a-entity>
      </a-entity>
    </>
  );
};
export default SwanSong;
