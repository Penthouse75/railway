class Model {
    constructor(id, type) {
        this.id = id;
        this.type = []
        this.type.push(type);
    }

    bindCounterChanged(callback) {
        this.onCounterChanged = callback
    }

    _commit(id, type) {
        this.onCounterChanged(id, type)
    }

    addType(type) {
        this.type.push(type);
        this._commit(this.id, this.type[this.type.length - 1]);
    }

    removeType() {
        this.type.pop();
        this._commit(this.id, this.type[this.type.length - 1]);
    }
}

class View {
    createElement(tag, className, id) {
        const element = document.createElement(tag)
        if (className) element.classList.add(className)
        element.setAttribute('id', id);
        return element
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    constructor(id) {
        this.app = this.getElement('#root')

        this.point = this.createElement('div', 'point', id)
        this.app.append(this.point)
    }

    displayCounter(id, type) {

        const point1 = document.getElementById(id)
        point1.className = ''
        point1.classList.add(type);
    }
}

class Controller {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.model.bindCounterChanged(this.onCounterChanged)
        this.onCounterChanged(this.model.id, this.model.type)
    }

    onCounterChanged = (id, type) => {
        this.view.displayCounter(id, type)
    }

    addType = (type) => {
        this.model.addType(type)
    }

    removeType = () => {
        this.model.removeType()
    }
}

var earth = []
for (let i = 0; i < 59; i++) {
    earth.push(new Controller(new Model(i, 'point'), new View(i)))
}
let i = 0;
setTimeout(function run() {
    func(i); i++; //console.log(i)
    if (i > 59) return;
    setTimeout(run, 200);
}, 200);

function func(i) {
    earth[i].addType('energy')
    if (i > 0) earth[i - 1].removeType()
}

//const app = new Controller(new Model(0, 'point'), new View(0))
//const app1 = new Controller(new Model(1, 'point'), new View(1))
//const app2 = new Controller(new Model(2, 'point'), new View(2))
//setTimeout(() => app1.addType('energy'), 1500)
//setTimeout(() => app1.removeType(), 3000)