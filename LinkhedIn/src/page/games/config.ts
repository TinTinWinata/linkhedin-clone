const MEGAMEN_RUN_URL = "/megamen/megamen/run"
const BACKGROUND_URL = "/megamen/background.jpg"
const LAND_URL = "/megamen/land.png"
const MEGAMEN_IDLE_URL = "/megamen/megamen/walk"
const MEGAMEN_JUMP_URL = "/megamen/megamen/jump/jump.png"
const MEGAMEN_SHOOT_PARTICLE_URL = "/megamen/megamen/shoot-particle"
const MEGAMEN_BULLET_URL = "/megamen/megamen/bullet"
const MEGAMEN_SHOOT_URL = "/megamen/megamen/shoot"
const HEART_URL = "/megamen/heart.png"
const MEGAMEN_PROFILE_URL = "/megamen/megamen/profile.png"
const ICEMAN_PROFILE_URL = "/megamen/icemen/profile.png"
const ICEMAN_JUMP_URL = "/megamen/icemen/jump.png"
const ICEMAN_RUN_URL = "/megamen/icemen/run"
const ICEMAN_IDLE_URL = "/megamen/icemen/idle"
const ICEMAN_SHOOT_URL = "/megamen/icemen/shoot"
const ICEMAN_BULLET_URL = "/megamen/icemen/bullet.png"
const MUSIC_URL = "/megamen/music.mp3"

export const MEGAMEN_CONF = {
  run: 10,
  walk: 3,
  jump : 1, 
  shoot_particle: 3,
  bullet: 4,
  shoot: 2,
} 

export const ICEMAN_CONF = {
  run: 10,
  idle: 2,
  jump : 1, 
  shoot_particle: 0,
  bullet: 1,
  shoot: 3,
}

export function GET_MUSIC(){
  return new Audio(MUSIC_URL)
}

export function ICEMAN_GET_BULLET(){
  const folder_url = ICEMAN_BULLET_URL
  const conf = ICEMAN_CONF  
  const howMany = conf.bullet
  let sprite = []
  for(let i = 1;i <= howMany; i++){
    const numFormat = i.toLocaleString('en-US',{
      minimumIntegerDigits : 2,
    })
    const url = folder_url 
    const img = new Image()
    img.src = url;
    
    sprite.push(img)
  }
  return sprite;
}

export function ICEMAN_GET_SHOOT(){
  const folder_url = ICEMAN_SHOOT_URL
  const conf = ICEMAN_CONF  
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


export function ICEMAN_GET_IDLE(){
  const folder_url = ICEMAN_IDLE_URL
  const conf = ICEMAN_CONF  
  const howMany = conf.idle
  let sprite = []
  for(let i = 1;i <= howMany; i++){
    const numFormat = i.toLocaleString('en-US',{
      minimumIntegerDigits : 2,
    })
    const url = folder_url + `/idle_${numFormat}.png`
    const img = new Image()
    img.src = url;
    
    sprite.push(img)
  }
  return sprite;
}

export function ICEMAN_GET_RUN(){
  const folder_url = ICEMAN_RUN_URL
  const conf = ICEMAN_CONF  
  const howMany = conf.run
  let sprite = []
  for(let i = 1;i <= howMany; i++){
    const numFormat = i.toLocaleString('en-US',{
      minimumIntegerDigits : 2,
    })
    const url = folder_url + `/run_${numFormat}.png`
    const img = new Image()
    img.src = url;
    
    sprite.push(img)
  }
  return sprite;
}

export function ICEMAN_GET_JUMP(){
  const folder_url = ICEMAN_JUMP_URL
  const conf = ICEMAN_CONF  
  const howMany = conf.jump
  let sprite = []
  for(let i = 1;i <= howMany; i++){
    const numFormat = i.toLocaleString('en-US',{
      minimumIntegerDigits : 2,
    })
    const url = folder_url 
    const img = new Image()
    img.src = url;
    
    sprite.push(img)
  }
  return sprite;
}

export function ICEMAN_GET_PROFILE(){
  const image = new Image();
  image.src = ICEMAN_PROFILE_URL;
  return image;
}

export function MEGAMEN_GET_PROFILE(){
  const image = new Image();
  image.src = MEGAMEN_PROFILE_URL;
  return image;
}

export function GET_HEARTH(){
  const image = new Image();
  image.src = HEART_URL;
  return image;
}

export function MEGAMEN_GET_SHOOT(){
  const folder_url = MEGAMEN_SHOOT_URL
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