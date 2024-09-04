import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Scene,
  ShaderMaterial,
  type ShaderMaterialParameters,
} from "three";

const width = window.innerWidth;
const height = window.innerHeight;

const cameraArgs = [-width / 2, width / 2, height / 2, -height / 2, 0, 1000];

export const createRenderTarget = (materialParams: ShaderMaterialParameters) => {
  const scene = new Scene();
  const camera = new OrthographicCamera(...cameraArgs);

  camera.position.z = 1;

  const material = new ShaderMaterial(materialParams);
  const geometry = new PlaneGeometry(width, height);
  const mesh = new Mesh(geometry, material);

  scene.add(mesh);

  return {
    camera,
    scene,
    // target,
  };
};
