# PVLI-C2024-2025-Grupo7
**Nombre del grupo:** NextStationGames  

***Este proyecto es un trabajo universitario desarrollado como parte de la asignatura PVLI***  

## Redes sociales:
- [Twitter](https://x.com/NextStationG) @NextStationG  

## Descripción:   
**Madness** es un juego RPG en el que disfrutarás de una emocionante aventura junto a Julie, nuestra protagonista.   
Julie, una joven obsesionada con el póker, es secuestrada y llevada al mundo de las cartas por el Joker.
Al llegar allí, se olvida de su pasado y lo único que sabe es que, para recuperar su libertad, deberá encontrar al Joker quien la espera en el último piso. A lo largo de la travesía, te enfrentarás a numerosos enemigos mientras descubres los misterios del pasado de Julie.   

## 1. Jugabilidad:

### 1.1.	Movimiento del personaje
El movimiento será en un entorno 2D utilizando los controles estándar de WASD (W para arriba, D para la derecha, A para la izquierda y S para abajo) para desplazarse tanto de manera vertical como horizontal. Además, los controles podrán combinarse para moverse en diagonal. El personaje se moverá a una velocidad máxima uniforme. 

### 1.2. Cámara
La cámara tendrá una perspectiva top-down que estará siguiendo al jugador, manteniéndolo siempre en el centro de la vista.

### 1.3. Mecánicas del jugador
El personaje atacará con el botón izquierdo del ratón disparando proyectiles hacia la dirección donde esté ubicado el cursor (el disparo irá esa ubicación al ser pulsado el botón). Además, el personaje podrá interactuar con ciertos objetos y NPCs en el escenario al presionar la tecla E.

Al derrotar a los enemigos, soltarán fichas (experiencia) que te permitirán subir de nivel. Con cada subida de nivel, obtendrás un punto de status, que podrás usar para mejorar diferentes atributos. Además, cada 3 niveles recibirás un punto de habilidad, que podrás utilizar en el árbol de habilidades. Para potenciar tus habilidades, necesitarás un número específico fichas que obtendrás al vencer a los enemigos.

#### Árboles de habilidades
  - **<ins>Juego de proyectiles</ins>:**
    1. Disparar dos proyectiles
    2. Disparar tres proyectiles
    3. Disparar cuatro proyectiles
    4. Disparar cinco proyectiles
   
  - **<ins>Francotirador explosivo</ins>:**
    1. Aumentar un 50% la distancia que puede alcanzar un proyectil.
    2. Si un proyectil de la protagonista se choca contra otro, se explotan las dos balas.
    3. Si mantenemos pulsado la tecla derecha del ratón y luego lo soltamos, se lanza a un ataque cargado con más potencia (daño).
    4. Cuando un proyectil llega al final de su trayecto o se choca con un enemigo, se explota e inflige más daño.
  
  - **<ins>Utilidad</ins>:**
    1. Tener un dron que te persigue y ataca automáticamente a los enemigos.
       1. Mejorar el daño que inflige el dron (hasta 3 veces).
       2. Aumentar la velocidad del dron (hasta 3 veces).
    3. Desbloquear nuevo control: “Q”: generar una torreta con vida que no se mueve y dispara los enemigos que están dentro de su rango de ataque. Puede ser destruido por los enemigos. Se destruye si después de un tiempo no haya sido destruida. Después de destruirse, esta habilidad se pondrá inactiva. Después de un tiempo de cooldown, volverá a activarse.
       1. Aumentar la vida de la torreta (hasta 3 veces).
       2. Aumentar el daño que inflige (hasta 3 veces).
       3. Alargar el tiempo que permanece activo (hasta 3 veces).
       4. Reducir el tiempo de cooldown (hasta 3 veces).
    4. Desbloquear nuevo control: “B”: generar una trampa que paraliza los enemigos al chocar con ella.
       1. Aumentar el tiempo de parálisis de los enemigos (hasta 3 veces).
       2. Aumentar el daño que inflige (hasta 3 veces).
       3. Reducir el tiempo de cooldown (hasta 3 veces).
       4. 
  - **<ins>Mejorar status</ins>:**
    1. <ins>Más vida</ins> (hasta 6 veces, 1 vida más por cada mejora)
    2. <ins>Más velocidad de movimiento</ins> (hasta 5 veces, un 20% por cada mejora).
    3. <ins>Más velocidad de disparo</ins> (hasta 5 veces, un 20% por cada mejora).
    4. <ins>Más ataque</ins> (hasta 6 veces, un 0,5 por cada mejora).
    5. <ins>Más probabilidad de hacer un ataque crítico</ins> que inflige el doble de daño (hasta 5 veces, un 5% por cada mejora).
 
![image](https://github.com/user-attachments/assets/eesquemaarbol1)
*Concept art del arbol de habilididades y mejoras de status*

![image](https://github.com/user-attachments/assets/eesquemaarbol2)
*Esquema del arbol de habilidades y mejoras de status*

### 1.4. Mecánicas de escenario
  En el escenario, el jugador se encontrará con objetos interactuables que estarán relacionados con la historia. También habrá algunos objetos que desbloquearán logros y que funcionarán como easter eggs.

  #### Trampas
  + <ins>Pinchos en el suelo</ins>: Suben y bajan periódicamente, haciendo daño si el jugador entra en contacto cuando están subidos.
  + <ins>Espinas</ins>: Pinchos estáticas que causan daño al contacto.
  + <ins>Estatua</ins>: dispara proyectiles hacia delante.

### 1.5 Enemigos y Bosses
  En cada piso habrá una serie de enemigos y un boss, aumentando su dificultad de forma gradual conforme avances. La parte estética de los bosses está inspirada en las figuras de las cartas de póker, añadiendo un toque temático a su diseño.

  #### **Enemigos base**
  + **Bob** (enemigo de ataque cuerpo a cuerpo): Un enemigo sencillo que persigue al jugador. Tiene menor velocidad y tamaño que la protagonista.
    + Vida(1), Daño(1)
      ![Bob](https://github.com/user-attachments/assets/enemies/bob)
      
  + **Crac** (enemigo que lanza proyectiles): Cuenta con un radio de visión que determina cuándo empieza a atacar. Tiene velocidad normal.
    + Vida (0.5), Daño (1.5)
      ![Crac](https://github.com/user-attachments/assets/enemies/crac)
      
  + **Zaro** (enemigo que puede teletransportarse): Ataca a distancia, similar al enemigo que lanza proyectiles (fantasma).
    + Vida (0.5), Daño (1.5)
      ![Zarp](https://github.com/user-attachments/assets/enemies/zaro)
      
  + **Letus** (enemigo que vuela y ataca cuerpo a cuerpo): Se asemeja a un murciélago.
    + Vida (0.5), Daño (1.5)
      ![Letus](https://github.com/user-attachments/assets/enemies/letus)

  + **Mutum** (enemigo bomba): Un ataque de hit kill, pero explota y causa daño en área. Si el jugador entra en su campo de ataque, se suicida. Persigue al jugador.
    + Vida (0.5), Daño (1.5)
      ![Mutum](https://github.com/user-attachments/assets/enemies/mutum)

  + **Estaka** (enemigo de daño en área): Si el jugador entra en su área, provoca una explosión.
    + Vida (0.5), Daño (1.5)
      ![Estaka](https://github.com/user-attachments/assets/enemies/mutum)

#### **Boss**
  + **Joker**: Se teleporta y causa daño en área y cuerpo a cuerpo.
    + **Mecánica 1**: Dispara 2 cartas.
    + **Mecánica 2**: Se activa cuando su vida llega a la mitda. Crea 5 cartas en el suelo. Por cada carta que destruyes, le haces daño al Joker. Si no las destruyes a tiempo, él te causará daño.
    + **Mecánica 3**: Se crean tres orbes durante la batalla. Cuando las tres estén listas, las dispara hacia la protagonista, y comienza a crear las orbes nuevamente.

    
## Capturas:  

![image](https://github.com/user-attachments/assets/1b18da63-18db-4bb0-bd16-144a60320b8f)
*Loading*


![image](https://github.com/user-attachments/assets/dde17858-2933-49a0-b948-e9c4088c6830)
*Pantalla de inicio*


![image](https://github.com/user-attachments/assets/f0466ae0-ad26-4812-bb29-57b1b27146c0)
*Juego*

![image](https://github.com/user-attachments/assets/8532efb9-7a79-4dbd-8a50-fc6ddb138622)
*GameOver*

## Web: 
Puedes jugar la versión publicada del juego en el siguiente enlace:
https://bingoo30.github.io/PVLI-C2024-2025-Grupo7/  
