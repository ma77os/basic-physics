import Vector from "./Vector"
export default class Mover{
  constructor(x = 0, y = 0, maxSpeed = 10){
    this.position = new Vector(x, y)
    this.acceleration = new Vector()
    this.velocity = new Vector()
    this.maxSpeed = maxSpeed
  }

  update(){
    // return;
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.maxSpeed)
    this.position.add(this.velocity)
    this.acceleration.mult(0)
  }

  // steering behaviours
  arrive(vector, maxForce = 0.4, minDist = 150){

    let targetVec = Vector.sub(vector, this.position)
    let dist = targetVec.mag()

    targetVec.normalize()

    if (dist < minDist){
      let m = (dist / minDist) * this.maxSpeed
      targetVec.mult(m)
    }else{
      targetVec.mult(this.maxSpeed)
    }

    var steer = Vector.sub(targetVec,this.velocity);
    steer.limit(maxForce);

    this.acceleration.add(steer)
  }

  spring(vector, force=0.1, friction=0.8, normalize=false){
    let targetVec = Vector.sub(vector, this.position)
    if(normalize)
      targetVec.normalize()

    targetVec.mult(force)

    this.acceleration.x = targetVec.x
    this.acceleration.y = targetVec.y

    this.velocity.mult(friction)
  }

  // springs to a ik length
  springOffset(vector, force=0.1, friction=0.8, length){
    let targetVec = Vector.sub(vector, this.position)

    let angle = Math.atan2(targetVec.y, targetVec.x)
    targetVec.x = vector.x - Math.cos(angle) * length
    targetVec.y = vector.y - Math.sin(angle) * length

    this.spring(targetVec, 2, friction, true)
  }


  // forward kinematics
  fk(vector){
    // TODO
  }

  // inverse kinematics
  ik(vector, length = 5){
    let targetVec = Vector.sub(vector, this.position)
    let angle = Math.atan2(targetVec.y, targetVec.x)
    this.position.x = vector.x - Math.cos(angle) * length;
    this.position.y = vector.y - Math.sin(angle) * length;
  }

  set x (value) { this.position.x = value }
  get x () { return this.position.x }

  set y (value) { this.position.y = value }
  get y () { return this.position.y }
}
