import * as React from "react";
import * as THREE from "three";
import * as THREEBAS from "three-bas";
import gsap from "gsap";
import THREERoot from "./threeRoot";

gsap.defaults({ overwrite: "auto" });

const imageList = [
  "https://res.cloudinary.com/juankspw/image/upload/v1611024814/dhqpxew398trkmhjaagi.jpg",
  "https://res.cloudinary.com/juankspw/image/upload/v1611025251/ddhrtpqjxs89m16zvrne.jpg",
  "https://res.cloudinary.com/juankspw/image/upload/v1611024813/tlg8oqr5z4gevoc3cow2.jpg",
  "https://res.cloudinary.com/juankspw/image/upload/v1611158534/ynrqwjfildafeheejy7q.png",
  "https://res.cloudinary.com/juankspw/image/upload/v1611158534/a7rrgqk8pd7sbbwaqmep.jpg",
  "https://res.cloudinary.com/juankspw/image/upload/v1611158533/jyxzlpp6dtvnm818b9lv.jpg",
  "https://res.cloudinary.com/juankspw/image/upload/v1611024814/dhqpxew398trkmhjaagi.jpg",
  "https://res.cloudinary.com/juankspw/image/upload/v1611025251/ddhrtpqjxs89m16zvrne.jpg",
  "https://res.cloudinary.com/juankspw/image/upload/v1611024813/tlg8oqr5z4gevoc3cow2.jpg",
  "https://res.cloudinary.com/juankspw/image/upload/v1611158534/ynrqwjfildafeheejy7q.png",
  "https://res.cloudinary.com/juankspw/image/upload/v1611158534/a7rrgqk8pd7sbbwaqmep.jpg",
  "https://res.cloudinary.com/juankspw/image/upload/v1611158533/jyxzlpp6dtvnm818b9lv.jpg",
];

const DURATION = 3;

export const ImageTest = () => {
  const ref = React.useRef(null);
  const timeline = React.useRef(null);
  const slideSets = React.useRef(null);
  const [selected, setSelected] = React.useState(0);
  const forward = React.useCallback(() => {
    if (selected >= imageList.length - 1) return;
    // console.log("Should go forward");
    // console.log({ selected });
    setSelected((s) => {
      const newVal = s + 1;
      if (s > 0) {
        const toHide = slideSets.current[s - 1];
        const toShow = slideSets.current[s];
        // console.log("Hiding / showing ", s - 1, " / ", s);
        toHide.forEach((tween) => (tween.visible = false));
        toShow.forEach((tween) => (tween.visible = true));
      }
      timeline.current.tweenFromTo(s * DURATION, newVal * DURATION);
      // console.log("Tweening ", s * DURATION, newVal * DURATION);
      return newVal;
    });
  }, [selected]);
  const backward = React.useCallback(() => {
    if (selected === 0) return;
    // console.log("Should go back", selected);
    setSelected((s) => {
      const newVal = s - 1;

      if (s < imageList.length - 1) {
        const toHide = slideSets.current[s];
        const toShow = slideSets.current[s - 1];
        // console.log("Hiding / showing ", s, " / ", s - 1);
        toHide.forEach((tween) => (tween.visible = false));
        toShow.forEach((tween) => (tween.visible = true));
      }

      timeline.current.tweenFromTo(s * DURATION, newVal * DURATION);

      // console.log("Tweening ", s * DURATION, newVal * DURATION);

      return newVal;
    });
  }, [selected]);
  React.useEffect(() => {
    const [t, slides] = init(ref.current, imageList);
    timeline.current = t;
    slideSets.current = slides;
    window.slides = slides;
  }, []);

  return (
    <div className="imageTest">
      <div ref={ref} />
      <div className="buttons wrap">
        {selected >= imageList.length - 1 ? (
          <button className="button buttonSlide" onClick={backward}>
            Try Me
          </button>
        ) : (
          <button className="button buttonSlide" onClick={forward}>
            Try Me
          </button>
        )}
      </div>
    </div>
  );
};

