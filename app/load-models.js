let models = {};
const modules = Fs.readdirSync(__dirname+'/modules');
const folders = modules.filter(element => Fs.statSync(Path.join(__dirname+'/modules', element)).isDirectory());
folders.forEach(function (folder) {
    try {
        let modelsPathStr = './app' + '/modules/' + folder + '/' + 'models';
        if (Fs.existsSync(modelsPathStr)) {
            let modelsPath = Fs.readdirSync(modelsPathStr);
            modelsPath.forEach(function (file) {
                let modelPath = Path.join(__dirname + '/modules/' + folder + '/models/' + file);
                let modelName = file.replace(/\.[^/.]+$/, "");
                if (!!modelName && Fs.existsSync(modelPath)) {
                    let mod = require(modelPath);
                    models = {
                        ...models, ...{
                            [modelName]: mod
                        }
                    };
                }
            });
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = models;