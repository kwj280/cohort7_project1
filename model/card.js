
const cards = [{
    ui: {
          bg: 'bg_red',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'skull',
      },
      title: 'Boss',
      arrX: 1,
      arrY: 0,
      cost_num: 1,
      monsters: ['reper']

    },
    {
      ui: {
          bg: 'bg_blue',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'event',
      },
      title: 'Event',
      arrX: 0,
      arrY: 1,
      cost_num: 3,
      event: {
        id: 1,
        description:"Not implemented yet.",
        choices:["Leave"]
      }
    },
    {
      ui: {
          bg: 'bg_grey',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'campfire',
      },
      title: 'Rest',
      arrX: 1,
      arrY: 1,
      cost_num: 2
    },
    {
      ui: {
          bg: 'bg_red',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'skull',
      },
      title: 'Battle',
      arrX: 2,
      arrY: 1,
      cost_num: 1,
      monsters: ['goblin', 'skeleton', 'flying_eye']
      
    },
    {
      ui: {
          bg: 'bg_blue',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'treasure',
      },
      title: 'Treasure',
      arrX: 0,
      arrY: 2,
      cost_num: 9
    },
    {
      ui: {
          bg: 'bg_red',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'skull',
      },
      title: 'Battle',
      arrX: 1,
      arrY: 2,
      cost_num: 1,
      monsters: ['skeleton', 'flying_eye']

    },
    {
      ui: {
          bg: 'bg_grey',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'trade',
      },
      title: 'Trade',
      arrX: 2,
      arrY: 2,
      cost_num: 3
    },
    {
      ui: {
          bg: 'bg_red',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'skull',
      },
      title: 'Battle',
      arrX: 0,
      arrY: 3,
      cost_num: 1,
      monsters: ['goblin', 'skeleton']

    },
    {
      ui: {
          bg: 'bg_grey',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'campfire',
      },
      title: 'Rest',
      arrX: 1,
      arrY: 3,
      cost_num: 2
    },
    {
      ui: {
          bg: 'bg_blue',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'event',
      },
      title: 'Event',
      arrX: 2,
      arrY: 3,
      cost_num: 4,
      event: {
        id: 0,
        description:"You found a food. It's a pineapple pizza.",
        choices:["<i>Eat</i>","<i>Run</i> away"]
      }
    },
    {
      ui: {
          bg: 'bg_red',
          frame: 'frame_wood',
          cost: 'cost_wood',
          desc: 'desc_wood',
          img: 'skull',
      },
      title: 'Battle',
      arrX: 1,
      arrY: 4,
      cost_num: 1,
      monsters: ['goblin']
    },
    {
      ui: {
          bg: 'bg_purple',
          frame: 'none',
          cost: 'cost_stone',
          desc: 'desc_stone',
          img: 'main_char'
      },
      arrX: 1,
      arrY: 5,
      cost_num: 0,
      title: 'You',
  }
]




const getCards = () => {
    return cards;
}

module.exports = {
    getCards,
}