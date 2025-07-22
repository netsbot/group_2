import p5 from "p5";

let main = (p5: p5) => {
    p5.setup = () => {
        p5.createCanvas(800, 600);
    }

    p5.draw = () => {
        p5.background(220);
    }
}

new p5(main);