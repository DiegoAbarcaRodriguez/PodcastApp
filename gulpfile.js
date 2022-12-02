const { src, dest,parallel,watch } = require('gulp');
const sass=require('gulp-sass')(require('sass'));
const imagemin=require('gulp-imagemin');
const purgecss=require('gulp-purgecss');
const rename=require('gulp-rename');

function css(done) {
    return src('src/scss/**/*')
    .pipe(sass())
    .pipe(dest('build/css'));

    done();
}

function cssBuild(done) {

    return src('build/css/app.css')
    .pipe(rename({
        suffix:'.min'
    }))
    .pipe(purgecss({
        content:['index.html']
    }))
    .pipe(dest('build/css'))

    done();
}

function imagenes(done) {
    return src('src/img/**/*')
    .pipe(imagemin({optimizationLevel:3}))
    .pipe(dest('build/img'))
    done();
}


function dev(done) {
    return watch('src/scss/**/*',css);
}

exports.css=css;
exports.imagenes=imagenes;
exports.dev=dev;
exports.build=cssBuild;
exports.default=parallel(css,imagenes,dev);