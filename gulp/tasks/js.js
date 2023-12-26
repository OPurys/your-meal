import webpack from "webpack-stream";
import concat from "gulp-concat";
import uglify from "gulp-uglify-es";

export const js = () => {
    return app.gulp.src(app.path.src.js, { sourcemaps: app.isDev })
        .pipe(app.plugins.plumber(
            app.plugins.notify.onError({
                title: "JS",
                message: "Error: <%= error.message %>"
            })))
        .pipe(webpack({
            mode: app.isBuild ? 'production' : 'development',
            output: {
                filename: 'app.min.js',
            }
        }))
}

export function scripts() {
    return app.gulp.src([ // Берем файлы из источников
        'src/js/constants.js',
        'src/js/utils.js',
        'src/js/index.js',
        'src/js/basket.js',
        'src/js/card.js',
        '!src/js/app.min.js'
    ])
        .pipe(concat('app.min.js')) // Конкатенируем в один файл
        .pipe(uglify.default()) // Сжимаем JavaScript
        .pipe(app.gulp.dest(app.path.build.js)) // Выгружаем готовый файл в папку назначения
        .pipe(app.plugins.browsersync.stream()) // Триггерим Browsersync для обновления страницы
}