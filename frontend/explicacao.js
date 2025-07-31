async function nossaPromise() {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Promessa resolvida')
            resolve();
        }, 3000)
    });
}

async function executar() {
    console.log('Iniciando nossa promise')
    nossaPromise()
    // await nossaPromise()
    console.log('Promise executada')
}

executar()