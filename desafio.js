let olympicsMedalTable = [{
        id: 1,
        country: "BRASIL",
        gold: 7,
        silver: 6,
        bronze: 6,
        continent: "AMERICA DO SUL",
    },
    {
        id: 2,
        country: "USA",
        gold: 46,
        silver: 37,
        bronze: 17,
        continent: "AMERICA DO NORTE",
    },
    {
        id: 3,
        country: "CHINA",
        gold: 26,
        silver: 18,
        bronze: 26,
        continent: "ASIA",
    },
    {
        id: 4,
        country: "RUSSIA",
        gold: 19,
        silver: 18,
        bronze: 19,
        continent: "EUROPA",
    },
    {
        id: 5,
        country: "REINO UNIDO",
        gold: 27,
        silver: 23,
        bronze: 17,
        continent: "EUROPA",
    },
    {
        id: 6,
        country: "ALEMANHA",
        gold: 17,
        silver: 10,
        bronze: 15,
        continent: "EUROPA",
    },
    {
        id: 7,
        country: "JAPÃO",
        gold: 12,
        silver: 8,
        bronze: 21,
        continent: "ASIA",
    },
    {
        id: 8,
        country: "ARGENTINA",
        gold: 3,
        silver: 1,
        bronze: 0,
        continent: "AMERICA DO SUL",
    },
    {
        id: 9,
        country: "ITALIA",
        gold: 8,
        silver: 12,
        bronze: 8,
        continent: "EUROPA",
    },
    {
        id: 10,
        country: "QUÊNIA",
        gold: 6,
        silver: 6,
        bronze: 1,
        continent: "AFRICA",
    },
];

Array.prototype.customFind = function(predicate) {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i]) === true) {
            return this[i];
        }
    }
    return null;
};

Array.prototype.customSome = function(predicate) {
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i]) === true) {
            return true;
        }
    }
    return false;
};

Array.prototype.customFilter = function(predicate) {
    const result = [];
    for (let i = 0; i < this.length; i++) {
        if (predicate(this[i]) === true) {
            result.push(this[i]);
        }
    }
    return result;
};

Array.prototype.customMap = function(callback) {
    const result = [];
    for (let i = 0; i < Object(this).length; i++) {
        result.push(callback(Object(this)[i], i, Object(this)));
    }
    return result;
};

Array.prototype.customReduce = function(callback, initialValue) {
    initialValue = initialValue || 0;
    for (let i = 0; i < Object(this).length; i++) {
        initialValue = callback(initialValue, Object(this)[i], i, Object(this));
    }
    return initialValue;
};

// Código modelo utilizando filter, map e reduce
const resultFilterMapReduce = olympicsMedalTable
    .filter((i) => i.continent === "ASIA") // JAPÃO e CHINA
    .map((i) => i.gold) // 26 e 12
    .reduce((total, quantity) => total + quantity); // 38

console.log(
    `Medalhas de Ouro no continente Asiático: ${resultFilterMapReduce}`
);

// Implemente as funções customizadas - customFilter, customMap e customReduce e verique se o retorno é igual ao do código modelo
const resultByCustomFilterMapReduce = olympicsMedalTable
    .customFilter((i) => i.continent === "ASIA")
    .customMap((i) => i.gold)
    .customReduce((total, quantity) => total + quantity);

console.log(
    `Custom result - Medalhas de Ouro no continente Asiático: ${resultByCustomFilterMapReduce}`
);

/* DESAFIOS - CONCLUA AS FUNÇÕES customSome, customFind E UTILIZANDO TODAS AS FUNÇÕES 'CUSTOM' CONCLUA OS DESAFIOS ABAIXO: */

// 1 - Crie um algoritmo que encontre o único pais do continente Africano
const paisAfricano = olympicsMedalTable.customFind(
    (el) => el.continent === "AFRICA"
).country;

console.log(`Único país do continente Africano: ${paisAfricano}`);

// 2 - Crie um algoritmo que retorne o total de medalhas por país
const medalhasPorPais = olympicsMedalTable.customMap(
    (el) => `${el.country}: ${el.gold + el.silver + el.bronze}`
);

console.log(`Total de medalhas por país: ${medalhasPorPais}`);

// 3 - Crie um algoritmo para encontrar os países que conquistaram mais que 10 medalhas de ouro
const paisesCom10MedalhasOuroNoMinimo = olympicsMedalTable
    .customFilter((el) => {
        return el.gold > 10;
    })
    .customMap((el) => el.country);

console.log(
    `Paises que conquistaram mais que 10 medalhas de ouro: ${paisesCom10MedalhasOuroNoMinimo}`
);

// 4 - Crie um algoritmo para encontrar os países que conquistaram no minímo 30 medalhas (Ouro, Prata e Bronze)
const paisesCom30MedalhasNoMinimo = olympicsMedalTable
    .customFilter((el) => el.gold + el.silver + el.bronze >= 30)
    .customMap((el) => el.country);

console.log(
    `Paises que conquistaram no mínimo 30 medalhas: ${paisesCom30MedalhasNoMinimo}`
);

// 5 - Crie um algoritmo para verificar se o continente América do Sul conquistou pelo menos 20 medalhas de ouro
const qtdMedalhasDeOuroAmericaSul = olympicsMedalTable
    .customFilter((el) => el.continent === "AMERICA DO SUL")
    .customReduce((amount, curr) => amount + curr.gold);
if (qtdMedalhasDeOuroAmericaSul >= 20) {
    console.log(
        `Os países da América do Sul conquistaram mais do que 20 medalhas de ouro`
    );
} else {
    console.log(
        `Os países da América do Sul não conquistaram mais do que 20 medalhas de ouro`
    );
}