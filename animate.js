
/* =========================================================
   LIFEOS CINEMATIC INTRO
   animate.js
   ========================================================= */

const scene = new THREE.Scene();

scene.background = new THREE.Color(0x040404);

/* =========================================================
   CAMERA
   ========================================================= */

const camera = new THREE.PerspectiveCamera(
    60,
    window.innerWidth / window.innerHeight,
    0.1,
    2000
);

camera.position.set(0, 12, 40);

/* =========================================================
   RENDERER
   ========================================================= */

const renderer = new THREE.WebGLRenderer({
    antialias: true,
    powerPreference: "high-performance"
});

renderer.setSize(
    window.innerWidth,
    window.innerHeight
);

renderer.setPixelRatio(
    window.devicePixelRatio
);

document
.getElementById("canvas-container")
.appendChild(renderer.domElement);

/* =========================================================
   LIGHTING
   ========================================================= */

const ambient = new THREE.AmbientLight(
    0xffd6a0,
    0.45
);

scene.add(ambient);

const centerLight = new THREE.PointLight(
    0xffaa33,
    5,
    500
);

centerLight.position.set(0, 14, 0);

scene.add(centerLight);

const orangeGlow = new THREE.PointLight(
    0xff6600,
    3,
    300
);

orangeGlow.position.set(0, 8, -30);

scene.add(orangeGlow);

/* =========================================================
   FLOOR
   ========================================================= */

const floorGeometry =
    new THREE.CircleGeometry(150, 128);

const floorMaterial =
    new THREE.MeshStandardMaterial({
        color: 0x080808,
        roughness: 1
    });

const floor =
    new THREE.Mesh(
        floorGeometry,
        floorMaterial
    );

floor.rotation.x = -Math.PI / 2;
floor.position.y = -4;

scene.add(floor);

/* =========================================================
   MAIN ROUND TABLE
   ========================================================= */

const tableGroup = new THREE.Group();

scene.add(tableGroup);

const tableGeometry =
    new THREE.CylinderGeometry(
        10,
        10,
        1.4,
        64
    );

const tableMaterial =
    new THREE.MeshPhysicalMaterial({

        color: 0x16100b,

        metalness: 1,

        roughness: 0.18,

        clearcoat: 1,

        emissive: 0xffaa33,

        emissiveIntensity: 0.22

    });

const table =
    new THREE.Mesh(
        tableGeometry,
        tableMaterial
    );

tableGroup.add(table);

/* =========================================================
   CENTER ENERGY CORE
   ========================================================= */

const coreGeometry =
    new THREE.SphereGeometry(
        1.4,
        64,
        64
    );

const coreMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffbb55
    });

const core =
    new THREE.Mesh(
        coreGeometry,
        coreMaterial
    );

core.position.y = 1.4;

tableGroup.add(core);

/* =========================================================
   INNER LIGHT RING
   ========================================================= */

const ringGeometry =
    new THREE.TorusGeometry(
        5,
        0.08,
        16,
        100
    );

const ringMaterial =
    new THREE.MeshBasicMaterial({
        color: 0xffbb55
    });

const ring =
    new THREE.Mesh(
        ringGeometry,
        ringMaterial
    );

ring.rotation.x = Math.PI / 2;
ring.position.y = 0.85;

tableGroup.add(ring);

/* =========================================================
   CHAIRS
   ========================================================= */

const chairs = [];

for(let i = 0; i < 6; i++){

    const chair = new THREE.Group();

    /* ==========================
       CHAIR SEAT
    ========================== */

    const seat =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                2.5,
                0.6,
                2.5
            ),

            new THREE.MeshPhysicalMaterial({

                color: 0x2d1808,

                metalness: 0.6,

                roughness: 0.4,

                emissive: 0xff9900,

                emissiveIntensity: 0.08

            })

        );

    chair.add(seat);

    /* ==========================
       CHAIR BACK
    ========================== */

    const back =
        new THREE.Mesh(

            new THREE.BoxGeometry(
                2.5,
                3.4,
                0.45
            ),

            new THREE.MeshPhysicalMaterial({

                color: 0x3a1f0d,

                emissive: 0xffaa33,

                emissiveIntensity: 0.04

            })

        );

    back.position.y = 1.7;
    back.position.z = -1;

    chair.add(back);

    /* ==========================
       CHAIR LEGS
    ========================== */

    for(let l = 0; l < 4; l++){

        const leg =
            new THREE.Mesh(

                new THREE.CylinderGeometry(
                    0.1,
                    0.1,
                    2
                ),

                new THREE.MeshStandardMaterial({
                    color: 0x111111
                })

            );

        leg.position.y = -1;

        leg.position.x =
            l < 2 ? -0.9 : 0.9;

        leg.position.z =
            l % 2 === 0 ? -0.9 : 0.9;

        chair.add(leg);

    }

    /* ==========================
       POSITIONING
    ========================== */

    const angle =
        (Math.PI * 2 / 6) * i;

    const radius = 16;

    chair.position.x =
        Math.cos(angle) * radius;

    chair.position.z =
        Math.sin(angle) * radius;

    chair.position.y = -1;

    chair.lookAt(0, 0, 0);

    scene.add(chair);

    chairs.push(chair);

}

