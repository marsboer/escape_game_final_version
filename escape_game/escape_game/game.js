/* Denne koden er inspirert av denne videoen:
https://www.youtube.com/watch?v=R1S_NhKkvGA&ab_channel=WebDevSimplified
*/

/* Alle bildene jeg har brukt, er mine egne: kandidat nr 10244. 
Alle bildene er tatt på Bakkeløkka Ungdomsskole, Nesodden.
*/

/*
Vikar-læreren er bilder av Anne Marit som bor i Bodø. En venninne av kandidat nr 10244.
*/

/*
Musikken er fra https://www.chosic.com/
*/

const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')
const bodyEl = document.querySelector('body')

// bruker begrepet 'state' for å se hva man har i lommene.
let state = {}


function startGame() {
    state = {}
    showTextNode(1)
}

// Kode som spiller av musikk. 
// Kilde: https://www.w3schools.com/graphics/game_sound.asp
function createSound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
        this.sound.play();
    }
    this.stop = function(){
        this.sound.pause();
    }
}

// Lager musikkobjekter
let backgroundMusic = new createSound("Loyalty_Freak_Music_-_07_-_A_really_dark_alley.mp3");
let doorMusic = new createSound("stingers-001-shut-or-open-door.mp3")
let deadMusic = new createSound("not-happy-ending.mp3")
let happyMusic = new createSound("happy-ending-dcpoke__birds-singing-03.mp3")



function showTextNode(textNodeIndex) {
    const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
    textElement.innerText = textNode.text
    /* En If-test som sjekker om det er en img i TextNode. Den bytter til den img som er der */
    if('img' in textNode) {
        bodyEl.style.backgroundImage = `url(./images/${textNode.img})`
    }
    /* Dersom det ikke er en img i textNode, så beholder den det forrige bildet */

    while (optionButtonsElement.firstChild) {
        optionButtonsElement.removeChild(optionButtonsElement.firstChild)
    }

    textNode.options.forEach(option => {
        if (showOption(option)) {
            const button = document.createElement('button')
            button.innerText = option.text
            button.classList.add('btn')
            button.addEventListener('click', () => selectOption(option))
            optionButtonsElement.appendChild(button) 
        }
    })
}

function showOption(option) {
    return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
    if(option.text == "Restart" || option.text == "Play again!"){
        console.log("Restarting the game")
        deadMusic.stop()
    }
        if(option.text == "Go through the door!"){
            console.log("You did it!")
            backgroundMusic.stop()
            happyMusic.play()
        }

    const nextTextNodeId = option.nextText
    if (nextTextNodeId <= 0) {
        return startGame()
    }
    state = Object.assign(state, option.setState)

    // Skrur på musikken når man trykker på "Start"
    if(option.text == "Start"){
        console.log("Starting the game")
        doorMusic.play()
        backgroundMusic.play()
    }
    // Gjør det samme om man trykker på "Restart" (i kloakken)
    if(option.text == "Restart"){
        console.log("Starting the game")
        doorMusic.play()
        backgroundMusic.play()
    }


    // Sjekker ded - altså om man lever eller ikke
    if(!state.alive ){
        console.log("Ded")
        backgroundMusic.stop()
        deadMusic.play()
    }


    showTextNode(nextTextNodeId)
}

