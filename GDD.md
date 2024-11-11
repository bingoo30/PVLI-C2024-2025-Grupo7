# Madness
Grupo 07- NextStationGames
 
## RESUMEN

**Género:** RPG, mazmorras, aventura

**Modo:** Un jugador

**Público objetivo:** 14+ años con experiencia en el medio

**Plataforma:** Web

**Autores:** Maria Eduarda Beckers, Haoshuang Hou, Mauro Martínez y Bingcheng Wang

## Descripción
Madness es un juego RPG en el que disfrutarás de una emocionante aventura junto a Julie, nuestra protagonista. Julie, una joven obsesionada con el póker, es secuestrada y llevada al mundo de las cartas por el Joker. Al llegar allí, se olvida de su pasado y lo único que sabe es que, para recuperar su libertad, deberá encontrar al Joker, quien la espera en el último piso. A lo largo de la travesía, te enfrentarás a numerosos enemigos mientras descubres los misterios del pasado de Julie.

## Índice
- [1. Jugabilidad](#1-jugabilidad)
  - [1.1. Movimiento del personaje](#11-movimiento-del-personaje)
  - [1.2. Cámara](#12-cámara)
  - [1.3. Mecánicas del jugador](#13-mecánicas-del-jugador)
  - [1.4. Mecánicas de escenario](#14-mecánicas-de-escenario)
  - [1.5. Otros](#15-otros)
- [2. Diseño de nivel](#2-diseño-de-nivel)
  - [2.1. Descripción de partida típica](#21-descripción-de-partida-típica)
- [3. HUD](#3-hud)
  - [3.1. Mockup del HUD](#31-mockup-del-hud)
  - [3.2. Explicación de los elementos del HUD y su funcionamiento](#32-explicación-de-los-elementos-del-hud-y-su-funcionamiento)
- [4. Moodboard](#4-moodboard)
- [5. Menús y flujo de juego](#5-menús-y-flujo-de-juego)
  - [5.1. Flujo de juego](#51-flujo-de-juego)
- [6. Contenido](#6-contenido)
  - [6.1. Historia](#61-historia)
  - [6.2. Personajes](#62-personajes)
  - [6.3. Enemigos](#63-enemigos)
  - [6.4. Objetos](#64-objetos)
  - [6.5. Logros](#65-logros)
- [7. Referencias](#7-referencias)



## 1. Jugabilidad
### 1.1. Movimiento del personaje

El movimiento será en un entorno 2D utilizando los controles estándar de WASD (W para arriba, D para la derecha, A para la izquierda y S para abajo) para desplazarse tanto de manera vertical como horizontal. Además, los controles podrán combinarse para moverse en diagonal. El personaje se moverá a una velocidad máxima uniforme, la cual tardará 0.25 segundos en alcanzar (inercia). 

### 1.2. Cámara
La cámara tendrá una perspectiva top-down que normalmente estará fija mirando hacia la sala en la que esté el jugador desde arriba. La cámara solo se moverá si el jugador está en una sala grande; en ese caso, seguirá al jugador, manteniéndolo siempre en el centro de la vista.

### 1.3. Mecánicas del jugador
El personaje atacará con el botón izquierdo del ratón disparando proyectiles hacia la dirección donde esté ubicado el cursor (el disparo irá esa ubicación al ser pulsado el botón). Además, el personaje podrá interactuar con ciertos objetos y NPCs en el escenario al presionar la tecla E.

Al derrotar a los enemigos, soltarán fichas (experiencia) que te permitirán subir de nivel. Con cada subida de nivel, obtendrás un punto de status, que podrás usar para mejorar diferentes atributos. Además, cada 3 niveles recibirás un punto de habilidad, que podrás utilizar en el árbol de habilidades. Para potenciar tus habilidades, necesitarás un número específico fichas que obtendrás al vencer a los enemigos.

**Árboles de habilidades:**
 
***Juego de proyectiles:***

Disparar dos proyectiles.

Disparar tres proyectiles.

Disparar cuatro proyectiles.

Disparar cinco proyectiles.

***Francotirador explosivo:***

Aumentar un 50% la distancia que puede alcanzar un proyectil.

A partir de ese instante, si un proyectil de la protagonista se choca contra otro, se explotan las dos balas.

A partir de ese instante, si mantenemos pulsado la tecla derecha del ratón y luego lo soltamos, se lanza a un ataque cargado con más potencia (daño).

A partir de ese instante, cuando un proyectil llega al final de su trayecto o se choca con un enemigo, se explota e inflige más daño.


***Utilidad:***
Tener un dron que te persigue y ataca automáticamente a los enemigos.

1.1 Mejorar el daño que inflige el dron (hasta 3 veces).

1.2 Aumentar la velocidad del dron (hasta 3 veces).

Desbloquear nuevo control: “Q”: generar una torreta con vida que no se mueve y dispara los enemigos que están dentro de su rango de ataque. Puede ser destruido por los enemigos. Se destruye si después de un tiempo no haya sido destruida. Después de destruirse, esta habilidad se pondrá inactiva. Después de un tiempo de cooldown, volverá a activarse.

2.1 Aumentar la vida de la torreta (hasta 3 veces).

2.2 Aumentar el daño que inflige (hasta 3 veces).

2.3 Alargar el tiempo que permanece activo (hasta 3 veces).

2.4 Reducir el tiempo de cooldown (hasta 3 veces).

Desbloquear nuevo control: “B”: generar una trampa que paraliza los enemigos al chocar con ella.

3.1 Aumentar el tiempo de parálisis de los enemigos (hasta 3 veces).

3.2 Aumentar el daño que inflige (hasta 3 veces).

3.3 Reducir el tiempo de cooldown (hasta 3 veces).

***Mejorar status:***

Más vida: (hasta 6 veces, 1 vida más por cada mejora)

Más velocidad de movimiento (hasta 5 veces, un 20% por cada mejora).

Más velocidad de disparo (hasta 5 veces, un 20% por cada mejora).

Más ataque (hasta 6 veces, un 0,5 por cada mejora).

Más probabilidad de hacer un ataque crítico que inflige el doble de daño (hasta 5 veces, un 5% por cada mejora).

![image](https://github.com/user-attachments/assets/df453eeb-007c-4853-9314-436f30d2cc23)



### 1.4. Mecánicas de escenario
En el escenario, el jugador se encontrará con objetos interactuables que estarán relacionados con la historia. También habrá algunos objetos que desbloquearán logros y que funcionarán como easter eggs.

***Trampas (opcional - causan daño a los enemigos):***

Pinchos en el suelo: suben y bajan periódicamente.

Espinas: estáticas, causan daño al contacto.

Láseres: se activan y desactivan cíclicamente.

Estatua: dispara proyectiles hacia delante.

### 1.5. Otros
En cada piso habrá una serie de enemigos y un boss, aumentando su dificultad de forma gradual conforme avances. La parte estética de los bosses está inspirada en las figuras de las cartas de póker, añadiendo un toque temático a su diseño..
***Enemigos***

****Bob (enemigo de ataque cuerpo a cuerpo):**** Un enemigo sencillo que persigue al jugador. Tiene menor velocidad y tamaño que la protagonista.  
Hitbox: Normal ; Vida(1);  Daño(1) .

![image](https://github.com/user-attachments/assets/eb5e3d5a-a651-4b6e-afb9-8cff861327ef)


****Crac (enemigo que lanza proyectiles):**** Cuenta con un radio de visión que determina cuándo empieza a atacar. Tiene velocidad normal. 
Vida(0.7);  Daño(0.7).

![image](https://github.com/user-attachments/assets/79acbece-a2ed-4eda-9268-32900b32d111)


****Zaro (enemigo que puede teletransportarse):**** Ataca a distancia, similar al enemigo que lanza proyectiles (fantasma). 
Vida (0.5);  Daño (1.5). 

****Letus (enemigo que vuela y ataca cuerpo a cuerpo):**** Se asemeja a un murciélago.

![image](https://github.com/user-attachments/assets/5e9074e4-d780-488d-808f-4232dfcc2319)


****Mutum (enemigo bomba):**** Un ataque de hit kill, pero explota y causa daño en área. Si el jugador entra en su campo de ataque, se suicida. Persigue al jugador.

****Estaka (enemigo de daño en área):**** Si el jugador entra en su área, provoca una explosión.

****(Opcional) Mimic:**** Un baúl de tesoros que no es un baúl. No hace nada hasta que el jugador interactúa con él.
****(Opcional) Plop (enemigo que dispara):**** Sus balas crean un charco en el suelo que causa daño.

****Bosses****
**Estamos pensando quitar los tres bosses intermedios y quedar con el boss final Jocker**
J: Dispara flechas, a caballo, y lleva un escudo con un dibujo de tréboles.

Mecánica 1: Siempre está corriendo y dando vueltas.

Q: Dispara diamantes (los triángulos de las cartas).

Mecánica 1: Crea una pared que bloquea los ataques.

Mecánica 2: Crea una prisión pequeña con espacio para moverse que atrapa a la protagonista y lanza diamantes desde fuera, que la protagonista puede esquivar.

K: Ataca cuerpo a cuerpo con un cetro. (Corazón) Muy resistente, pero no causa mucho daño.

Mecánica 1: Bebe vino para recuperar vida.

Mecánica 2: Levanta el cetro y hace que caigan corazones en el suelo. Si los corazones tocan a la protagonista, le causan daño (como meteoros de corazones).

(Opcional) Mecánica 3: Ataque pesado que, si impacta, paraliza a la protagonista, impidiéndole moverse o disparar durante un tiempo. 

*****Joker:***** Se teleporta y causa daño en área y cuerpo a cuerpo.

*Mecánica 1:* Dispara 2 cartas.

*Mecánica 2:* Crea 5 cartas en el suelo. Por cada carta que destruyes, le haces daño al Joker. Si no las destruyes a tiempo, él te causará daño.

*Mecánica 3:* Se crean tres orbes durante la batalla. Cuando las tres estén listas, las dispara hacia la protagonista, y comienza a crear las orbes nuevamente.

*(Opcional) Mecánica 4:* Fase 2 - Cuando llega a un cierto nivel de vida, teleporta a la protagonista y a él mismo a otra sala.

*(Opcional) Mecánica 5:* Fase 2 - Se mueve más rápido.

## 2.	Diseño de nivel

El jugador deberá explorar el mapa y encontrar llaves en las salas para poder ascender de planta. Cada planta representará un nivel, y dentro de cada nivel habrá diferentes salas donde el jugador tendrá que explorar y enfrentarse a enemigos para obtener la llave.
Dentro de cada planta, habrá una sala que contendrá un boss. Cada boss tendrá sus propias habilidades y formas de ataque, lo que aportará diversidad y evitará que las salas se vuelvan monótonas. Además, habrá puzles, salas grandes, entre otros elementos.
(primero probamos si somos capaces de conseguirlo, en caso contrario, se quitan las salas grandes) 

![image](https://github.com/user-attachments/assets/4624c38b-4ee6-48d3-8b6b-20b1060210d5)

	
### 2.1.	Descripción de partida típica

En una partida normal el jugador empezará en el hall del primer piso, donde se encontrará con un NPC que le dará una explicación sobre ese mundo. Al finalizar la explicación el jugador podrá salir del hall y empezar su busca por la puerta del próximo piso y derrotar el boss que tendrá la llave para abrirla. Al largo de los niveles, el jugador aprenderá sobre la historia de la protagonista mientras ella va recuperando sus recuerdos y también aprenderás mejor sobre como funciona ese mundo. Al llegar a último piso, el jugador tendrá que derrotar al joker para que se acabe el juego.

Si el jugador muere en el camino, volverá al checkpoint de cada piso, es decir, tendrá que reiniciar el nivel.


## 3.	HUD

### 3.1.	Mockup del HUD

![image](https://github.com/user-attachments/assets/55ed58f3-b8e6-4bdf-8d9d-3c21d3b4f4c0)

### 3.2.	Explicación de los elementos del HUD y su funcionamiento.
**Imagen de protagonista:** Función casi completamente estética, muestra un retrato del personaje jugado. 

**Vida:** Barra que muestra el porcentaje de salud que le queda al jugador.

**Experiencia:** Barra que muestra la cantidad de experiencia que tiene el personaje respecto a cuanto le queda para subir al siguiente nivel.

**Habilidades que se puede usar:** Lista de las Habilidades de Utilidad desbloqueadas, con sus cooldowns y una letra en el canto inferior indicando cual es la tecla para activar la habilidad.

**Mapa:** Minimapa que muestra de forma esquemática la ubicación del personaje. Solo indica la habitación en la que está el personaje y las habitaciones que ha visitado en forma de cuadrados conectados por líneas. Los cuadrados serán rellenados con diferentes colores dependiendo de si el personaje está ahí o no.

**Imagen de quién está hablando:** Autodescriptivo, muestra un retrato del personaje que está hablando en ese momento.

**Diálogos:** Autodescriptivo, diálogos del juego.4.	Visual

El apartado visual será bastante abstracto, cada nivel tendrá muchos elementos que no se relacionan unos con otros y algunas salas con colores vibrantes y otras con colores muy oscuros, con la intención de pasar una sensación de que ese mundo es una extensión de la personalidad del Joker, el amo de ese mundo.

## 4.	Moodboard
[Pinterest](https://pin.it/5GXh8RoGd)


## 5.	Menús y flujo de juego

En cuanto a los menús, se trata de una cosa bastante simple. Tendremos un botón de inicio y un botón de configuraciones (opcional) en la pantalla inicial. Para mostrar el menú de pausa hay que pulsar la tecla “P”. Aparecerán opciones como continuar el juego, volver a la pantalla y guardar el progreso (opcional).

### 5.1.	Flujo de juego

![image](https://github.com/user-attachments/assets/596f17ab-4388-43c9-afb0-1b0a162a6aac)


## 6.	Contenido

### 6.1.	Historia

La protagonista se despierta en una sala donde un NPC le explica que se encuentra en el mundo creado por Joker, conocido como el mundo de las cartas. Gracias a la explicación del NPC, la protagonista comprende que está en la primera planta y que debe llegar hasta la cuarta planta para enfrentarse a Joker y así poder salir de ese mundo. Para lograrlo, necesita encontrar la escalera y la llave, las cuales están escondidas en las salas que pueden contener peligros. Además, se da cuenta de que no recuerda nada, ni siquiera quién es. Solo sabe que debe salir de este mundo tan abstracto. Siente que podría recuperar todos sus recuerdos cuando se enfrente a Joker. Durante su aventura, se encuentra con diferentes cartas que complican su camino.

### 6.2.	Personajes


**Julie:** Una chica joven de unos 22 años que ha olvidado quién era. Según lo que han contado, fue secuestrada al mundo extraño de Joker. Durante su aventura, irá recordando su pasado

**NPCs:**

***Flush:*** un señor mayor que estará en el hall del primer piso, será el responsable de introducir al jugador el objetivo y reglas principales del juego.

***Weiyoung:*** una amiga próxima de la protagonista que estará en el segundo piso y con ella la protagonista recordará de sus sueños y las esperanzas que tenía junto a su amiga.

***Romeo:*** El ex novio de Julie, al encontrarle, la protagonista se recordará de su adolescencia y todos los momentos bonitos que pasaron juntos . Estará en el tercer piso.

 ***Piu:*** Gato de Julie, estará en el cuarto piso y se recordará de los momentos felices antes de apostar.


### 6.3.	Enemigos

**Bosses:**
***Joker:*** Personaje que secuestra a la protagonista y es el amo del mundo de las cartas y actúa como jefe final. (Es la parte de culpa de la prota, quien le dice las cosas malas que ha hecho, y se entera de está intentando cambiar)

**Posiblemente la parte narrativa relacionado con los bosses se cambie a objetos**
K: Boss del tercer piso, se entera que perdió a la única persona que ella amaba por su culpa.

Q: Boss del segundo piso, se entera de varias discusiones que hubo con alguien por estar apostando.

J: Boss del primer piso, se entera de que apuesta.

**Enemigos normales:** Criaturas inspiradas en cartas de poker.

### 6.4.	Objetos

**Llave:** Es esencial para poder subir de piso y estará escondida en alguna sala.

**Fichas de póker:** Actúan como puntos de experiencia que se obtendrán al derrotar enemigos.

**Objetos relacionados con los logros:** Estarán distribuidos en diferentes lugares del mapa.

Casco.

Lápiz roto.

Teclado sin teclas.

### 6.5.	Logros

Salir del primer piso.

Salir del segundo piso.

Salir del tercer piso.

Salir del cuarto piso.

Desbloquear una rama entera del árbol.

Encontrar a Joker.

Matar a 20/40/80/100/200 enemigos.

Llegar al nivel 5/10/15.

Morir 5/10 veces.

Derrotar a J/Q/K/Joker.

Encontrar los cascos perdidos.

Encontrar un lápiz roto.

Encontrar teclado sin teclas.

Hablar con Flush: Has conocido al señor Flush, un señor amable que te explicó donde estas.

Hablar con Weiyoung: Has encontrado a tu amiga.

Hablar con Romeo: Has encontrado a Romeo.

Encontrar a Piu.

(opcional) Trampar a un mimic.

## 7.Referencias
Mecánicas: The Binding of isaac, Darkest Dungeon.

Temática: Poker.

Estilo del cuadro de diálogo: Angels of Death.

Personalidad de Joker: Balatro.

Estética: Alicia en el país de las maravillas.

Temática: Poker.
Estilo del cuadro de diálogo: Angels of Death.
Personalidad de Joker: Balatro.
Estética: Alicia en el país de las maravillas.
