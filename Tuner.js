import Recording from "react-native-recording";
import PitchFinder from "pitchfinder";

//export to App.js
var listener = "";
export default class Tuner {
  middleA_frequency = 440; //(Hz) middle A frequency
  semitone = 69; //(Hz) semitone of middle A: 440Hz
  notesList = [
    //12 notes
    "C",
    "C♯",
    "D",
    "D♯",
    "E",
    "F",
    "F♯",
    "G",
    "G♯",
    "A",
    "A♯",
    "B",
  ];

  constructor(sampleRate = 44100, bufferSize = 2048) {
    this.sampleRate = sampleRate;
    this.bufferSize = bufferSize;
    this.pitchFinder = new PitchFinder.YIN({ sampleRate: this.sampleRate });
  }

  start() {
    Recording.init({
      sampleRate: this.sampleRate,
      bufferSize: this.bufferSize,
    });
    Recording.start();
    listener = Recording.addRecordingEventListener((data) => {
      const frequency = this.pitchFinder(data);
      if (frequency && this.onNoteDetected) {
        const note = this.getNote(frequency);
        this.onNoteDetected({
          name: this.notesList[note % 12],
          value: note,
          cents: this.getCents(frequency, note),
          octave: parseInt(note / 12) - 1,
          frequency: frequency,
        });
      }
    });
  }

  stop() {
    Recording.stop();
    if (listener != "") {
      listener.remove();
    }
  }

  //frequency to note
  getNote(frequency) {
    return (
      Math.round(
        12 * (Math.log(frequency / this.middleA_frequency) / Math.log(2))
      ) + this.semitone
    );
  }

  //note to stanard frequency
  getFrequency(note) {
    return this.middleA_frequency * Math.pow(2, (note - this.semitone) / 12);
  }

  //get cents difference between detected frequency and note's standard frequency
  getCents(frequency, note) {
    return Math.floor(
      (1200 * Math.log(frequency / this.getFrequency(note))) / Math.log(2)
    );
  }
}
