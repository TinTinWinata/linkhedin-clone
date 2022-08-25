export const MEGAMEN_RUN_URL = "/megamen/megamen/run"
export const BACKGROUND_URL = "/megamen/background.jpg"

export const MEGAMEN_CONF = {
  run: 10,
} 

export function GET_BACKGROUND(){
  const img = new Image();
  img.src = BACKGROUND_URL;
  return img
}

export function GET_MEGAMEN_RUN(){
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