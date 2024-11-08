export default class Pool {
    constructor(scene, entities) {
        this._group = scene.add.group();
        this._group.addMultiples(entities);
        this._group.children.iterate(c => {
            c.setActive(false);
            c.setVisibility(false);
        }
    }

    Spawn(x, y) {

    }
}