const textNodes = [
    {
        id: 1,
        img: 'escape_the_classroom_start.PNG',
        text: 'Want to play a game?',
        options: [
            {
                text: 'Start',                                                                                                                                          // Alle tingene man får i kloakken må settes til "false", altså at man ikke har dem. 
                setState: { deadPhone: false, phone: false, powerBank: false, key: false, secretNote: false, numbersFortyTwo: false, numbersToilet: false, alive: true, caramelToothpaste: false, fishCookies: false, ash: false, fishingRod: false, keyTwo: false, teaBag: false, matches: false, sewage: false },
                nextText: 51
            }
        ]
    },
    {
        id: 2,
        img: '9b_classroom_overview.jpeg',
        text: 'You enter the 9B classroom. What do you do?',
        options: [
            {
                text: 'Check the desks',
                nextText: 3
            },
            {
                text: 'Explore the lockers in 9B',
                nextText: 6
            },
            {
                text: 'Explore somewhere else',
                nextText: 10
            },
        ]
    },
    {
        id: 3,
        text: 'You found a note on a desk. What do you do?',
        img: 'explore_9B_classroom.jpg',
        options: [
            {
                text: 'Pick it up',
                setState: { secretNote: true},
                nextText: 4
            },
            {
                text: 'Ignore it',
                nextText: 5
            }
        ]

    },
    {
        id: 4,
        img: 'secret_note.jpeg',
        text: 'The note says: "B3 AW4RE OF TH3 SUBST1TUTE TEACHER!" You put the note in your pocket. Where do you go next?',
        options: [
            {
                text: 'Explore the lockers in 9B',
                nextText: 6
            },
            {
                text: 'Explore somewhere else',
                nextText: 10
            }

        ]
    },
    {
        id: 5,
        text: 'You ignore the note. Where do you want to go next?',
        options: [
            {
                text: 'Explore the lockers in 9B',
                nextText: 6
            },
            {
                text: 'Explore somewhere else',
                nextText: 10
            },
        ]
    },
    {
        id: 6,
        text: 'Three of the lockers were unlocked. You found three objects. Which one do you grab?',
        img: 'three_lockers_are_unlocked.jpg',
        options: [
            {
                text: 'A can of coke',
                setState: { alive: false },
                nextText: 8
            },
            {
                text: 'A pair of scissors',
                setState: { alive: false },
                nextText: 9
            },
            {
                text: 'a key',
                setState: { key: true},
                nextText: 10
            },
            {
                text: 'grab them all!',
                setState: { alive: false },
                nextText: 11
            },
            {
                text: 'Ignore them all. Explore somewhere else',
                nextText: 10
            },

        ]
    },
    {
        id: 7,
        text: 'You entered the 9C classroom. Where do you want to explore first?',
        img: '9C_classroom.jpg',
        options: [
            {
                text: 'The lockers',
                nextText: 12
            },
            {
                text: 'Look at the walls',
                nextText: 13
            },
            {
                text: 'Explore somewhere else',
                nextText: 10
            },
        ]
    },
    {
        id: 13,
        text: '"THE SUBSTITUTE TEACHER IS EVIL!" is written on the wall',
        img: 'wall_do_not_trust_the_sub.jpg',
        options: [
            {
                text: 'Continue exploring',
                nextText: 10
            }
        ]
    },
    {
        id: 8,
        text: 'You took the can of coke, and sipped it. It was POISONED. YOU DIED.',
        img: 'youdied2.gif',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
    },
    {
        id: 9,
        text: 'You cut yourself on the scissors, and there were nobody there to give you a band-aid. YOU DIED.',
        img: 'youdied2.gif',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
    },
    {
        id: 11,
        text: 'You cut yourself on the scissors, and you tried to soothe yourself by drinking the coke. The coke was toxic. YOU DIED.',
        img: 'youdied2.gif',
        options: [
            {
            text: 'Restart',
            nextText: -1
            }
        ]
    },
    {
        id: 10,  /* HOVED MENYEN */
        text: 'Where do you go next?',
        img: 'inbetween.jpg',
        options: [
            {
            text: 'The 9C classroom',
            nextText: 7
            },
            {
            text: 'The kitchen area',
            nextText: 14
            },
            {
            text: 'The 9A classroom',
            nextText: 35
            },
            {
            text: 'The toilet',
            nextText: 31
            },
            {
            text: 'The 9B classroom',
            nextText: 2
            },
            {
            text: 'Use your phone',
            requiredState: (currentState) => currentState.phone,
            nextText: 20
            },
        ]
    },
    {
        id: 12,
        text: 'It seems like one of the lockers are unlocked, and there is a 4-digit code lock on an other one. What do you do?',
        img: '9C_lockers_closed.jpg',
        options: [
            {
            text: 'Open the unlocked locker',
            nextText: 15
            },
            {
            text: 'Use the secret note to open the locked locker',
            requiredState: (currentState) => currentState.secretNote,
            nextText: 17
            }
        ]
    },
    {
        id: 15,
        text: 'The locker was empty. What do you do?',
        img: 'empty_locker.jpg',
        options: [
            {
            text: 'Have a look at the note you picked up earlier',
            requiredState: (currentState) => currentState.secretNote,
            nextText: 17
            },
            {
            text: 'Continue exploring',
            nextText: 10
            }
        ]
    },
    {
        id: 17,
        text: 'The note said "B3 AW4RE OF TH3 SUBST1TUTE TEACHER!" What 4-digit code will you use to open the locker? ',
        img: 'check_secret_note.jpg',
        options: [
            {
                text: 'Whatever. Continue exploring',
                nextText: 10
            },
            {
                text: '3134',
                nextText: 41
            },
            {
                text: '3431',
                nextText: 19
            },
            {
                text: '1334',
                nextText: 41
            },
        ]
    },
    {
        id: 41,
        text: 'WRONG CODE! Try again! The note said "B3 AW4RE OF TH3 SUBST1TUTE TEACHER!" What 4-digit code will you use to open the locker? ',
        img: '9C_lockers_closed.jpg',
        options: [
            {
                text: 'Whatever. Continue exploring',
                nextText: 10
            },
            {
                text: '3134',
                nextText: 41
            },
            {
                text: '3431',
                nextText: 19
            },
            {
                text: '1334',
                nextText: 41
            },
        ]
    },
    {
        id: 19,
        text: 'There is a powerbank inside the locker!',
        img: 'powerbank.jpg',
        options: [
            {
            text: 'Use the powerbank to charge your phone',
            requiredState: (currentState) => currentState.deadPhone,
            setState: { powerBank: true},
            setState: { phone: true},
            nextText: 20
            },
            {
            text: 'Put the powerbank in your pockets',
            setState: { powerBank: true},
            nextText: 10
            },
            {
            text: 'Ignore it, and move on',
            nextText: 10
            }
        ]
    },
    {
        id: 20,
        text: 'Your phone is working again! What do you do?',
        img: 'phone_on.jpeg',
        options: [
            {
            text: 'Text your friends',
            nextText: 21
            },
            {
            text: 'Call your mum',
            nextText: 22
            },
            {
            text: 'Call the substitute teacher',
            nextText: 23
            }
        ]
    },
    {
        id: 21, 
        text: 'You snapped your friends. They are all laughing at you! "What are you doing at school?! We have the DAY OFF, you dingus!" They are sending you snaps of all the fun things that they are doing, while you are locked in at school. This is not helping. What do you do?',
        img: 'snapchat.jpeg',
        options: [
            {
            text: 'Put away the phone and continue trying to find a way out.',
            nextText: 10
            },
            {
            text: 'Call your mum',
            nextText: 22
            },
            {
            text: 'Call the substitute teacher',
            nextText: 23
            }
        ]
    },
    {
        id: 22,  /* Calling mum */
        text: 'You tried calling your mum, but she is not answering her phone. She is probably working. What do you do?',
        img: 'call_mom.jpeg',
        options: [
            {
            text: 'Put away the phone and continue trying to find a way out.',
            nextText: 10
            },
            {
            text: 'Text your friends',
            nextText: 21
            },
            {
            text: 'Call the substitute teacher',
            nextText: 23
            }
        ]
    },
    {
        id: 23,  /* calling the sub - 1 */
        text: 'You tried calling the substitute teacher. You can hear it RINGING from somewhere at school! When did the substitute teacher get here?! What do you do?',
        img: 'call_sub_1.jpeg',
        options: [
            {
            text: 'Stop the call, and run away and hide. QUICKLY!',
            nextText: 31
            },
            {
            text: 'Let it ring until the sub answers',
            nextText: 24
            },
        ]
    },
    {
        id: 14,
        text: 'The kitchen area looks.... like it always does. What do you do?',
        img: 'kitchen_area.jpg',
        options: [
            {
            text: 'Wait a minute! Maybe the key I found unlocks the cabinet above the sink?',
            requiredState: (currentState) => currentState.key,
            nextText: 30
            },
            {
            text: 'Explore somewhere else',
            nextText: 10
            }
        ]
    },
    {
        id: 30,
        text: 'The key fit! Do you want to make a cup of tea?',
        img: 'kitchen.jpg',
        options: [
            {
            text: 'Yes!',
            nextText: 32
            },
            {
            text: 'Nah',
            nextText: 10
            }
        ]
    },
    {
        id: 32,
        text: 'You made a cup of tea! You feel refreshed! :) ',
        img: 'cup.jpg',
        options: [
            {
            text: 'Ok... whatever',
            nextText: 10
            }
        ]
    },
    {
        id: 31,
        text: 'You entered the mens toilet. What do you do?',
        img: 'mens_toilet.jpg',
        options: [
            {
            text: 'Get the heck out of here',
            nextText: 10
            },
            {
            text: 'Have a closer look at one of the toilets',
            nextText: 33
            }
        ]
    },
    {
        id: 33,
        text: 'You entered one of the mens toilet. What do you do?',
        img: 'the_toilet.jpg',
        options: [
            {
            text: 'Get the heck out of here',
            nextText: 10
            },
            {
            text: 'Open the toilet ring',
            nextText: 34
            }
        ]
    },
    {
        id: 34,
        text: 'Hmmmm, ok. This is weird. Why are there numbers here? ...what do you do?',
        img: 'toilet_53.jpg',
        options: [
            {
            text: 'Write down the numbers "53", and continue exploring',
            setState: { numbersToilet: true},
            nextText: 10
            },
            {
            text: 'Ignore the numbers, and continue exploring',
            nextText: 10
            },
            //If you haven't been to the sewers yet, it shows you the Miracle Child, etc, but if you've already been there, it shows you something else.
            {
            text: 'Enter the toilet',
            nextText: 190,
            requiredState: (currentState) => !currentState.sewage
            },
            {
                text: 'Enter the toilet',
                nextText: 320,
                requiredState: (currentState) => currentState.sewage
            }

            
            
            
        ]
    },
    {
        id: 24,  /* calling the sub */
        text: 'The substitute teacher answers. You whisper "Hello?", but all you hear is breathing. What do you do?',
        img: 'call_sub_2.jpeg',
        options: [
            {
            text: 'Stop the call, and run away and hide. QUICKLY!',
            nextText: 31
            },
            {
            text: 'Yell "HELLOOOOO?" into the phone',
            nextText: 25
            }
        ]
    },
    {
        id: 25,  /* calling the sub - 3 */
        text: 'The substitute teacher answers between her breaths. "What.... do you.... want...?"',
        img: 'call_sub_3.jpeg',
        options: [
            {
            text: 'Stop the call, and run away and hide. QUICKLY!',
            nextText: 31
            },
            {
            text: 'Tell her that you are locked in at school',
            nextText: 26
            },
            {
            text: 'You suddenly realise that she might be the one who locked you in! She might be EVIL! You whisper "...sorry... wrong number" and hang up the phone. Hide in the bathroom!',
            nextText: 31
            }
        ]
    },
    {
        id: 26,  /* calling the sub - 4 */
        text: '"Tell me where you are! I will come and find you!"',
        img: 'call_sub_4.jpeg',
        options: [
            {
            text: 'Stop the call, and run away and hide. QUICKLY!',
            nextText: 31
            },
            {
            text: 'Tell her where you are',
            nextText: 27
            },
        ]
    },
    {
        id: 27,
        text: '"You poor thing!" the substitute teacher says. She explains that it is a teachers planning day, and that all students had the day off. She explains that she was out of breath because of walking up all the stairs earlier. She unlocks the door. ',
        img: 'sub_help.jpeg',
        options: [
            {
            text: 'Go through the door!',
            nextText: 28
            }
        ]
    },
    {
        id: 28, /* YOU DID IT! */
        text: 'YOU DID IT! You escaped the classroom!',
        img: 'the_school.jpg',
        options: [
            {
            text: 'Play again!',
            nextText: 1
            
            }
        ]
    },
    {
        id: 35,
        text: 'You entered the 9A classroom. What do you do?',
        img: '9A_classroom.jpg',
        options: [
            {
            text: 'Search the walls for clues',
            nextText: 36
            },
            {
            text: 'Search the 9A lockers',
            nextText: 37
            },
            {
            text: 'Explore somewhere else',
            nextText: 10
            },
        ]
    },
    {
        id: 36,
        text: 'There are loads of stuff on the walls. But, you noticed something odd. Someone have written "The last two digits are not here. But if you have them, the answer to everything is 42" What does it mean?',
        img: 'wall_42.jpg',
        options: [
            {
            text: 'Write down the numbers "42" as a clue',
            setState: { numbersFortyTwo: true},
            nextText: 35
            },
            {
            text: 'Ignore the numbers',
            nextText: 35
            },
        ]
    },
    {
        id: 37,
        text: 'All of the lockers re locked. There is one locker which can be opened with a 4-digit code. What do you do?',
        img: '9A_lockers.jpg',
        options: [
            {
            text: 'Use your clues to open it',
            requiredState: (currentState) => currentState.numbersToilet && currentState.numbersFortyTwo,
            nextText: 38
            },
            {
            text: 'Keep on exploring',
            nextText: 10
            },
        ]
    },
    {
        id: 38,
        text: 'The clues you have found were the numbers "53" and "42". The last hint said that "the last two digits are not here" and that "42 was the answer to everything". What do you guess that the code is?',
        img: '9A_lockers.jpg',
        options: [
            {
            text: '3542',
            nextText: 39
            },
            {
            text: '4235',
            nextText: 39
            },
            {
            text: '4253',
            nextText: 40
            },
            {
            text: '5342',
            nextText: 39
            },
        ]
    },
    {
        id: 39,
        text: 'WRONG! Try again. The clues you had found were the numbers "53" and "42". The last hint said that "the last two digits are not here" and that "42 was the answer to everything". What might the code be?',
        img: '9A_lockers.jpg',
        options: [
            {
            text: '3542',
            nextText: 39
            },
            {
            text: '4235',
            nextText: 39
            },
            {
            text: '4253',
            nextText: 40
            },
            {
            text: '5342',
            nextText: 39
            },
        ]
    },
    {
        id: 40,  
        text: 'There is a phone inside the locker! The phone has no power, though.',
        img: 'dead_phone.jpeg',
        options: [
            {
            text: 'Use the powerbank to charge your phone',
            requiredState: (currentState) => currentState.powerBank,
            setState: { phone: true},
            nextText: 20
            },
            {
            text: 'Put the dead phone in your pockets',
            setState: { deadPhone: true},
            nextText: 10
            },
            {
            text: 'Ignore it, and move on',
            nextText: 10
            }
        ]
    },
    {
        id: 51,
        text: 'You ran into the classroom, thinking that you were 5 minutes too late for class. However, the classroom is empty! There is nobody here. You can hear a "click" behind you. Are you locked in?!',
        img: 'start_here_9B.jpg',
        options: [
            {
                text: 'Try to open the door',
                nextText: 52
            },
            {
                text: 'Explore the 9th grade base',
                nextText: 10
            }
        ]
    },
    {
        id: 52,
        text: 'The door is locked! You are stuck, all alone - here at school! What do you do?',
        img: 'locked_door.jpeg',
        options: [
            {
                text: 'Explore the 9th grade base. There has to be something here to help you escape the classroom!',
                nextText: 10
            }
        ]
    },
    {
        id: 190,
        text: 'You have entered the schools sewage system. It certainly smells peculiar.', 
        img: 'sewage_1.jpg',
        options: [
            {
                text: 'Explore the sewage system further',
                nextText: 191
            },
            {
                text: 'Return to the men\'s toilet',
                nextText: 33
            }
        ]
    },
    {
        id: 191,
        text: 'You encounter a strange being, which looks like a blend of Dobby from Harry Potter and an opossum.',
        img: 'miracle_child_2.png',
        options: [
            {
                text: 'Talk to the beast',
                nextText: 192
            },
            {
                text: 'Return to the men\'s toilet',
                nextText: 33
            }
        ]
    },
    {
        id: 192,
        text: '"How dare you awaken me from my slumber? As a punishment I have LOCKED the exit to the sewers."',
        img: 'miracle_child_1.png',
        options: [
            {
                text: 'Continue',
                nextText: 193
            },
        ]

    },
    {   //What a ride you have signed up for...
        id: 193,
        text: '"My name is the Miracle Child, and to satisfy me, you must bring me these three things: Caramel toothpaste, fish cookies and some ash. If you bring me these items, I will open up the exit."',
        img: 'miracle_child_1.png',
        options: [
            {
                text: 'Look for the demanded items',
                nextText: 194
            },
        ]

    },
    {   //Sewage main menu
        id: 194,
        text: 'Where would you like to explore?',
        img: 'sewage_2.jpg',
        options: [
            {
                text: 'Left hallway',
                nextText: 195 
            },
            {
                text: 'Right hallway',
                nextText: 196
            },
            {
                text: 'Bring your items to the Miracle Child',
                nextText: 316
            }
        ]

    },
    {
        id: 195,
        text: 'Another fork! Which way would you like to go?',
        img: 'sewage_split_1.png',
        options: [
            {
                text: 'Left hallway',
                nextText: 197,
            },
            {
                text: 'Right hallway',
                nextText: 198,
            },
            {
                text: 'Go back',
                nextText: 194,
            }
        ] 
    },
    {
        id: 197,
        text: 'What\'s that? A fishing rod?',
        img: 'sewage_with_fishing_rod.png',
        options: [
            {
                text: 'Pick it up',
                nextText: 195,
                setState: { fishingRod: true},
            },
            {
                text: 'Ignore it and go back',
                nextText: 195
            }
        ]
    },
    {
        id: 198,
        text: 'Yet another fork! Where would you like to go?',
        img: 'sewage_split_3.jpg',
        options: [
            {
                text: 'Left hallway',
                nextText: 304
            },
            {
                text: 'Right hallway',
                nextText: 305
            },
            {
                text: 'Go back',
                nextText: 195
            }
        ]
    },
    {
        id: 304,
        text: 'A treasure chest! It\'s locked though. I wonder how you could open it...',
        img: 'sewage_treasure_1.png',
        options: [
            {
                text: 'Open it using your key',
                requiredState: (currentState) => currentState.keyTwo,
                nextText: 310
            },
            {
                text: 'Go back',
                nextText: 198
            }
        ]
    },
    {
        id: 305,
        text: 'What is that? A key?! But it\'s in the bottom of this very dark pit...',
        img: 'sewage_pit.png',
        options: [
            {
                text: 'Use your fishing rod to retrieve the key',
                requiredState: (currentState) => currentState.fishingRod,
                setState: {keyTwo: true},
                nextText: 306
            },
            {
                text: 'Jump into the pit',
                nextText: 307,
                //After you die, we decided that we should be mean and take everything away from you, which means setting everything to "false".
                setState: {fishingRod: false, caramelToothpaste: false, ash: false, fishCookies: false, keyTwo: false, teaBag: false, matches: false, alive: false}      
            },
            {
                text: 'Go back',
                nextText: 198
            }

        ]
    },
    {
        id: 306,
        text: 'You have a key now. What could you use it for?',
        img: 'key_retrieved.png',
        options: [
            {
                text: 'Continue',
                nextText: 198
            }
        ]

    },
    {
        id: 307,
        text: 'You died from fall damage after jumping into the pit. Your pockets are now empty.',
        img: 'you_died_pit.png',
        options: [
            {
                text: 'Restart',
                nextText: 194,
                setState: {alive: true}
            }
        ]

    },
    {
        id: 196,
        text: 'Fork! Where would you like to go?',
        img: 'sewage_split_2.png',
        options: [
            {
                text: 'Left hallway',
                nextText: 199,
                
            },
            {
                text: 'Right hallway',
                nextText: 300
            },
            {
                text: 'Go back',
                nextText: 194,
            }
        ]
    },
    {
        id: 199,                                                                                                      //tells the program that the "'" is text, and not an end to the next
        text: '"Hello! My name is the Sewage Dentist! I am the 1 out of the 10 dentists who does not recommend Colgate\'s toothpaste.',
        img: 'sewage_dentist_1.png',
        options: [
            {
                text: 'Continue',
                nextText: 302
            }
        ]
    },
    {
        id: 302,
        text: 'Instead, I recommend caramel toothpaste! The new, improved, tasty toothpaste. Would you like a sample?',
        img: 'sewage_dentist_1.png',
        options: [
            {
                text: '"Yes please!"',
                nextText: 303,
                setState: {caramelToothpaste: true}
            },
            {
                text: 'Run away from the creepy man',
                nextText: 196
            },
            {
                text: '"Uhmmm, actually I prefer Colgate toothpaste"',
                nextText: 309,
                setState: {fishingRod: false, caramelToothpaste: false, ash: false, fishCookies: false, keyTwo: false, teaBag: false, matches: false, alive: false}
            }
        ]
    },
    {
        id: 309,
        text: 'The Sewage Dentist did NOT like that. Your pockets are now empty.',
        img: 'you_died_dentist.png',
        options: [
            {
                text: 'Restart',
                nextText: 194,
                setState: {alive: true}
            }
        ]
    },
    {
        id: 310,
        text: 'You find a wide array of items. What would you like to pick up?',
        img: 'chest_opened.png',
        options: [
            {
                text: 'The matches',
                nextText: 311,
                setState: {matches: true}
            },
            {
                text: 'The teabag',
                nextText: 312,
                setState: {teaBag: true}
            },
            {
                text: 'The fork',
                nextText: 313,
                setState: {fishingRod: false, caramelToothpaste: false, ash: false, fishCookies: false, keyTwo: false, teaBag: false, matches: false, alive: false}
            }
        ]
    },
    {
        id: 313,
        text: 'You found an electrical outlet, and foolishly inserted your fork.. Your pockets are now empty.',
        img: 'you_died_by_fork.png',
        options: [
            {
                text: 'Restart',
                nextText: 194,
                setState: {alive: true}
            }
        ]
    },
    {
        id: 312,
        text: 'You have a teabag now.',
        img: 'teabag_aquired.png',
        options: [
            {
                text: 'Continue',
                nextText: 198 
            },
            {
                text: 'Light the teabag on fire using your matches',
                nextText: 314,
                requiredState: (currentState) => currentState.matches,
                setState: {ash: true}
            } 
        ]
    },
    {
        id: 311,
        text: 'You have aquired a box of matches.',
        img: 'matches_aquired.png',
        options: [
            {
                text: 'Continue',
                nextText: 198
            },
            {
                
                text: 'Light the teabag on fire using your matches',
                nextText: 314,
                requiredState: (currentState) => currentState.teaBag,
                setState: {ash: true}
            }
        ]
    },
    {
        id: 314,
        text: 'You lit the teabag on fire and it left you with...',
        img: 'teabag_on_fire.png',
        options: [
            {
                text: 'Continue',
                nextText: 315
            }
        ]
    },
    {
        id: 315,
        text: 'Some ash! Congratulations!',
        img: 'ash_aquired.png',
        options: [
            {
                text: 'Continue exploring',
                nextText: 194
            }
        ]
    },
    {   //A test that determines if you are worthy of the Miracle Child opening the lock for you. Shoutout to Martin's dad for the help on this one.
        id: 316,
        text: 'So, let\'s see, do you have my demanded items?',  
        img: 'miracle_child_1.png',
        options: [
            {
               text: 'Continue',
               nextText: 317,
               requiredState: (currentState) => currentState.ash && currentState.caramelToothpaste && currentState.fishCookies

            },
            {
                text: 'Continue',
                nextText: 319,
                requiredState: (currentState) => !(currentState.ash && currentState.caramelToothpaste && currentState.fishCookies)
            }
        ]
    },
    {
        id: 317,
        text: 'You have met all of my demands. Scrumptious!',
        img: 'happy_miracle_child.png',
        options: [
            {
                text: 'Continue',
                nextText: 318
            }
        ]
    },
    {   //You escaped! Congratulations!
        id: 318,
        text: 'You leave me with no other choice but to open up the exit. Congratulations, warrior. You have escaped the sewage system.',
        img: 'miracle_child_1.png',
        options: [
            {
                text: 'Return to the mens toilet',
                nextText: 33,
                setState: {sewage: true}
            }
        ]
    },
    {
        id: 319,
        text: 'You do not have the required items. Ridiculous!',
        options: [
            {
                text: 'Continue the search for the items',
                nextText: 194
            }
        ]
    },
    {   //What happens if you try to re-enter the toilet.
        id: 320,
        text: 'Mmm... Those were delicious. Thank you! But your help is needed elsewhere. Go now, warrior.',
        img: 'miracle_child_satisfied.png',
        options: [
            {
                text: 'Return to the men\'s toilet',
                nextText: 33
            }
        ]
    },
    {
        id: 303,
        text: 'Congratulations! You have aquired some caramel toothpaste.',
        img: 'sewage_home_ct.png',
        options: [
            {
                text: 'Continue',
                nextText: 194
            }
        ]
    },
    {
        id: 300,
        text: 'A lake? What could we do here?',
        img: 'sewage_lake.png',
        options: [
            {
                text: 'Use your fishing rod',
                requiredState: (currentState) => currentState.fishingRod,
                nextText: 301,
                setState: {fishCookies: true}
            },
            {
                text: 'Jump into the lake',
                nextText: 308,
                setState: {fishingRod: false, caramelToothpaste: false, sniffingAsh: false, fishCookies: false, keyTwo: false, teaBag: false, matches: false, alive: false}
                
            },
            {
                text: 'Go back',
                nextText: 196
            }
        ]
    },
    {
        id: 308,
        text: 'You tried to swim in the lake, but drowned quickly afterwards. Your pockets are now empty.',
        img: 'you_died_drowning.png',
        options: [
            {
                text: 'Restart',
                nextText: 194,
                //The alive-thing was tricky, getting the music to work and all that. But we figured it out.
                setState: {alive: true}
            }
        ]
    },
    {
        id: 301,
        text: 'Yes! You found some fish cookies! Congratulations!',
        img: 'fish_cookies_found.png',
        options: [
            {
                text: 'Continue exploring',
                nextText: 194
            }
        ]
    },
]

startGame()