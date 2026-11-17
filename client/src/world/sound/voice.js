// Robert's voice.
//
// The order of a song is the original LyricalMiracle component's: three
// lines, a "la la" chorus, a line, a chorus, a line, and a last line said
// twice and slowly. What is new: each line is reported as he starts to say
// it, so it can be shown as a caption; and a browser with no speech at all
// no longer breaks the world - the captions simply keep time by themselves.
import { RiTa } from 'rita';
import lyricSource from './lyricSource';

const CHORUS = ['lala la la', 'lalala lalala', 'la dee dah la dee dah'];

export function createVoice({ onLine, onEnd }) {
    const speech = typeof window !== 'undefined' && 'speechSynthesis' in window ? window.speechSynthesis : null;

    // Built on first use: reading everything he knows takes a moment.
    let chain;
    function line() {
        try {
            chain = chain || RiTa.markov(3, { text: lyricSource });
            return chain.generate();
        } catch (err) {
            // RiTa gives up if it cannot find a fresh sentence. Robert hums.
            return 'la';
        }
    }

    const pick = (list) => list[Math.floor(Math.random() * list.length)];

    function compose() {
        const song = [];
        for (let i = 0; i < 5; i++) {
            song.push({ text: line(), rate: 1, pitch: 1 });
            if (i === 2 || i === 3) song.push({ text: pick(CHORUS), rate: 1.1, pitch: 1 });
        }
        const last = line();
        song.push({ text: last, rate: 0.7, pitch: 1 }, { text: last, rate: 0.7, pitch: 1 });
        return song;
    }

    let singing = false;
    let timer = null;
    // Chrome can throw away an utterance that is still waiting its turn, and
    // then its events never arrive. Holding on to them here prevents that.
    let waiting = [];
    // Each song gets a number, so a line from a song that was hushed cannot
    // finish late and be mistaken for the end of the next one.
    let current = 0;

    function finish(song) {
        if (song !== current) return;
        singing = false;
        onLine('');
        onEnd();
    }

    // No voice: show the words anyway, at reading pace.
    function mouth(lines, song) {
        let i = 0;
        const next = () => {
            if (song !== current) return;
            if (i >= lines.length) return finish(song);
            const { text } = lines[i++];
            onLine(text);
            timer = setTimeout(next, 1400 + text.length * 55);
        };
        next();
    }

    function sing() {
        hush();
        const song = ++current;
        const lines = compose();
        singing = true;

        if (!speech || typeof SpeechSynthesisUtterance === 'undefined') {
            mouth(lines, song);
            return;
        }

        // Some browsers have speech in name only - no voices installed - and
        // every line fails at once without a sound. If the song gets to its
        // end and not one line was ever started, mouth the words instead.
        let heard = false;
        const done = () => {
            if (song !== current) return;
            if (heard) finish(song);
            else mouth(lines, song);
        };

        waiting = [];
        lines.forEach(({ text, rate, pitch }, i) => {
            const utterance = new SpeechSynthesisUtterance(text);
            waiting.push(utterance);
            utterance.rate = rate;
            utterance.pitch = pitch;
            utterance.onstart = () => {
                if (song !== current) return;
                heard = true;
                onLine(text);
            };
            if (i === lines.length - 1) {
                utterance.onend = done;
                utterance.onerror = done;
            }
            speech.speak(utterance);
        });
    }

    function hush() {
        current++;
        clearTimeout(timer);
        if (speech) speech.cancel();
        if (singing) {
            singing = false;
            onLine('');
            onEnd();
        }
    }

    return { sing, hush, canSpeak: Boolean(speech) };
}
