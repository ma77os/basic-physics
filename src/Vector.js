class Vector{
    constructor(x = 0, y = 0){
      this.x = x
      this.y = y
  
      return this
    }
  
    add(v){
      this.x += v.x
      this.y += v.y
      return this
    }
  
    sub(v){
      this.x -= v.x
      this.y -= v.y
      return this
    }
  
    mult(n){
      this.x *= n
      this.y *= n
      return this
    }
  
    div(n){
      this.x /= n
      this.y /= n
      return this
    }
  
    mag(){
      return Math.sqrt(this.magSQ())
    }
  
    magSQ(){
      return this.x * this.x + this.y * this.y
    }
  
    normalize(){
      let m = this.mag()
      if (m != 0)
        this.div(m)
  
      return this
    }
  
    limit(n){
      let m = this.mag()
      if(m > n){
        this.normalize()
        this.mult(n)
      }
  
      return this
    }
  
    clone(){
      return new Vector(this.x, this.y)
    }
  
    static add (v1, v2){
      return new Vector(v1.x, v1.y).add(v2)
    }
  
    static sub (v1, v2){
      return new Vector(v1.x, v1.y).sub(v2)
    }
  
    static mult (v1, n){
      return new Vector(v1.x, v1.y).mult(n)
    }
  
    static div (v1, n){
      return new Vector(v1.x, v1.y).div(n)
    }
  }
  module.exports = Vector