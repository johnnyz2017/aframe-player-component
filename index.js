/* globals THREE, AFRAME */

if (typeof AFRAME === 'undefined') {
  throw new Error('Component attempted to register before AFRAME was available.');
}

var ASSET_ROOT = 'https://assets-scenevr-com.s3-us-west-1.amazonaws.com/prerelease/';

/**
 * Player component for A-Frame.
 */
AFRAME.registerComponent('player', {
  schema: { },

  // Member variables
  geometry: null,
  mixer: false,
  actions: {},
  clock: null,

  /**
   * Called once when component is attached. Generally for initial setup.
   */
  init: function () {
    var self = this;
    var loader = new THREE.JSONLoader();

    this.clock = new THREE.Clock();

    loader.load(ASSET_ROOT + 'models/maria.json', function (geometry, materials) {
      materials.forEach(function (material) {
        material.skinning = true;
      });

      var mesh = new THREE.SkinnedMesh(geometry,
        new THREE.MeshFaceMaterial(materials)
      );

      self.mixer = new THREE.AnimationMixer(mesh);
      self.actions['walk'] = self.mixer.clipAction(geometry.animations[1]);
      self.actions['walk'].setEffectiveWeight(1);
      self.actions['walk'].play();

      self.el.object3D.add(mesh);

      console.log('wtf!');
    });
  },

  /**
   * Called when component is attached and when component data changes.
   * Generally modifies the entity based on the data.
   */
  update: function (oldData) {
  },

  /**
   * Called when a component is removed (e.g., via removeAttribute).
   * Generally undoes all modifications to the entity.
   */
  remove: function () { },

  /**
   * Called on each scene tick.
   */
  tick: function (t) {
    if (this.mixer) {
      var delta = this.clock.getDelta();
      this.mixer.update(delta);
    }
  },

  /**
   * Called when entity pauses.
   * Use to stop or remove any dynamic or background behavior such as events.
   */
  pause: function () { },

  /**
   * Called when entity resumes.
   * Use to continue or add any dynamic or background behavior such as events.
   */
  play: function () { },
});
