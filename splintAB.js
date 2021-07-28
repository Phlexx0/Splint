// ==UserScript==
// @name         SplitAB
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       Phlex
// @match        *splinterlands.com/*
// @icon         https://www.google.com/s2/favicons?domain=tampermonkey.net
// @grant        none
// @run-at document-idle
// ==/UserScript==

(function () {
    'use strict';
    //Match config
    var MATCH_MANA = 16
    var SLOTS = 6
    var SUMMONER_TYPE = "white" //see TYPE_CONVERT
    var SUMMONER_ID
    var MONSTER_IDS = []
    var selected = false


    const USE_PREMADE = [{}]
    const FIRST_MONSTER_DEFENSE = true
    const FIRST_MONSTER_DEFENSE_NAME = ''




    //Current monster list
    const MONSTERS = [{
        "name": "Goblin Shaman",
        "id": "1",
        "mana": 3,
        "type": "red",
        "life": 4,
        "armor": 0,
        "speed": 2,
        "ranged": 0,
        "attack": 0,
        "magic": 0,
        "abilities_num": 1,
        "abilities": [
            "Weaken"
        ],
        "rating": {
            "attack": 0,
            "defense": 1.3333333333333333,
            "overal": 1.3333333333333333
        }
    },
                      {
                          "name": "Giant Roc",
                          "id": "2",
                          "mana": 5,
                          "type": "red",
                          "life": 4,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 2,
                          "abilities": [
                              "Flying",
                              "Reach"
                          ],
                          "rating": {
                              "attack": 0.2,
                              "defense": 0.8,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Kobold Miner",
                          "id": "3",
                          "mana": 2,
                          "type": "red",
                          "life": 2,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Sneak"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Fire Beetle",
                          "id": "4",
                          "mana": 3,
                          "type": "red",
                          "life": 4,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 1,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Snipe"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 1.3333333333333333,
                              "overal": 1.6666666666666665
                          }
                      },
                      {
                          "name": "Kobold Bruiser",
                          "id": "157",
                          "mana": 3,
                          "type": "red",
                          "life": 3,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.6666666666666666,
                              "defense": 1,
                              "overal": 1.6666666666666665
                          }
                      },
                      {
                          "name": "Serpentine Spy",
                          "id": "158",
                          "mana": 3,
                          "type": "red",
                          "life": 1,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Opportunity"
                          ],
                          "rating": {
                              "attack": 0.6666666666666666,
                              "defense": 0.3333333333333333,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Magma Troll",
                          "id": "159",
                          "mana": 4,
                          "type": "red",
                          "life": 3,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Reach"
                          ],
                          "rating": {
                              "attack": 0.25,
                              "defense": 0.75,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Goblin Fireballer",
                          "id": "160",
                          "mana": 2,
                          "type": "red",
                          "life": 2,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 1,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Serpentine Soldier",
                          "id": "6",
                          "mana": 5,
                          "type": "red",
                          "life": 4,
                          "armor": 1,
                          "speed": 4,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Shield"
                          ],
                          "rating": {
                              "attack": 0.2,
                              "defense": 1,
                              "overal": 1.2
                          }
                      },
                      {
                          "name": "Pit Ogre",
                          "id": "7",
                          "mana": 6,
                          "type": "red",
                          "life": 7,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Stun"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 1.1666666666666667,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Cerberus",
                          "id": "8",
                          "mana": 4,
                          "type": "red",
                          "life": 5,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Heal"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1.25,
                              "overal": 1.75
                          }
                      },
                      {
                          "name": "Fire Elemental",
                          "id": "161",
                          "mana": 5,
                          "type": "red",
                          "life": 2,
                          "armor": 0,
                          "speed": 4,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Blast"
                          ],
                          "rating": {
                              "attack": 0.4,
                              "defense": 0.4,
                              "overal": 0.8
                          }
                      },
                      {
                          "name": "Living Lava",
                          "id": "162",
                          "mana": 7,
                          "type": "red",
                          "life": 6,
                          "armor": 2,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 3,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Shield"
                          ],
                          "rating": {
                              "attack": 0.42857142857142855,
                              "defense": 1.1428571428571428,
                              "overal": 1.5714285714285714
                          }
                      },
                      {
                          "name": "Spark Pixies",
                          "id": "163",
                          "mana": 4,
                          "type": "red",
                          "life": 1,
                          "armor": 0,
                          "speed": 5,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Flying"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 0.25,
                              "overal": 0.75
                          }
                      },
                      {
                          "name": "Pirate Captain",
                          "id": "12",
                          "mana": 3,
                          "type": "blue",
                          "life": 3,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 1,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Snipe"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 1,
                              "overal": 1.3333333333333333
                          }
                      },
                      {
                          "name": "Spineback Turtle",
                          "id": "13",
                          "mana": 4,
                          "type": "blue",
                          "life": 6,
                          "armor": 2,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.25,
                              "defense": 2,
                              "overal": 2.25
                          }
                      },
                      {
                          "name": "Crustacean King",
                          "id": "14",
                          "mana": 3,
                          "type": "blue",
                          "life": 2,
                          "armor": 1,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Tank Heal"
                          ],
                          "rating": {
                              "attack": 0,
                              "defense": 1,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Sabre Shark",
                          "id": "15",
                          "mana": 3,
                          "type": "blue",
                          "life": 2,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Sneak"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.6666666666666666,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Feasting Seaweed",
                          "id": "168",
                          "mana": 4,
                          "type": "blue",
                          "life": 2,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Opportunity"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 0.5,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Albatross",
                          "id": "169",
                          "mana": 1,
                          "type": "blue",
                          "life": 1,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Flying"
                          ],
                          "rating": {
                              "attack": 0,
                              "defense": 1,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Tortisian Fighter",
                          "id": "170",
                          "mana": 4,
                          "type": "blue",
                          "life": 3,
                          "armor": 1,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Sniping Narwhal",
                          "id": "171",
                          "mana": 5,
                          "type": "blue",
                          "life": 4,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Snipe"
                          ],
                          "rating": {
                              "attack": 0.4,
                              "defense": 0.8,
                              "overal": 1.2000000000000002
                          }
                      },
                      {
                          "name": "Medusa",
                          "id": "17",
                          "mana": 4,
                          "type": "blue",
                          "life": 3,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 1,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.25,
                              "defense": 0.75,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Water Elemental",
                          "id": "18",
                          "mana": 5,
                          "type": "blue",
                          "life": 4,
                          "armor": 0,
                          "speed": 4,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Heal"
                          ],
                          "rating": {
                              "attack": 0.4,
                              "defense": 0.8,
                              "overal": 1.2000000000000002
                          }
                      },
                      {
                          "name": "Frozen Soldier",
                          "id": "19",
                          "mana": 6,
                          "type": "blue",
                          "life": 3,
                          "armor": 5,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Shield"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 1.3333333333333333,
                              "overal": 1.6666666666666665
                          }
                      },
                      {
                          "name": "Ice Pixie",
                          "id": "172",
                          "mana": 2,
                          "type": "blue",
                          "life": 1,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 1,
                          "abilities_num": 1,
                          "abilities": [
                              "Flying"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 0.5,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Giant Squid",
                          "id": "173",
                          "mana": 5,
                          "type": "blue",
                          "life": 4,
                          "armor": 1,
                          "speed": 1,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.4,
                              "defense": 1,
                              "overal": 1.4
                          }
                      },
                      {
                          "name": "Serpent of Eld",
                          "id": "174",
                          "mana": 7,
                          "type": "blue",
                          "life": 5,
                          "armor": 2,
                          "speed": 4,
                          "ranged": 0,
                          "attack": 3,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Dodge"
                          ],
                          "rating": {
                              "attack": 0.42857142857142855,
                              "defense": 1,
                              "overal": 1.4285714285714286
                          }
                      },
                      {
                          "name": "Flesh Golem",
                          "id": "23",
                          "mana": 6,
                          "type": "green",
                          "life": 9,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 1.5,
                              "overal": 1.8333333333333333
                          }
                      },
                      {
                          "name": "Goblin Sorcerer",
                          "id": "24",
                          "mana": 3,
                          "type": "green",
                          "life": 2,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 1,
                          "abilities_num": 1,
                          "abilities": [
                              "Sneak"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.6666666666666666,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Rexxie",
                          "id": "25",
                          "mana": 7,
                          "type": "green",
                          "life": 6,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 4,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.5714285714285714,
                              "defense": 0.8571428571428571,
                              "overal": 1.4285714285714284
                          }
                      },
                      {
                          "name": "Minotaur Warrior",
                          "id": "26",
                          "mana": 4,
                          "type": "green",
                          "life": 2,
                          "armor": 1,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Reach"
                          ],
                          "rating": {
                              "attack": 0.25,
                              "defense": 0.75,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Goblin Thief",
                          "id": "179",
                          "mana": 4,
                          "type": "green",
                          "life": 3,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Sneak"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 0.75,
                              "overal": 1.25
                          }
                      },
                      {
                          "name": "Failed Summoner",
                          "id": "180",
                          "mana": 2,
                          "type": "green",
                          "life": 4,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Magic Reflect"
                          ],
                          "rating": {
                              "attack": 0,
                              "defense": 2,
                              "overal": 2
                          }
                      },
                      {
                          "name": "Biceratops",
                          "id": "181",
                          "mana": 4,
                          "type": "green",
                          "life": 4,
                          "armor": 1,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1.25,
                              "overal": 1.75
                          }
                      },
                      {
                          "name": "Orc Sergeant",
                          "id": "182",
                          "mana": 5,
                          "type": "green",
                          "life": 6,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Reach"
                          ],
                          "rating": {
                              "attack": 0.2,
                              "defense": 1.2,
                              "overal": 1.4
                          }
                      },
                      {
                          "name": "Barking Spider",
                          "id": "225",
                          "mana": 4,
                          "type": "green",
                          "life": 5,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 1,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.25,
                              "defense": 1.25,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Harvester",
                          "id": "284",
                          "mana": 5,
                          "type": "green",
                          "life": 7,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.4,
                              "defense": 1.4,
                              "overal": 1.7999999999999998
                          }
                      },
                      {
                          "name": "Earth Elemental",
                          "id": "28",
                          "mana": 3,
                          "type": "green",
                          "life": 6,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 1,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 2,
                              "overal": 2.3333333333333335
                          }
                      },
                      {
                          "name": "Stone Golem",
                          "id": "29",
                          "mana": 5,
                          "type": "green",
                          "life": 6,
                          "armor": 2,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Shield"
                          ],
                          "rating": {
                              "attack": 0.2,
                              "defense": 1.6,
                              "overal": 1.8
                          }
                      },
                      {
                          "name": "Stonesplitter Orc",
                          "id": "30",
                          "mana": 6,
                          "type": "green",
                          "life": 4,
                          "armor": 1,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 3,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Retaliate"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 0.8333333333333334,
                              "overal": 1.3333333333333335
                          }
                      },
                      {
                          "name": "Khmer Princess",
                          "id": "183",
                          "mana": 2,
                          "type": "green",
                          "life": 2,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 1,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Unicorn Mustang",
                          "id": "184",
                          "mana": 8,
                          "type": "green",
                          "life": 10,
                          "armor": 0,
                          "speed": 4,
                          "ranged": 0,
                          "attack": 3,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Void"
                          ],
                          "rating": {
                              "attack": 0.375,
                              "defense": 1.25,
                              "overal": 1.625
                          }
                      },
                      {
                          "name": "Child of the Forest",
                          "id": "185",
                          "mana": 3,
                          "type": "green",
                          "life": 2,
                          "armor": 0,
                          "speed": 5,
                          "ranged": 1,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Snipe"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.6666666666666666,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Divine Healer",
                          "id": "34",
                          "mana": 3,
                          "type": "white",
                          "life": 4,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Tank Heal"
                          ],
                          "rating": {
                              "attack": 0,
                              "defense": 1.3333333333333333,
                              "overal": 1.3333333333333333
                          }
                      },
                      {
                          "name": "Feral Spirit",
                          "id": "35",
                          "mana": 3,
                          "type": "white",
                          "life": 2,
                          "armor": 0,
                          "speed": 4,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Sneak"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.6666666666666666,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Silvershield Knight",
                          "id": "36",
                          "mana": 6,
                          "type": "white",
                          "life": 5,
                          "armor": 1,
                          "speed": 4,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Inspire"
                          ],
                          "rating": {
                              "attack": 0.16666666666666666,
                              "defense": 1,
                              "overal": 1.1666666666666667
                          }
                      },
                      {
                          "name": "Silvershield Warrior",
                          "id": "37",
                          "mana": 4,
                          "type": "white",
                          "life": 3,
                          "armor": 1,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Reach"
                          ],
                          "rating": {
                              "attack": 0.25,
                              "defense": 1,
                              "overal": 1.25
                          }
                      },
                      {
                          "name": "Cave Slug",
                          "id": "146",
                          "mana": 5,
                          "type": "white",
                          "life": 4,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Opportunity"
                          ],
                          "rating": {
                              "attack": 0.4,
                              "defense": 0.8,
                              "overal": 1.2000000000000002
                          }
                      },
                      {
                          "name": "Crystal Jaguar",
                          "id": "147",
                          "mana": 4,
                          "type": "white",
                          "life": 5,
                          "armor": 1,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.25,
                              "defense": 1.5,
                              "overal": 1.75
                          }
                      },
                      {
                          "name": "Lone Boatman",
                          "id": "148",
                          "mana": 5,
                          "type": "white",
                          "life": 3,
                          "armor": 1,
                          "speed": 2,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Snipe"
                          ],
                          "rating": {
                              "attack": 0.4,
                              "defense": 0.8,
                              "overal": 1.2000000000000002
                          }
                      },
                      {
                          "name": "Herbalist",
                          "id": "149",
                          "mana": 2,
                          "type": "white",
                          "life": 2,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 1,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Peacebringer",
                          "id": "39",
                          "mana": 4,
                          "type": "white",
                          "life": 4,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Silvershield Paladin",
                          "id": "40",
                          "mana": 5,
                          "type": "white",
                          "life": 5,
                          "armor": 1,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Shield"
                          ],
                          "rating": {
                              "attack": 0.2,
                              "defense": 1.2,
                              "overal": 1.4
                          }
                      },
                      {
                          "name": "Clay Golem",
                          "id": "41",
                          "mana": 6,
                          "type": "white",
                          "life": 7,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 3,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Void"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1.1666666666666667,
                              "overal": 1.6666666666666667
                          }
                      },
                      {
                          "name": "Truthspeaker",
                          "id": "150",
                          "mana": 3,
                          "type": "white",
                          "life": 1,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Protect"
                          ],
                          "rating": {
                              "attack": 0,
                              "defense": 0.3333333333333333,
                              "overal": 0.3333333333333333
                          }
                      },
                      {
                          "name": "Luminous Eagle",
                          "id": "151",
                          "mana": 6,
                          "type": "white",
                          "life": 5,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 2,
                          "abilities": [
                              "Reach",
                              "Flying"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.8333333333333334,
                              "overal": 1.1666666666666667
                          }
                      },
                      {
                          "name": "Shieldbearer",
                          "id": "152",
                          "mana": 8,
                          "type": "white",
                          "life": 9,
                          "armor": 4,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Taunt"
                          ],
                          "rating": {
                              "attack": 0.25,
                              "defense": 1.625,
                              "overal": 1.875
                          }
                      },
                      {
                          "name": "Animated Corpse",
                          "id": "45",
                          "mana": 4,
                          "type": "black",
                          "life": 6,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1.5,
                              "overal": 2
                          }
                      },
                      {
                          "name": "Haunted Spider",
                          "id": "46",
                          "mana": 3,
                          "type": "black",
                          "life": 2,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.6666666666666666,
                              "defense": 0.6666666666666666,
                              "overal": 1.3333333333333333
                          }
                      },
                      {
                          "name": "Skeleton Assassin",
                          "id": "47",
                          "mana": 3,
                          "type": "black",
                          "life": 2,
                          "armor": 0,
                          "speed": 4,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Sneak"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.6666666666666666,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Spineback Wolf",
                          "id": "48",
                          "mana": 5,
                          "type": "black",
                          "life": 3,
                          "armor": 1,
                          "speed": 6,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Reach"
                          ],
                          "rating": {
                              "attack": 0.2,
                              "defense": 0.8,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Maggots",
                          "id": "135",
                          "mana": 3,
                          "type": "black",
                          "life": 1,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Opportunity"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.3333333333333333,
                              "overal": 0.6666666666666666
                          }
                      },
                      {
                          "name": "Cursed Slimeball",
                          "id": "136",
                          "mana": 1,
                          "type": "black",
                          "life": 1,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 1,
                              "defense": 1,
                              "overal": 2
                          }
                      },
                      {
                          "name": "Giant Scorpion",
                          "id": "137",
                          "mana": 4,
                          "type": "black",
                          "life": 4,
                          "armor": 1,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.25,
                              "defense": 1.25,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Undead Badger",
                          "id": "138",
                          "mana": 2,
                          "type": "black",
                          "life": 1,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Sneak"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 0.5,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Haunted Spirit",
                          "id": "50",
                          "mana": 5,
                          "type": "black",
                          "life": 7,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Heal"
                          ],
                          "rating": {
                              "attack": 0.4,
                              "defense": 1.4,
                              "overal": 1.7999999999999998
                          }
                      },
                      {
                          "name": "Twisted Jester",
                          "id": "51",
                          "mana": 4,
                          "type": "black",
                          "life": 4,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Snipe"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Undead Priest",
                          "id": "52",
                          "mana": 2,
                          "type": "black",
                          "life": 3,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Weaken"
                          ],
                          "rating": {
                              "attack": 0,
                              "defense": 1.5,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Dark Astronomer",
                          "id": "139",
                          "mana": 4,
                          "type": "black",
                          "life": 4,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Bone Golem",
                          "id": "140",
                          "mana": 7,
                          "type": "black",
                          "life": 6,
                          "armor": 2,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 3,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Void"
                          ],
                          "rating": {
                              "attack": 0.42857142857142855,
                              "defense": 1.1428571428571428,
                              "overal": 1.5714285714285714
                          }
                      },
                      {
                          "name": "Death Elemental",
                          "id": "141",
                          "mana": 3,
                          "type": "black",
                          "life": 2,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 1,
                          "abilities_num": 1,
                          "abilities": [
                              "Snipe"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.6666666666666666,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Peaceful Giant",
                          "id": "60",
                          "mana": 5,
                          "type": "gray",
                          "life": 8,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0,
                              "defense": 1.6,
                              "overal": 1.6
                          }
                      },
                      {
                          "name": "Grumpy Dwarf",
                          "id": "61",
                          "mana": 4,
                          "type": "gray",
                          "life": 2,
                          "armor": 1,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Reach"
                          ],
                          "rating": {
                              "attack": 0.25,
                              "defense": 0.75,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Elven Cutthroat",
                          "id": "62",
                          "mana": 3,
                          "type": "gray",
                          "life": 1,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Sneak"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.3333333333333333,
                              "overal": 0.6666666666666666
                          }
                      },
                      {
                          "name": "Centaur",
                          "id": "63",
                          "mana": 4,
                          "type": "gray",
                          "life": 4,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 1,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Snipe"
                          ],
                          "rating": {
                              "attack": 0.25,
                              "defense": 1,
                              "overal": 1.25
                          }
                      },
                      {
                          "name": "Elven Defender",
                          "id": "190",
                          "mana": 8,
                          "type": "gray",
                          "life": 8,
                          "armor": 3,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 2,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.25,
                              "defense": 1.375,
                              "overal": 1.625
                          }
                      },
                      {
                          "name": "Horny Toad",
                          "id": "191",
                          "mana": 3,
                          "type": "gray",
                          "life": 2,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Reach"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.6666666666666666,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Mantoid",
                          "id": "192",
                          "mana": 6,
                          "type": "gray",
                          "life": 5,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Snipe"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.8333333333333334,
                              "overal": 1.1666666666666667
                          }
                      },
                      {
                          "name": "Parasitic Growth",
                          "id": "193",
                          "mana": 4,
                          "type": "gray",
                          "life": 2,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Opportunity"
                          ],
                          "rating": {
                              "attack": 0.25,
                              "defense": 0.5,
                              "overal": 0.75
                          }
                      },
                      {
                          "name": "Cocatrice",
                          "id": "64",
                          "mana": 2,
                          "type": "gray",
                          "life": 2,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 0,
                          "attack": 1,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Flying"
                          ],
                          "rating": {
                              "attack": 0.5,
                              "defense": 1,
                              "overal": 1.5
                          }
                      },
                      {
                          "name": "Cyclops",
                          "id": "65",
                          "mana": 6,
                          "type": "gray",
                          "life": 5,
                          "armor": 0,
                          "speed": 1,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.8333333333333334,
                              "overal": 1.1666666666666667
                          }
                      },
                      {
                          "name": "Enchanted Pixie",
                          "id": "66",
                          "mana": 3,
                          "type": "gray",
                          "life": 1,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 1,
                          "abilities_num": 1,
                          "abilities": [
                              "Flying"
                          ],
                          "rating": {
                              "attack": 0.3333333333333333,
                              "defense": 0.3333333333333333,
                              "overal": 0.6666666666666666
                          }
                      },
                      {
                          "name": "Elven Mystic",
                          "id": "194",
                          "mana": 4,
                          "type": "gray",
                          "life": 3,
                          "armor": 0,
                          "speed": 2,
                          "ranged": 0,
                          "attack": 0,
                          "magic": 1,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.25,
                              "defense": 0.75,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Goblin Chariot",
                          "id": "195",
                          "mana": 5,
                          "type": "gray",
                          "life": 3,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 2,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 0,
                          "abilities": [],
                          "rating": {
                              "attack": 0.4,
                              "defense": 0.6,
                              "overal": 1
                          }
                      },
                      {
                          "name": "Tower Griffin",
                          "id": "196",
                          "mana": 4,
                          "type": "gray",
                          "life": 3,
                          "armor": 0,
                          "speed": 3,
                          "ranged": 1,
                          "attack": 0,
                          "magic": 0,
                          "abilities_num": 1,
                          "abilities": [
                              "Flying"
                          ],
                          "rating": {
                              "attack": 0.25,
                              "defense": 0.75,
                              "overal": 1
                          }
                      }
                     ]

    const SUMMONERS = [{
        "name": "Malric Inferno",
        "id": "5",
        "mana": "3",
        "type": "red",
        "ability": "All friendly Melee Attack Monsters have +1 Melee Attack"
    },
                       {
                           "name": "Pyre",
                           "id": "167",
                           "mana": "3",
                           "type": "red",
                           "ability": "All friendly Monsters have +1 Speed"
                       },
                       {
                           "name": "Alric Stormbringer",
                           "id": "16",
                           "mana": "3",
                           "type": "blue",
                           "ability": "All friendly Magic Attack Monsters have +1 Magic Attack"
                       },
                       {
                           "name": "Bortus",
                           "id": "178",
                           "mana": "3",
                           "type": "blue",
                           "ability": "All enemy Magic Attack Monsters have -1 Magic Attack"
                       },
                       {
                           "name": "Lyanna Natura",
                           "id": "27",
                           "mana": "3",
                           "type": "green",
                           "ability": "All friendly Monsters have +1 Health"
                       },
                       {
                           "name": "Wizard of Eastwood",
                           "id": "189",
                           "mana": "3",
                           "type": "green",
                           "ability": "All enemy Monsters have -2 Armor"
                       },
                       {
                           "name": "Tyrus Paladium",
                           "id": "38",
                           "mana": "3",
                           "type": "white",
                           "ability": "All friendly Monsters have +1 Armor"
                       },
                       {
                           "name": "Mother Khala",
                           "id": "156",
                           "mana": "3",
                           "type": "white",
                           "ability": "All friendly Monsters have +1 Health"
                       },
                       {
                           "name": "Zintar Mortalis",
                           "id": "49",
                           "mana": "3",
                           "type": "black",
                           "ability": "All enemy Melee Attack Monsters have -1 Melee Attack"
                       },
                       {
                           "name": "Contessa L'ament",
                           "id": "145",
                           "mana": "3",
                           "type": "black",
                           "ability": "All enemy Ranged Attack Monsters have -1 Ranged Attack"
                       },
                       {
                           "name": "Drake of Arnak",
                           "id": "224",
                           "mana": "4",
                           "type": "gold",
                           "ability": "All friendly Monsters have +1 Armor"
                       }
                      ]

    const TYPE_CONVERT = {

        'red': 'Fire',
        'blue': 'Water',
        'green': 'Earth',
        'white': 'Life',
        'black': 'Death',
        'gold': 'Dragon',
        'gray': 'Neutral'
    }


    setInterval(function () {

        if(window.location.href.includes("battle_history") && !document.querySelector('.loading-backdrop') && !document.querySelector('.find_opponent_dialog') && !document.querySelector('.btn.btn--surrender')){
            setTimeout(() => {
                selected = false
                document.getElementById('battle_category_btn').click()
            }, 3000);
        }

        if(window.location.href.includes("battle_history") && document.querySelector('.btn--create-team')){
            setTimeout(() => {

                document.querySelector('.btn--create-team').click()
            },5000);

        }


        if(window.location.href.includes("create_team2") && !document.getElementById('wait_for_opponent_dialog') && !document.querySelector('.loading-backdrop') && !document.querySelector('.battle-results')){
            setTimeout(async () => {
                if(!selected){
                    console.log(parseInt(document.querySelector('.mana-cap__icon').getAttribute('data-original-title').split(':')[1].trim()))
                    MATCH_MANA = parseInt(document.querySelector('.mana-total .mana-cap').innerText)
                    await getLineup(MATCH_MANA, SLOTS, SUMMONER_TYPE)
                    selected = true

                }
            }, 5000);

        }


        if (window.location.href.includes("p=battle&id=")){
            setTimeout(function() {
                window.location ='https://splinterlands.com/?p=battle_history'

            },5000)

        }

    }, 8000)



    async function getLineup(MATCH_MANA, SLOTS, SUMMONER_TYPE) {

        var used_mana = 0
        var used_slots = 0
        var lineup = []

        var FILTERED_MONSTERS = MONSTERS.filter(mon => {
            return (mon.type == SUMMONER_TYPE) || mon.type == 'gray'
        })
        let FILTERED_SUMMONER = SUMMONERS.filter(sum => {
            return (sum.type == SUMMONER_TYPE)
        })
        console.log(FILTERED_SUMMONER)
        let SUMMONER = FILTERED_SUMMONER[chose_random_index(FILTERED_SUMMONER.length)]
        used_mana += parseInt(SUMMONER.mana)
        SUMMONER_ID = SUMMONER.id
        //console.log("Avaliable mana: ", MATCH_MANA)
        lineup.push(SUMMONER)
        //console.log(FILTERED_MONSTERS)

        //First monster
        let first = await select_first(MATCH_MANA - used_mana, FILTERED_MONSTERS)
        lineup.push(first)
        used_mana += parseInt(first.mana)
        used_slots += 1
        //
        MONSTER_IDS.push(first.id)

        let remaining_slots = await select_remaining(MATCH_MANA - used_mana, FILTERED_MONSTERS, used_slots)


        remaining_slots.forEach(e => lineup.push(e))

        remaining_slots.forEach(e => MONSTER_IDS.push(parseInt(e.id)))

        console.log(MATCH_MANA, MONSTER_IDS, SUMMONER_ID)

        await card_selection()




        // console.log("Created lineup:")
        //console.log(lineup) //return
    }

    async function card_selection(){

        setTimeout(function() {
            console.log("Sum", SUMMONER_ID)
            console.log(document.querySelector('[card_detail_id="'+SUMMONER_ID+'"] > img'))
            document.querySelector('[card_detail_id="'+parseInt(SUMMONER_ID)+'"] > img').click();
            SUMMONER_ID = null
        }, 1000)


        MONSTER_IDS.forEach((e,index) => {
            setTimeout(function() {
                console.log("Mon",e,index)
                console.log(document.querySelector('[card_detail_id="'+e+'"] > img'))
                console.log("Int",document.querySelector('[card_detail_id="'+parseInt(e)+'"] > img'))
                document.querySelector('[card_detail_id="'+parseInt(e)+'"] > img').click();
                console.log("INDEX/ID: ", index, MONSTER_IDS.length)
                if (index+1 == MONSTER_IDS.length){
                    setTimeout(function() {
                        document.querySelector('.btn-green').click()
                    },1000)
                }
            }, 2000*(index+1));
        })
        //document.querySelector('mana-cap__icon > div > div').innerText


    }

    async function select_first(remaining_mana, FILTERED_MONSTERS) {
        let mon = await getMonsterByName(FIRST_MONSTER_DEFENSE_NAME, FILTERED_MONSTERS.slice())
        //console.log(mon,mon.mana, remaining_mana-1)
        if (FIRST_MONSTER_DEFENSE) {
            // console.log("mon",mon)
            if (FIRST_MONSTER_DEFENSE_NAME && mon.mana < remaining_mana) {
                return mon
            }
            let tempm = sortByStat(FILTERED_MONSTERS.slice(), 'life')
            if (tempm.length > 5) {
                tempm.splice(0, tempm.length - 2)
                let first = tempm[chose_random_index(tempm.length)]
                if (first.mana < remaining_mana) {
                    return first
                }
            }
        }


    }

    async function select_remaining(remaining_mana, FILTERED_MONSTERS, used_slots) {
        var list = []

        let mons = sortByRating(FILTERED_MONSTERS, 'attack')
        let mana = remaining_mana
        console.log(remaining_mana)
        let slots = SLOTS - used_slots

        let i = 0
        while (i < 1) {

            let sub = []
            let temp_mana = mana
            let temp_slots = slots
            let temp = mons.slice()

            while (temp_mana > 0 && temp_slots > 0) {

                let a = temp.filter(e => e.mana <= temp_mana)
                if (a.length == 0) {
                    break
                }

                let index = chose_random_index(a.length)
                temp_mana -= a[index].mana
                temp_slots--

                sub.push(a[index])
                temp.splice(index, 1)
            }

            list.push(sub)

            i++
        }

        let r = list[chose_random_index(list.length)]
        return r

    }

    async function getMonsterByName(mon_name, FILTERED_MONSTERS) {
        var obj
        FILTERED_MONSTERS.forEach(e => {
            if (e.name == mon_name) {
                obj = e
            }
        })

        return obj
    }

    function chose_random_index(max) {
        let index = Math.floor(Math.random() * max)
        return index
    }

    function sortByRating(array, key) {
        return array.sort(function (a, b) {
            var x = a.rating[key];
            var y = b.rating[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    function sortByStat(array, key) {
        return array.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }


})();
