$.get('http://localhost:4000/',function (response){
    response.forEach(function (pers){
        new Personnage(pers.personne, pers.vehicle, pers.picture_link ,pers.gender);
    })
});

var personnages = [];

class Personnage {

        constructor(personne, vehicle, picture, gender){
            this.personne = personne;
            this.vehicle = vehicle;
            this.picture = picture;
            this.gender = gender;
            this.parent = document.body;
            this.create();
            this.setAttr();
            this.append();
            this.fill();
            personnages.push(this);
        }

        create(){
            this.cadre = document.createElement('div');
            this.name = document.createElement('h2');
            this.img = document.createElement('img');
            this.vhcl = document.createElement('p');
            this.gnd = document.createElement('p');
        }

        setAttr(){
            this.cadre.setAttribute('class', 'cadre');
            this.img.setAttribute('src', this.picture);
        }

        append(){
            this.parent.appendChild(this.cadre);
            this.cadre.appendChild(this.name);
            this.cadre.appendChild(this.img);
            this.cadre.appendChild(this.vhcl);
            this.cadre.appendChild(this.gnd);
        }

        fill() {
            this.name.innerHTML = this.personne;
            this.vhcl.innerHTML = this.vehicle;
            this.gnd.innerHTML = this.gender;
        }
}

