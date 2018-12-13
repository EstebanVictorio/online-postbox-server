import Express from 'express';


const DIST = 'dist';
const IMAGES = 'Images';
const STYLES = 'Styles';


export default [
  Express.static(DIST),
  Express.static(IMAGES),
  Express.static(STYLES)
];
