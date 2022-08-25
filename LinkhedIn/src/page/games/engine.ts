import { GET_BACKGROUND, GET_MEGAMEN_RUN, MEGAMEN_CONF } from "./file";


export function runGame(canvas : any){
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.width;
  let lastDate : any = new Date();
  let interval = 0;


  // Background
  class Background{
    sprite: any
    constructor(){
      this.sprite = GET_BACKGROUND();
    }
    render(){
      ctx.drawImage(this.sprite, 0, 0, canvas.width, canvas.height)
    }
  }

  class Megamen{
    sprite : any
    spriteState: number
    conf : any
    constructor(){
      this.sprite = GET_MEGAMEN_RUN()
      this.spriteState = 0;
      this.conf = MEGAMEN_CONF
    }
    incrementState(){
      this.spriteState += 1;
      if(this.spriteState === this.conf.run){
        this.spriteState = 0;
      }
    }

    render(){
      ctx.drawImage(this.sprite[this.spriteState], 0,0)
      this.incrementState()
    }
  }

  function getDeltaTime() {
    const newDate : any = new Date();
    const temp : any  =  newDate - lastDate;
    lastDate = newDate;
    return temp / 1000
  }

  function isRun(){
    const delta = getDeltaTime()
    interval += delta
    console.log('delta : ', delta);
    if(interval == 1)
    {
      return true;
    }else{
      return false
    }
  }

  // Create Instance
  const background = new Background()
  const megamen = new Megamen()
  

  setInterval(()=>{
    background.render()
    megamen.render()
  }, 100)


}