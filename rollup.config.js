import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
// import uglify from 'rollup-plugin-uglify';

export default{
  input: 'src/index.js',
  output:{
    file :'build/basic-physics.js',
    format: "umd",
    name:"BP"
  },
  plugins:[
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    // uglify()
  ]
}