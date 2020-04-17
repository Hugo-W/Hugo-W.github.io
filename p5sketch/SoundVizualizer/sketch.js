let mic;
let wave = [];
let sound;
let fft;
let amp;
let togglePlay = false;
let dropdown;

function preload() {
	sound = loadSound('./take5.wav');
}

function setup() {
	createCanvas(600, 400);
	mic = new p5.AudioIn();
	fft = new p5.FFT(0.75, 512);
	amp = new p5.Amplitude();

	dropdown = createSelect();
	dropdown.option('Take 5');
	dropdown.option('Microphone');
	dropdown.changed(selector);
	dropdown.selected('Take 5');
}

function draw() {
	background(51);

	// Mouth
	// ellipse(0, 0, map(mic.amplitude.volume, 0, 0.1, 0, 100));

	// Waveform
	let waveform = fft.waveform();
	beginShape();
	noFill();
	strokeWeight(2);
	stroke(255, 0, 152);
	for (i=0; i<waveform.length; i++) {
		let x = map(i, 0, waveform.length, 0, width);
    	let y = map( waveform[i], -1, 1, 0, height);
		vertex(x, y);
	}
	endShape();
	strokeWeight(1);
	
	// Envelope Wave
	push();
	translate(width/2, height/2);
	wave.unshift(map(amp.volume, 0, 0.1, 0, 100))
	beginShape();
	fill(255, 100);
	stroke(255);
	for (i=0; i<wave.length; i++) {
		let r = 50 + wave[i];
		let theta = TAU * i / wave.length;
		let x = r * cos(theta);
		let y = r * sin(theta);
		vertex(x, y);
	}
	endShape();

	if (wave.length>width) {
		wave.pop();
	}
	pop();

	// FFT spectrum
	let spectrum = fft.analyze();
	histogram(spectrum)
	// translate(0, height);
	// beginShape();
	// noFill();
	// stroke(255);
	// for (i=0; i<spectrum.length; i++) {
	// 	let x = map(i, 0, spectrum.length, 0, width);
	// 	vertex(x, -spectrum[i]);
	// }
	// endShape();

}

function mouseClicked() {
	togglePlay = togglePlay? false: true;
	if (dropdown.value() === 'Take 5') {
		if (togglePlay) {
			sound.play();
		} else {
			sound.pause();
		}
	}
}

function selector() {
	if (dropdown.value() === 'Microphone') {
		mic.start();
		fft.setInput(mic);
		amp.setInput(mic);
		sound.stop();
	} else {
		mic.stop();
		fft.setInput(sound);
		amp.setInput(sound);
		sound.play();
	}
}

function histogram(spectrum) {
	let width_bar = width/spectrum.length;
	noStroke();
	for (let i=0; i<spectrum.length; i++) {
		fill(spectrum[i], 255-spectrum[i], 0);
		rect(i*width_bar, height-spectrum[i], width_bar, spectrum[i]);
	}
}