/* =========================================================
   PARTICLES
   ========================================================= */

const particleGeometry =
    new THREE.BufferGeometry();

const particleCount = 3500;

const positions = [];

for(let i = 0; i < particleCount; i++){

    positions.push(
        (Math.random() - 0.5) * 300
    );

    positions.push(
        Math.random() * 140
    );

    positions.push(
        (Math.random() - 0.5) * 300
    );

}

particleGeometry.setAttribute(
    "position",

    new THREE.Float32BufferAttribute(
        positions,
        3
    )
);

const particleMaterial =
    new THREE.PointsMaterial({

        color: 0xffbb66,

        size: 0.16,

        transparent: true,

        opacity: 0.9

    });

const particles =
    new THREE.Points(
        particleGeometry,
        particleMaterial
    );

scene.add(particles);

/* =========================================================
   STAR RING
   ========================================================= */

const stars = [];

for(let i = 0; i < 150; i++){

    const star =
        new THREE.Mesh(

            new THREE.SphereGeometry(
                0.06,
                8,
                8
            ),

            new THREE.MeshBasicMaterial({
                color: 0xffddaa
            })

        );

    const angle =
        Math.random() * Math.PI * 2;

    const radius =
        40 + Math.random() * 40;

    star.position.x =
        Math.cos(angle) * radius;

    star.position.z =
        Math.sin(angle) * radius;

    star.position.y =
        Math.random() * 20;

    scene.add(star);

    stars.push(star);

}

/* =========================================================
   CLOCK
   ========================================================= */

const clock = new THREE.Clock();

/* =========================================================
   EXPLOSION TRANSITION
   ========================================================= */

let exploded = false;

function triggerExplosion(){

    exploded = true;

    const flash =
        document.getElementById("flash");

    flash.style.opacity = "1";

    /* PARTICLE BURST */

    for(let i = 0; i < 400; i++){

        const spark =
            document.createElement("div");

        spark.className = "spark";

        spark.style.left = "50%";
        spark.style.top = "50%";

        spark.style.width =
            Math.random() * 12 + "px";

        spark.style.height =
            spark.style.width;

        spark.style.background =
            `hsl(${35 + Math.random()*20},
            100%,
            ${55 + Math.random()*20}%)`;

        document.body.appendChild(spark);

        const x =
            (Math.random() - 0.5) * 4000;

        const y =
            (Math.random() - 0.5) * 4000;

        spark.animate([

            {
                transform:
                    "translate(-50%, -50%) scale(1)",

                opacity: 1
            },

            {
                transform:
                    `translate(${x}px, ${y}px)
                    scale(0)`,

                opacity: 0
            }

        ],{

            duration: 2200,
            easing: "cubic-bezier(.2,.8,.2,1)"
        });

    }

    setTimeout(()=>{

        window.location.href =
            "present.html";

    },1600);

}

/* =========================================================
   MAIN ANIMATION LOOP
   ========================================================= */

function animate(){

    requestAnimationFrame(animate);

    const elapsed =
        clock.getElapsedTime();

    /* =====================================================
       TABLE FLOATING
    ===================================================== */

    table.rotation.y += 0.002;

    table.position.y =
        Math.sin(elapsed * 2) * 0.12;

    core.position.y =
        1.4 + Math.sin(elapsed * 3) * 0.12;

    ring.rotation.z += 0.01;

    /* =====================================================
       CHAIRS FLOATING
    ===================================================== */

    chairs.forEach((chair, index)=>{

        chair.position.y =
            -1 + Math.sin(
                elapsed * 2 + index
            ) * 0.08;

    });

    /* =====================================================
       PARTICLES
    ===================================================== */

    particles.rotation.y += 0.0007;

    /* =====================================================
       CAMERA CINEMATIC
    ===================================================== */

    /*
       PHASE 1
       SLOW ORBIT
    */

    if(elapsed < 3.5){

        camera.position.x =
            Math.sin(elapsed * 0.45) * 28;

        camera.position.z =
            Math.cos(elapsed * 0.45) * 28;

        camera.position.y =
            12;

    }

    /*
       PHASE 2
       LOWER + DRAMATIC APPROACH
    */

    else if(elapsed < 6){

        camera.position.x *= 0.988;

        camera.position.z *= 0.988;

        camera.position.y -= 0.015;

    }

    /*
       PHASE 3
       AGGRESSIVE PUSH INTO CORE
    */

    else if(elapsed < 8){

        camera.position.z -= 0.35;

        camera.position.y -= 0.06;

    }

    /*
       LOOK AT CENTER
    */

    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);

    /* =====================================================
       EXPLOSION
    ===================================================== */

    if(elapsed > 8 && !exploded){

        triggerExplosion();

    }

}

animate();

/* =========================================================
   RESIZE
   ========================================================= */

window.addEventListener("resize", ()=>{

    camera.aspect =
        window.innerWidth /
        window.innerHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

});

