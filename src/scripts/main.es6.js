import Doodle from './doodle';

document.addEventListener('DOMContentLoaded', function () {
    var container = document.createElement('div');
    document.body.appendChild(container);

    var doodle = new Doodle({
        container: container
    });
});