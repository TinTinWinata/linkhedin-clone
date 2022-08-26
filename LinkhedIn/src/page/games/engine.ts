import { GET_BACKGROUND, GET_LAND, GET_MEGAMEN_RUN, MEGAMEN_CONF } from "./config";


export function runGame(canvas : any){
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.width;
  let lastDate : any = new Date();
  let interval = 0;
  const fps = 60
  const gravity = 0.2;
  let keys : any= []


  // Background
  class Background{
    sprite: any
    landSprite : any
    constructor(){
      this.sprite = GET_BACKGROUND();
      this.landSprite = GET_LAND()
    }
    render(){
      // Render Background
      ctx.drawImage(this.sprite, 0, 0, canvas.width, canvas.height)

      // Render Land
      const dyLand = canvas.height - this.landSprite.height;
      ctx.drawImage(this.landSprite, 0, dyLand, canvas.width, this.landSprite.height)
    }
  }



  class Collider{
    x : number;
    y: number;
    w : number;
    h : number;
    constructor(){
      this.x = 0;
      this.y = canvas.height - 32;
      this.w = canvas.width;
      this.h = 50;
    }

    isCollide(x : any, y : any){
      if(y <= this.y + this.h && this.x <= x && this.y <= y && this.x + this.w >= x){
        return true;
      }else{
        return false;
      }
    }

    render(){
      ctx.fillStyle = "red"
      ctx.fillRect(this.x, this.y, this.w, this.h)
    }

  }

  class Megamen{
    sprite : any
    spriteState: number
    conf : any
    spriteSlow : any;
    tempSlow: number;
    velocityX : number;
    velocityY : number;
    maxSpeed : number;
    speedX : number;
    speedY: number;
    x : number;
    y : number;
    w: number;
    h: number;
    jumpForce: number;

    constructor(){
      this.x = 0
      this.y = 0
      this.sprite = GET_MEGAMEN_RUN()
      this.spriteState = 0;
      this.conf = MEGAMEN_CONF;
      this.spriteSlow = 4;
      this.tempSlow = 0;
      this.velocityX = 0;
      this.velocityY = 0;
      this.maxSpeed = 2;
      this.speedX = 0.3; 
      this.jumpForce = 6;
      this.speedY = 1;
      this.w = this.sprite[0].width;
      this.h = this.sprite[0].height;
    }

    isGrounded(){
      if(collider.isCollide(this.x + this.w / 2, this.y + this.h + gravity)){
        return true;
      }else{
        return false;
      }
    }

    incrementState(){
        if(this.tempSlow >= this.spriteSlow)
        {
          this.tempSlow = 0;
          this.spriteState += 1;
          if(this.spriteState === this.conf.run){
            this.spriteState = 0;
          }
        }
        this.tempSlow += 1;
      }

    move(str : string, velocity: number){
      // Kiri
      if(str === "left" && !collider.isCollide(this.x + velocity, this.y + this.h / 2))
      {
        this.velocityX = velocity;
      }else if (str === "right" && !collider.isCollide(this.x + this.w + velocity, this.y + this.h / 2))
      {
        this.velocityX = velocity;
      }else if(str === "up")
      {
        this.velocityY = velocity;
      }else if(str === "down")
      {
        this.velocityY = velocity;
      }
    }

    logic(){
      if(this.velocityX >= this.maxSpeed)
      this.velocityX = this.maxSpeed;
      if(this.velocityX <= -this.maxSpeed){
      this.velocityX = - this.maxSpeed
      }

      
      if(collider.isCollide(this.x + this.w / 2, this.y  + this.h + this.velocityY))
      {
        this.velocityY = 0;
      }else{
        this.velocityY += gravity;
      }
      
      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    render(){
      this.logic()
      ctx.drawImage(this.sprite[this.spriteState], this.x,this.y)
      this.incrementState()
    }
  }


  document.addEventListener('keydown', (e : any)=>{
    keys[e.key] = true
    if(e.key === 'w'){
      if(megamen.isGrounded())
      megamen.velocityY -= megamen.jumpForce;
    }
  })
  document.addEventListener('keyup', (e : any)=>{
    keys[e.key] = false
  })

  function debug(x : number, y : number, w : number, h : number){
    ctx.fillStyle = "red"
    ctx.fillRect(x, y, w, h);
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
    if(interval >= 1 / fps)
    {
      interval = 0;
      return true;
    }else{
      return false
    }
  }

  function checkKeys(){
    if(keys['a'])
    {
      megamen.move("left", megamen.velocityX - megamen.speedX)
    }else if(keys['d'])
    {
      megamen.move("right", megamen.velocityX + megamen.speedX)
    }else{
      megamen.velocityX = 0;
    }
  }

  // Create Instance
  const background = new Background()
  const megamen = new Megamen()
  const collider = new Collider()


  render();

  function render(){  
    requestAnimationFrame(render)
    checkKeys()
    if(isRun()){
      ctx.clearRect(0,0, canvas.width, canvas.height0)
      background.render()
      megamen.render()
    }
  }
    

}