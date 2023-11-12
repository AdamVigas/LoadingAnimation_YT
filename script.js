document.addEventListener('DOMContentLoaded', function() {

    

    const canvas = document.getElementById('nightSkyCanvas');
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];

    //Object representing the spinning circle
    const orbitingCircle = {
        x: canvas.width / 2 + 100,
        y: canvas.height / 2,
        radius: 15,
        speed: 0.02,
        angle: 0,
        image: new Image(),
    };
    //i got link for circle - earth
    orbitingCircle.image.src = 'https://cdn-icons-png.flaticon.com/512/2072/2072130.png';

    function randomRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    function drawStars(x,y,radius,color) {
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = color;
        ctx.fill();
    }

    //Function to draw the sun
    function drawSun(x, y, radius) {
        const gradient = ctx.createRadialGradient(x,y,radius * 0.5, x,y, radius * 1.5);
        gradient.addColorStop(0, 'rgba(255,255, 0, 0.5)');
        gradient.addColorStop(0, 'rgba(255, 255, 0, 0)');
        ctx.beginPath();
        ctx.arc(x,y,radius * 1.5, 0 , Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        ctx.closePath();

        //draw sun as yellow circle
        ctx.beginPath();
        ctx.arc(x,y,radius, 0, Math.PI * 2);
        ctx.fillStyle = 'yellow';
        ctx.fill();
        ctx.closePath();
    }

    //Function to draw spining object
    function drawOrbitingCircle(x,y, radius, image){
        ctx.save();
        ctx.translate(x,y);
        ctx.rotate(orbitingCircle.angle);
        ctx.drawImage(image, -radius, -radius, radius * 2, radius * 2);
        ctx.restore();
    }




    function createNightSky() {
        for(let i = 0; i < 500; i++){
            const x  = randomRange(0,canvas.width);
            const y = randomRange(0,canvas.height);
            const radius = randomRange(1,2);
            const color = 'white';
            stars.push({x,y,radius,color});
        }
    }


    // Lets add some stuff here
    function animateNightSky() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        stars.forEach((star) => {
            star.x += 0.5;
            drawStars(star.x, star.y, star.radius, star.color);
            if(star.x > canvas.width + star.radius) {
            star.x = -star.radius;
                star.x = -star.radius;
            }
        });

        const sunRadius = 25;
        const sunX = canvas.width /2;
        const sunY = canvas.height /2;

        drawSun(sunX, sunY, sunRadius);
        orbitingCircle.x = sunX + Math.cos(orbitingCircle.angle) * 60; //size
        orbitingCircle.y = sunY + Math.sin(orbitingCircle.angle) * 60;

        drawOrbitingCircle(orbitingCircle.x, orbitingCircle.y, orbitingCircle.radius, orbitingCircle.image);
        orbitingCircle.angle += orbitingCircle.speed;

        requestAnimationFrame(animateNightSky);
    }

    //running functions
    createNightSky();
    animateNightSky();

});

//Thank you :)
