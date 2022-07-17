const Routes = function (app) {
    const prefix=AppDir==='admin'?'admin/':'';
    const modules = Fs.readdirSync(__dirname + '/modules');
    const folders = modules.filter(element => Fs.statSync(Path.join(__dirname + '/modules', element)).isDirectory());
    folders.forEach(function (folder) {
        let controllers = './app' + '/modules/' + folder + '/' + AppDir + '/' + 'controllers';
        try {
            if (Fs.existsSync(controllers)) {
                let controllersPath = Fs.readdirSync(controllers);
                controllersPath.forEach(function (file) {
                    let routerPath = Path.join(__dirname + '/modules/' + folder + '/' + AppDir + '/' + 'controllers/' + file);
                    let contName = file.replace(/\.[^/.]+$/, "");
                    if (!!contName && Fs.existsSync(routerPath)) {
                        let controller = require(routerPath);
                        app.use('/'+prefix+ contName, controller);
                    }
                });
            }
        } catch (e) {
            console.log(e);
        }
    });
};
module.exports = Routes;
