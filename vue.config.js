const CompressionPlugin = require("compression-webpack-plugin");
const productionGzipExtensions = /\.(js|css|html)(\?.*)?$/i;
const path = require("path");

function resolve(dir) {
    return path.join(__dirname, dir);
}
module.exports = {
    // 部署应用时的基本 URL
    publicPath: "/",

    // build时构建文件的目录 构建时传入 --no-clean 可关闭该行为
    outputDir: "dist",
    // dist目录下存放存放静态文件的目录名称
    assetsDir: "assets",

    // 构建多页面应用，页面的配置
    pages: {
        index: {
            // page 的入口
            entry: "src/main.js",
            // 模板来源
            template: "public/index.html",
            // 在 dist/index.html 的输出
            filename: "index.html",
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: "数据分析系统",
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ["chunk-vendors", "chunk-common", "index"],
        },
    },

    // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码 (在生产构建时禁用 eslint-loader)
    lintOnSave: process.env.NODE_ENV !== "production",

    // 是否使用包含运行时编译器的 Vue 构建版本
    runtimeCompiler: true,

    // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
    productionSourceMap: true,

    // 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中
    // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。该方法的第一个参数会收到已经解析好的配置。在函数内，你可以直接修改配置，或者返回一个将会被合并的对象
    configureWebpack: {
        resolve: {
            alias: {
                '@': resolve('src')
            }
        }
    },

    // 对内部的 webpack 配置（比如修改、增加Loader选项）(链式操作)
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', path.join(__dirname, 'src'))
        config.resolve.alias
            .set('src', path.join(__dirname, 'src'))
        if (process.env.NODE_ENV === "production") {
            config.plugin("compressionPlugin").use(
                new CompressionPlugin({
                    filename: "[path].gz[query]",
                    algorithm: "gzip",
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8,
                })
            );
        }
    },

    // css的处理
    css: {
        // 是否为 CSS 开启 source map。设置为 true 之后可能会影响构建的性能
        sourceMap: true,
        //向 CSS 相关的 loader 传递选项(支持 css-loader postcss-loader sass-loader less-loader stylus-loader)
        loaderOptions: {},
    },

    // 所有 webpack-dev-server 的选项都支持
    devServer: {
        open: true,
        host: "0.0.0.0",
        port: 8080,
        https: false,
        hotOnly: true,
        proxy: {
            "/": {
                target: "http://localhost:3000/",
                changeOrigin: true,
            },
        },
    },

    // 可以用来传递任何第三方插件选项
    pluginOptions: {},
};