function init(node, images) {
  var root = new THREERoot({
    fov: 80,
    createCameraControls: false,
    container: node,
  });
  root.renderer.setClearColor(0x000000, 1);

  root.camera.position.set(0, 0, 30);

  var light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(0, 0, 100);
  root.scene.add(light);

  const color = 0x00ffff;
  const intensity = 2;
  const light2 = new THREE.AmbientLight(color, intensity);
  root.scene.add(light2);

  // width and height for the THREE.PlaneGeometry that will be used for the two slides
  var width = 50;
  var height = 50;

  // create a timeline for the two transitions
  var t1 = gsap.timeline({ paused: true, yoyo: true });
  t1.eventCallback("onComplete", (...args) => {
    // console.log("onComplete: ", ...args);
  });
  window.t1 = t1;

  // create 2 slides. One will transition in, the other will transition out. This will occur simultaneously.

  const slideSets = images.map((img, idx) => {
    var nextImg = idx < images.length - 1 ? images[idx + 1] : null;
    if (!nextImg) return null;

    var slideOut = new Slide(width, height, "out");
    var slideIn = new Slide(width, height, "in");
    root.scene.add(slideOut);
    root.scene.add(slideIn);

    const thisPosition = idx * DURATION;
    // console.log({ thisPosition });
    new THREE.ImageLoader().load(img, function (image) {
      slideOut.setImage(image);
    });
    new THREE.ImageLoader().load(nextImg, function (image) {
      slideIn.setImage(image);
    });
    t1.add(slideOut.transition(thisPosition), thisPosition);
    t1.add(slideIn.transition(thisPosition), thisPosition);
    if (idx > 0) {
      slideIn.visible = false;
      slideOut.visible = false;
    }
    return [slideOut, slideIn];
  });
  return [t1, slideSets.filter((i) => i)];
}

////////////////////
// CLASSES
////////////////////

