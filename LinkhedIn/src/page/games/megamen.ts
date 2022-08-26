import { GET_BACKGROUND, GET_LAND, MEGAMEN_GET_RUN, MEGAMEN_CONF, MEGAMEN_GET_WALK } from "./config";


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
    spriteLength: number;
    isBackward: boolean;

    constructor(){
      this.x = 0
      this.y = 0
      this.sprite = MEGAMEN_GET_WALK()
      this.spriteState = 0;
      this.spriteLength = this.sprite.length;
      this.conf = MEGAMEN_CONF;
      this.spriteSlow = 60;
      this.tempSlow = 0;
      this.velocityX = 0;
      this.velocityY = 0;
      this.maxSpeed = 2;
      this.speedX = 0.3; 
      this.jumpForce = 6;
      this.speedY = 1;
      this.w = this.sprite[0].width;
      this.h = this.sprite[0].height;
      this.isBackward = false;
    }

    isGrounded(){
      if(collider.isCollide(this.x + this.w / 2, this.y + this.h + gravity)){
        return true;
      }else{
        return false;
      }
    }

    checkW(){
      this.w = this.sprite[0].width
      this.h = this.sprite[0].height
    }

    changeState(str : string){
      switch (str){
        case "idle":
        this.sprite = MEGAMEN_GET_WALK()
        this.spriteLength = this.conf.walk;
        this.spriteSlow = 60;
        break;
        case "run":
        this.sprite = MEGAMEN_GET_RUN()
        this.spriteLength = this.conf.run;
        this.spriteSlow = 4;
        break;
      }
      this.checkW();
    }

    incrementState(){
       if(this.tempSlow >= this.spriteSlow)
       {
         this.tempSlow = 0;
         this.spriteState += 1;
        }
        this.tempSlow += 1;
      }

    move(str : string, velocity: number){
      if(str === "left" && !collider.isCollide(this.x + velocity, this.y + this.h / 2))
      {
        this.isBackward = true;
        this.velocityX = velocity;
      }else if (str === "right" && !collider.isCollide(this.x + this.w + velocity, this.y + this.h / 2))
      {
        ctx.restore()
        this.isBackward = false;
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

      if(isExistsMap(this.x + this.velocityX, this.y + this.h / 2) || isExistsMap(this.x + this.velocityX + this.w, this.y + this.h / 2))
      {
        this.velocityX = 0;
      }

      this.checkState()

      this.x += this.velocityX;
      this.y += this.velocityY;
    }

    checkState(){
      if(this.velocityX === 0){
        this.changeState("idle");
      }else{
        this.changeState("run")
      }
    }

    render(){
      this.logic()
      const state = this.spriteState % this.spriteLength;

      if(this.isBackward){
        ctx.save();
        ctx.scale(-1, 1);
        ctx.drawImage(this.sprite[state], -this.x, this.y, -this.w, this.h)
      }else{
        ctx.scale(1, 1);
        ctx.drawImage(this.sprite[state], this.x,this.y)
      }

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

  function isExistsMap(x: number, y: number){
    if(y >= 0 && y <= canvas.height && x >= 0 && x <= canvas.width){
      return false;
    }else{
      return true;
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