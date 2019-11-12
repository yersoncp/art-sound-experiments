let song, analyzer, fft, bg;
const maxCircle = 180;
const innerCircle = 30;
const borderCircle = 5;
const angleDivide = 3;

function preload() {
   song = loadSound('../assets/audio/byakkoya_ep.ogg');
   bg = loadImage('../assets/images/dash_hooray_by_rainbowcrab-d49xk0d.png');
}

function setup() {
   createCanvas(1440, 766);
   song.loop();
   // create a new Amplitude analyzer
   analyzer = new p5.Amplitude();
   analyzer.setInput(song);

   fft = new p5.FFT();
}

function draw() {
   background(0);
   noStroke();

   /** spectrum */
   let spectrum = fft.analyze();

   // Colors
   let from = color(218, 165, 32);
   let to = color(72, 61, 139);
   colorMode(HSB); // Try changing to HSB.

   angleMode(DEGREES);
   translate(width / 2, height / 2);

   let angle = 360 / (spectrum.length / angleDivide);
   for (let i = 0; i < spectrum.length; i++) {
      rotate(angle);
      let c = lerpColor(from, to, map(i, 0, spectrum.length, 0, 1));
      let h = map(spectrum[i], 0, 255, innerCircle + borderCircle, maxCircle);
      stroke(c);
      line(innerCircle, innerCircle, h, h);
   }

   /**  Get the average (root mean square) amplitude */
   let rms = analyzer.getLevel();
   fill(255);
   noStroke();

   // Draw an ellipse with size based on volume
   ellipse(0, 0, 20 + rms * 300, 20 + rms * 300);
}