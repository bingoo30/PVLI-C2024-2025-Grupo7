export default class OurPool {
	/**
	 * Pool de objetos. En este caso usaremos la pool para reutilizar las cajas del juego y tener un m�ximo.
	 * La pool nos evita, adem�s, tener que hacer todo el rato new y destroy de los objetos. Nos evitamos perder
	 * tiempo de CPU en la creaci�n de nuevos objetos, reservar memoria, y en su destrucci�n o liberaci�n de memoria
	 * por el recolector de basura.
	 * @param {Scene} scene - escena en la que aparecen los elementos de la pool
	 * @param {Number} max - elemento html que define la cantidad m�xima de la pool sobre la que no queremos que crezca m�s
	 * @param {Boolean} reuse - decimos si queremos reutilizar elementos de la pool que est�n vivos si no hay m�s remedio
	 */
	constructor(scene, max, type) {
		this._group = scene.add.group();
		this.max = max;
		this.scene = scene;
		this.type = type;
	}
	/**
	 * M�todo para a�adir nuevos objetos a la pool.
	 * Nos servir� para crear una pool inicial si no lo hemos hecho en el constructor.
	 * Todos los elementos a�adidos los activamos como disponibles para reutilizar
	 * @param {Array} entities - array de objetos que a�adir a la pool
	 */
	addMultipleEntity(entities) {
		this._group.addMultiple(entities);
		entities.forEach(c => {
			this._group.killAndHide(c);
			c.body.checkCollision.none = true;
		});
	}
	spawn(x, y, animationKey = 'none') {
		// Si no se encontr� una entidad con el valor deseado, buscamos la primera "muerta" disponible
		let entity = this._group.getFirstDead();

		/* 
			En caso de no tener entidades disponibles en la pool, hay que decidir que hacer
			Aqu� podemos seguir varias estrategias, por ejemplo:
			 - aumentar el tama�o de la pool en una cantidad concreta 
			 - duplicar el tama�o
			 - reutilizar la entidad que m�s tiempo ha estado viva
		*/
		if (!entity) {
			if (this._group.getLength() < this.max.value || this.max.value === 0) {
				let newEntities = [];
				let newMax = this.max.value < this._group.getLength() * 2 ? this.max.value - this._group.getLength() : this._group.getLength()
				for (let i = 0; i < newMax; i++) { //En este caso hemos elegido duplicar el tama�o
					if (this.type == 'Bullet') {
						//crear bullets por defecto
						entity = new Bullet(this.scene, 1, 100, this.type, 4);
					}
					else if (this.type == 'Coin') {
						entity = new Coin(this.scene, 0, 0, 0);
					}
					newEntities.push(entity);
				}
				this.addMultipleEntity(newEntities);
			}
		}


		// Cuando ya hemos conseguido la entidad de alguna forma la reutilizamos
		if (entity) {
			entity.x = x;
			entity.y = y;
			entity.play(animationKey);
			entity.setActive(true);
			entity.setVisible(true);
			entity.body.checkCollision.none = false;
		}
		console.log(entity)
		return entity;
	}
	/**
	 * M�todo para liberar una entidad
	 * @param {Object} entity - entidad de la pool que queremos marcar como libre
	 */
	release(entity) {
		entity.body.checkCollision.none = true;
		this._group.killAndHide(entity);
	}


	getPhaserGroup() {
		return this._group;
	}

}