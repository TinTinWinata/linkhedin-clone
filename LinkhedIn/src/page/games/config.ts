const MEGAMEN_RUN_URL = "/megamen/megamen/run"
const BACKGROUND_URL = "/megamen/background.jpg"
const LAND_URL = "/megamen/land.png"
const MEGAMEN_IDLE_URL = "/megamen/megamen/walk"
const MEGAMEN_JUMP_URL = "/megamen/megamen/jump/jump.png"
const MEGAMEN_SHOOT_PARTICLE_URL = "/megamen/megamen/shoot-particle"
const MEGAMEN_BULLET_URL = "/megamen/megamen/bullet"
const MEGAMENG_SHOOTING_URL = "megamen/megamen/shoot"

export const MEGAMEN_CONF = {
  run: 10,
  walk: 3,
  jump : 1, 
  shoot_particle: 3,
  bullet: 4,
  shoot: 2,
} 

export function MEGAMEN_GET_SHOOT(){
  const folder_url = MEGAMENG_SHOOTING_URL
  const conf = MEGAMEN_CONF  
  const howMany = conf.shoot
  let sprite = []
  for(let i = 1;i <= howMany; i++){
    const numFormat = i.toLocaleString('en-US',{
      minimumIntegerDigits : 2,
    })
    const url = folder_url + `/shoot_${numFormat}.png`
    const img = new Image()
    img.src = url;
    
    sprite.push(img)
  }
  return sprite;
}

export function MEGAMEN_GET_BULLET(){
  const folder_url = MEGAMEN_BULLET_URL
  const conf = MEGAMEN_CONF  
  const howMany = conf.bullet
  let sprite = []
  for(let i = 1;i <= howMany; i++){
    const numFormat = i.toLocaleString('en-US',{
      minimumIntegerDigits : 2,
    })
    const url = folder_url + `/bullet_${numFormat}.png`
    const img = new Image()
    img.src = url;
    
    sprite.push(img)
  }
  return sprite;
}

export function MEGAMEN_GET_SHOOT_PARTICLE(){
  const folder_url = MEGAMEN_SHOOT_PARTICLE_URL
  const conf = MEGAMEN_CONF  
  const howMany = conf.shoot_particle
  let sprite = []
  for(let i = 1;i <= howMany; i++){
    const numFormat = i.toLocaleString('en-US',{
      minimumIntegerDigits : 2,
    })
    const url = folder_url + `/shoot-particle_${numFormat}.png`
    const img = new Image()
    img.src = url;
    
    sprite.push(img)
  }
  return sprite;
}

export function MEGAMENT_GET_JUMP(){
  const url = MEGAMEN_JUMP_URL;
  const sprite = []
  const img = new Image()
  img.src = url;
  sprite.push(img)
  return sprite;
}

export function MEGAMEN_GET_WALK(){
  const run_url = MEGAMEN_IDLE_URL
  const conf = MEGAMEN_CONF  
  const howMany = conf.walk
  let sprite = []
  for(let i = 1;i <= howMany; i++){
    const numFormat = i.toLocaleString('en-US',{
      minimumIntegerDigits : 2,
    })
    const url = run_url + `/walk_${numFormat}.png`
    const img = new Image()
    img.src = url;
    
    sprite.push(img)
  }
  return sprite;
}

export function GET_LAND(){
  const img = new Image();
  img.src = LAND_URL;
  return img;
}

export function GET_BACKGROUND(){
  const img = new Image();
  img.src = BACKGROUND_URL;
  return img
}

export function MEGAMEN_GET_RUN(){
  const run_url = MEGAMEN_RUN_URL
  const conf = MEGAMEN_CONF  
  const howMany = conf.run
  let sprite = []
  for(let i = 1;i <= howMany; i++){
    const numFormat = i.toLocaleString('en-US',{
      minimumIntegerDigits : 2,
    })
    const url = run_url + `/run_${numFormat}.png`
    const img = new Image()
    img.src = url;
    sprite.push(img)
  }
  return sprite;
}