import { GET_BACKGROUND, GET_LAND, MEGAMEN_GET_RUN, MEGAMEN_CONF, MEGAMEN_GET_WALK, MEGAMENT_GET_JUMP, MEGAMEN_GET_BULLET, MEGAMEN_GET_SHOOT_PARTICLE, MEGAMEN_GET_SHOOT, GET_HEARTH, MEGAMEN_GET_PROFILE } from "./config";


export function runGame(canvas : any){
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.width;
  let lastDate : any = new Date();
  let interval = 0;
  const fps = 60
  const gravity = 0.2;
  let keys : any= []
  const INITIAL_HEALTH = 3;

  // Background
  class Background{
    sprite: any
    landSprite : any
    megamenProfile: any;
    constructor(){
      this.sprite = GET_BACKGROUND();
      this.landSprite = GET_LAND()
      this.megamenProfile = MEGAMEN_GET_PROFILE()
    }
    render(){
      // Render Background
      ctx.drawImage(this.sprite, 0, 0, canvas.width, canvas.height)

      // Render Land
      const dyLand = canvas.height - this.landSprite.height;
      ctx.drawImage(this.landSprite, 0, dyLand, canvas.width, this.landSprite.height)

      // Render Megamen Profile
      ctx.drawImage(this.megamenProfile, 10,10, this.megamenProfile.width * 2, this.megamenProfile.height * 2)
    }
  }

  class Hearth{
    sprite: any
    x : number;
    y: number;
    scale: number;
    margin: number;
    constructor(x: number, y: number, scale: number, margin: number){
      this.sprite = GET_HEARTH()
      this.x = x;
      this.y = y;
      this.scale = scale;
      this.margin = margin;
    }

    render(total: number){
      const margin = this.margin;
      for(let i = 0;i < total;i++){
        ctx.drawImage(this.sprite, this.x + (((this.sprite.width * this.scale) + margin) * i), this.y, this.sprite.width * this.scale, this.sprite.height * this.scale)
      }
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

  class Bullet{
    x: number;
    y: number;
    direction: number;
    sprite: any;
    state: number;
    spriteLength: number;
    bulletSpeed :number;

    constructor(x: number, y: number, direction: number, sprite: any){
      this.x = x;
      this.y = y;
      this.direction = direction;
      this.sprite = sprite;
      this.spriteLength = MEGAMEN_CONF.bullet
      this.state = 0;
      this.bulletSpeed = 5;
    }
    logic(){
      if(this.direction === 1)
      this.x += this.bulletSpeed;
      else if(this.direction === -1)
      this.x -= this.bulletSpeed;
    }

    getState(){
      this.state += 1;
      if(this.state >= this.spriteLength){
        return this.spriteLength - 1
      }else{
        return this.state;
      }
    }

    render(){
      this.logic()
      const w = this.sprite[0].width;
      const h = this.sprite[0].height;
      ctx.save()
      ctx.translate(this.x + w / 2, this.y + h / w)
      ctx.scale(this.direction , 1)
      ctx.drawImage(this.sprite[this.getState()], - w / 2, - h / 2, w, h)
      ctx.restore()
    }
  }

  class MegamenExplode{
    x : number;
    y: number;
    dead : boolean;
    slow: number;
    tempSlow: number;
    state : number;
    spriteLength: number;
    sprite: any;
    direction: number;

    constructor(x: number, y: number, direction: number){
      this.direction = direction;
      this.x = x;
      this.y = y;
      this.dead = false;
      this.slow = 10;
      this.tempSlow = 0;
      this.state = 0;
      this.spriteLength = MEGAMEN_CONF.shoot_particle;
      this.sprite = MEGAMEN_GET_SHOOT_PARTICLE();
    }
    getState(){
      this.tempSlow += 1;
      if(this.tempSlow === this.slow)
      {
        this.tempSlow = 0;
        this.state += 1;
        if(this.state === this.spriteLength - 1){
          this.dead = true;
          return this.spriteLength - 1;
        }else{
          return this.state;
        }
      }else{
        return this.state
      }
    }

    render(){
      if(this.dead) return;

      ctx.save()
      ctx.translate(this.x + this.sprite[0].width / 2, (this.y + this.sprite[0].height / 2))
      ctx.scale(this.direction, 1)
      ctx.drawImage(this.sprite[this.getState()], -this.sprite[0].width / 2, - this.sprite[0].height / 2, this.sprite[0].width, this.sprite[0].height)
      ctx.restore()
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
    state: string;
    bullets: any;
    particles: any;
    shootingDelay :number;
    tempDelay: number;
    isShooting: boolean;
    health: number;
    heartObj : any;
    

    constructor(){
      this.health = INITIAL_HEALTH;
      this.heartObj = new Hearth(65, 50, 0.5, 2)
      this.x = 0
      this.y = 0
      this.sprite = MEGAMEN_GET_WALK()
      this.spriteState = 0;
      this.spriteLength = this.sprite.length;
      this.conf = MEGAMEN_CONF;
      this.spriteSlow = 60;
      this.state = "idle"
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
      this.bullets = [];
      this.particles = [];
      this.shootingDelay = 30;
      this.tempDelay = 0;
      this.isShooting = false;
    }

    shoot(){
      if(!this.canShoot()) return;

      this.velocityX = 0;

      this.tempDelay = 0;
      this.isShooting = true;

      let pos : number;
      let posY = this.y + 3;
      this.changeState("shoot")
      if(this.isBackward)
      {
        pos = this.x - 30
        const bullet = new Bullet(this.x - 30, posY + 10 , -1, MEGAMEN_GET_BULLET())
        this.bullets.push(bullet);
        const particle = new MegamenExplode(pos, posY, -1)
        this.particles.push(particle)
      }else{
        pos = this.x + this.w  + 5;

        const bullet = new Bullet(pos ,posY + 10, 1, MEGAMEN_GET_BULLET())
        this.bullets.push(bullet); 
        const particle = new MegamenExplode(pos, posY, 1)
        this.particles.push(particle)
      }
    }

    isGrounded(){
      if(collider.isCollide(this.x + this.w / 2, this.y + this.h + gravity)){
        return true;
      }else{
        return false;
      }
    }

    checkW(){
      if(this.state === "jump") return;
    }

    changeState(str : string){
      switch (str){
        case "idle":
        this.sprite = MEGAMEN_GET_WALK()
        this.spriteLength = this.conf.walk;
        this.spriteSlow = 60;
        this.state = "idle"
        break;
        case "run":
        this.sprite = MEGAMEN_GET_RUN()
        this.spriteLength = this.conf.run;
        this.spriteSlow = 4;
        this.state = "run"
        break;
        case "jump":
        this.sprite = MEGAMENT_GET_JUMP()
        this.spriteLength = this.conf.jump;
        this.spriteSlow = 1;
        this.state = "jump";
        break;
        case "shoot":
        this.sprite = MEGAMEN_GET_SHOOT()
        this.spriteLength = this.conf.shoot;
        this.spriteSlow = 60;
        this.state = "shoot"
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
        if(this.isShooting) return;
        this.isBackward = true;
        this.velocityX = velocity;
      }else if (str === "right" && !collider.isCollide(this.x + this.w + velocity, this.y + this.h / 2))
      {
        if(this.isShooting) return;
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

      this.canShoot()
    }

    canShoot(){
      if(this.tempDelay >= this.shootingDelay)
      {
        this.isShooting = false;
        return true;
      }
      this.tempDelay += 1;
      return false;
    }

    checkState(){
      if(this.isShooting){
        this.changeState("shoot")
      }
      else if(!this.isGrounded()){
        this.changeState("jump")
      }
      else if(this.velocityX === 0){
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
        ctx.translate(this.x + this.sprite[state].width / 2, this.y + this.sprite[state].height / 2) 
        ctx.scale(-1, 1);
        ctx.drawImage(this.sprite[state], -this.sprite[0].width / 2, -this.sprite[0].height/2, this.sprite[0].width, this.sprite[0].height)
        ctx.restore()
      }else{
        ctx.scale(1, 1);
        ctx.drawImage(this.sprite[state], this.x,this.y)
      }

      this.incrementState()

      // Render Bullet
      this.bullets.forEach((bullet : any)=>{
        bullet.render()
      })

      // Render Particles
      this.particles.forEach((particle: any)=>{
        particle.render()
      })

      // Render Hearth
      this.heartObj.render(this.health)
    }
  }

  document.addEventListener('keypress', (e : KeyboardEvent)=>{
    if(e.key === 'e'){
      megamen.shoot()
    }
  })

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
      // ctx.restore();
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