function Slide(width, height, animationPhase) {
  // create a geometry that will be used by BAS.ModelBufferGeometry
  // its a plane with a bunch of segments
  var plane = new THREE.PlaneGeometry(width, height, width * 2, height * 2);

  // duplicate some vertices so that each face becomes a separate triangle.
  // this is the same as the THREE.ExplodeModifier
  THREEBAS.Utils.separateFaces(plane);

  // create a ModelBufferGeometry based on the geometry created above
  // ModelBufferGeometry makes it easier to create animations based on faces of a geometry
  // it is similar to the PrefabBufferGeometry where the prefab is a face (triangle)
  var geometry = new THREEBAS.ModelBufferGeometry(plane, {
    // setting this to true will store the vertex positions relative to the face they are in
    // this way it's easier to rotate and scale faces around their own center
    localizeFaces: true,
    // setting this to true will store a centroid for each face in an array
    computeCentroids: true,
  });

  // buffer UVs so the textures are mapped correctly
  geometry.bufferUvs();

  var i, j, offset, centroid;

  // ANIMATION

  var aDelayDuration = geometry.createAttribute("aDelayDuration", 2);
  // these will be used to calculate the animation delay and duration for each face
  var minDuration = 0.8;
  var maxDuration = 1.2;
  var maxDelayX = 0.9;
  var maxDelayY = 0.125;
  var stretch = 0.11;

  this.totalDuration = maxDuration + maxDelayX + maxDelayY + stretch;

  for (i = 0, offset = 0; i < geometry.faceCount; i++) {
    centroid = geometry.centroids[i];

    var duration = THREE.Math.randFloat(minDuration, maxDuration);
    // delay is based on the position of each face within the original plane geometry
    // because the faces are localized, this position is available in the centroids array
    var delayX = THREE.Math.mapLinear(
      centroid.x,
      -width * 0.5,
      width * 0.5,
      0.0,
      maxDelayX
    );
    var delayY;

    // create a different delayY mapping based on the animation phase (in or out)
    if (animationPhase === "in") {
      delayY = THREE.Math.mapLinear(
        Math.abs(centroid.y),
        0,
        height * 0.5,
        0.0,
        maxDelayY
      );
    } else {
      delayY = THREE.Math.mapLinear(
        Math.abs(centroid.y),
        0,
        height * 0.5,
        maxDelayY,
        0.0
      );
    }

    // store the delay and duration FOR EACH VERTEX of the face
    for (j = 0; j < 3; j++) {
      // by giving each VERTEX a different delay value the face will be 'stretched' in time
      aDelayDuration.array[offset] =
        delayX + delayY + Math.random() * stretch * duration;
      aDelayDuration.array[offset + 1] = duration;

      offset += 2;
    }
  }

  // POSITIONS

  // the transitions will begin and end on the same position
  // eslint-disable-next-line
  var aStartPosition = geometry.createAttribute(
    "aStartPosition",
    3,
    function (data, i) {
      geometry.centroids[i].toArray(data);
    }
  );
  // eslint-disable-next-line
  var aEndPosition = geometry.createAttribute(
    "aEndPosition",
    3,
    function (data, i) {
      geometry.centroids[i].toArray(data);
    }
  );

  // CONTROL POINTS

  // each face will follow a bezier path
  // since all paths begin and end on the position (the centroid), the control points will determine how the animation looks
  var aControl0 = geometry.createAttribute("aControl0", 3);
  var aControl1 = geometry.createAttribute("aControl1", 3);

  var control0 = new THREE.Vector3();
  var control1 = new THREE.Vector3();
  var data = [];

  for (i = 0, offset = 0; i < geometry.faceCount; i++) {
    centroid = geometry.centroids[i];

    // the logic to determine the control points is completely arbitrary
    var signY = Math.sign(centroid.y);

    control0.x = THREE.Math.randFloat(0.1, 0.3) * 50;
    control0.y = signY * THREE.Math.randFloat(0.1, 0.3) * 70;
    control0.z = THREE.Math.randFloatSpread(20);

    control1.x = THREE.Math.randFloat(0.3, 0.6) * 50;
    control1.y = -signY * THREE.Math.randFloat(0.3, 0.6) * 70;
    control1.z = THREE.Math.randFloatSpread(20);

    if (animationPhase === "in") {
      control0.subVectors(centroid, control0);
      control1.subVectors(centroid, control1);
    } else {
      // out
      control0.addVectors(centroid, control0);
      control1.addVectors(centroid, control1);
    }

    // store the control points per face
    // this is similar to THREE.PrefabBufferGeometry.setPrefabData
    geometry.setFaceData(aControl0, i, control0.toArray(data));
    geometry.setFaceData(aControl1, i, control1.toArray(data));
  }

  var texture = new THREE.Texture();
  texture.minFilter = THREE.NearestFilter;

  var material = new THREEBAS.BasicAnimationMaterial({
    flatShading: true,
    side: THREE.DoubleSide,
    uniforms: {
      uTime: { value: 0 },
    },
    uniformValues: {
      map: texture,
    },
    vertexFunctions: [
      THREEBAS.ShaderChunk["cubic_bezier"],
      THREEBAS.ShaderChunk["ease_cubic_in_out"],
      THREEBAS.ShaderChunk["quaternion_rotation"],
    ],
    vertexParameters: [
      "uniform float uTime;",
      "attribute vec2 aDelayDuration;",
      "attribute vec3 aStartPosition;",
      "attribute vec3 aControl0;",
      "attribute vec3 aControl1;",
      "attribute vec3 aEndPosition;",
    ],
    vertexInit: [
      "float tProgress = clamp(uTime - aDelayDuration.x, 0.0, aDelayDuration.y) / aDelayDuration.y;",
    ],
    vertexPosition: [
      // this scales each face
      // for the in animation, we want to go from 0.0 to 1.0
      // for the out animation, we want to go from 1.0 to 0.0
      animationPhase === "in"
        ? "transformed *= tProgress;"
        : "transformed *= 1.0 - tProgress;",
      // translation based on the bezier curve defined by the attributes
      "transformed += cubicBezier(aStartPosition, aControl0, aControl1, aEndPosition, tProgress);",
    ],
  });

  THREE.Mesh.call(this, geometry, material);

  this.frustumCulled = false;
}
Slide.prototype = Object.create(THREE.Mesh.prototype);
Slide.prototype.constructor = Slide;
Object.defineProperty(Slide.prototype, "time", {
  get: function () {
    return this.material.uniforms["uTime"].value;
  },
  set: function (v) {
    this.material.uniforms["uTime"].value = v;
  },
});

Slide.prototype.setImage = function (image) {
  this.material.uniforms.map.value.image = image;
  this.material.uniforms.map.value.needsUpdate = true;
};

Slide.prototype.transition = function (time) {
  return gsap.fromTo(
    this,
    {
      time: 0.0,
    },
    {
      duration: 3,
      // delay: time,
      time: this.totalDuration,
      ease: "power0.inOut",
      onStart: () => {
        // console.log("transition start: ", time);
      },
      onComplete: () => {
        // console.log(
        //   "transition forward done: ",
        //   time,
        //   "visible: ",
        //   this.visible
        // );
      },
      onReverseComplete: () => {
        // console.log("transition back done: ", time);
      },
    }
  );
};
