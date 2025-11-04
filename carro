class Carro {
    constructor(marca, modelo) {
        this.marca = marca;
        this.modelo = modelo;
        this.ligado = false;
        this.velocidade = 0;
    }

    ligar() {
        if (!this.ligado) {
            this.ligado = true;
            console.log(`${this.marca} ${this.modelo} foi ligado.`);
        } else {
            console.log(`O carro já está ligado.`);
        }
    }

    acelerar() {
        if (this.ligado) {
            this.velocidade += 10;
            console.log(`${this.marca} ${this.modelo} acelerou para ${this.velocidade} km/h.`);
        } else {
            console.log(`Não é possível acelerar — o carro está desligado.`);
        }
    }

    frear() {
        if (this.velocidade > 0) {
            this.velocidade -= 10;
            console.log(`${this.marca} ${this.modelo} reduziu a velocidade para ${this.velocidade} km/h.`);
        } else {
            console.log(`O carro já está parado.`);
        }
    }

    desligar() {
        if (this.ligado && this.velocidade === 0) {
            this.ligado = false;
            console.log(`${this.marca} ${this.modelo} foi desligado.`);
        } else if (this.velocidade > 0) {
            console.log(`Pare o carro antes de desligar.`);
        } else {
            console.log(`O carro já está desligado.`);
        }
    }
}

// Testando a classe Carro
const carro1 = new Carro('Toyota', 'Corolla');

carro1.ligar();     
carro1.acelerar();   
carro1.acelerar();   
carro1.frear();      
carro1.desligar();  
carro1.frear();      
carro1.desligar();  
