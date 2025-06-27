export const movieValidator = (data, isPartial = false) => {
    const errores = []
    
    if (!isPartial || "title" in data) {
        if (data.title?.trim() === "") {
            errores.push("Debe ingresar un titulo");
        }
    }

    if (!isPartial || "director" in data) {
        if (data.director?.trim() === "") {
            errores.push("Debe ingresar un director");
        }
    }

    if (!isPartial || "duration" in data) {
        console.log(typeof Number(data.duration))
        if (isNaN(data.duration) || Number(data.duration) <= 0 || typeof data.duration !== "number") {
            errores.push("Debe ingresar una duracion en numero entero");
        }
    }

    if (!isPartial || "genre" in data) {
        if (data.genre?.trim() === "") {
            errores.push("Debe ingresar un genero de pelicula");
        }
    }

    return errores;
}